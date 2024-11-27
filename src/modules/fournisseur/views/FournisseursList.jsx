import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import { DataGrid, GridToolbar, GridActionsCellItem } from "@mui/x-data-grid";
import Typography from "@mui/material/Typography";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { useNavigate } from "react-router-dom";
import CustomNoResultsOverlay from "../../../style/NoResultStyle";
import ArchiveIcon from "@mui/icons-material/Archive";
import Item from "../../../style/ItemStyle";
import Avatar from "@mui/material/Avatar";
import { deepOrange } from "@mui/material/colors";
import CustomNoRowsOverlay from "../../../style/NoRowsStyle";
import UnarchiveSharpIcon from "@mui/icons-material/UnarchiveSharp";
import Tooltip from "@mui/material/Tooltip";
import axios from "axios";
import { ip } from "../../../constants/ip";
import ArchivePopUp from "../Components/ArchivePopup";
import { SnackbarNotification } from "../Components/SnackBarNotification";

export default function FournisseursList() {
  const [fournisseurs, setFournisseurs] = useState([]);
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [refresh, setRefresh] = useState(true);
  const [fournisseurToArchiveId, setFournisseurToArchiveId] = useState(null);
  const [snackOpen, setSnackOpen] = useState(false);
  const [message, setSnackMessage] = useState("");
  const navigate = useNavigate();

  const handleDetails = (id) => {
    navigate(`${id}`);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${ip}/provider`);
        const nonArchived = response.data.filter((element) => !element.archived);
        setFournisseurs(nonArchived);
        if (!refresh) {
          setSnackMessage("Fournisseur archived successfully!");
          setSnackOpen(true);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        setSnackOpen(true);
      }
    };

    fetchData();
  }, [refresh]);

  const handleArchive = async () => {
    if (!fournisseurToArchiveId) return;
    try {
      await axios.patch(`${ip}/provider/${fournisseurToArchiveId}`, {
        archived: true,
      });
      setFournisseurs((prev) =>
        prev.filter((item) => item.id !== fournisseurToArchiveId)
      );
      setConfirmDelete(false);
    } catch (error) {
      console.error("Error archiving fournisseur:", error);
      setSnackMessage("Failed to archive fournisseur.");
    } finally {
      setSnackOpen(true);
    }
  };

  const columns = [
    {
      field: "avatar",
      headerName: "Avatar",
      width: 90,
      renderCell: (params) => (
        <Avatar
          src={params.row.Media?.path || ""}
          sx={{ bgcolor: deepOrange[500], width: 35, height: 35 }}
        >
          {params.row.nameProvider?.charAt(0)}
        </Avatar>
      ),
    },
    { field: "nameProvider", headerName: "Fournisseur Name", width: 200 },
    { field: "registrationNumber", headerName: "Registration Number", width: 200 },
    { field: "email", headerName: "Fournisseur Email", width: 220 },
    { field: "phoneNumber", headerName: "Phone Number", width: 150 },
    { field: "adresse", headerName: "Address", width: 190 },
    {
      field: "actions",
      headerName: "Actions",
      width: 150,
      type: "actions",
      renderCell: (params) => (
        <>
          <GridActionsCellItem
            icon={<VisibilityIcon />}
            label="Details"
            onClick={() => handleDetails(params.id)}
          />
          <Tooltip title="Archive Fournisseur">
            <GridActionsCellItem
              icon={<UnarchiveSharpIcon />}
              label="Archive"
              onClick={() => {
                setFournisseurToArchiveId(params.id);
                setConfirmDelete(true);
              }}
              sx={{ color: "red" }}
            />
          </Tooltip>
        </>
      ),
    },
  ];

  const handleArchivedFournisseurs = () => {
    navigate("fournisseur-archived");
  };

  return (
    <Box sx={{ bgcolor: "background.default", mx: 3, mt: 3 }}>
      <Item sx={{ pt: 7, pb: 1, px: 7, borderRadius: 10 }} elevation={5}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mb: 2,
          }}
        >
          <Typography variant="h5" gutterBottom sx={{ fontWeight: "bold" }}>
            Fournisseurs
          </Typography>
          <Tooltip title="Archived fournisseur">
            <ArchiveIcon
              onClick={handleArchivedFournisseurs}
              sx={{
                flexShrink: 0,
                ml: "auto",
                marginBottom: { xs: 2, sm: 0 },
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                padding: 1,
                cursor: "pointer",
                fontSize: "55px",
                color: "#701583",}}
            />
          </Tooltip>
        </Box>
        <div style={{ width: "100%", height: 500 }}>
          <DataGrid
            pageSizeOptions={[7, 10, 20]}
            sx={{
              boxShadow: 0,
              border: 0,
              borderColor: "primary.light",
              "& .MuiDataGrid-cell:hover": { color: "primary.main" },
            }}
            rows={fournisseurs}
            columns={columns}
            slots={{
              noRowsOverlay: CustomNoRowsOverlay,
              noResultsOverlay: CustomNoResultsOverlay,
              toolbar: GridToolbar,
            }}
            initialState={{
              pagination: { paginationModel: { pageSize: 7 } },
            }}
            slotProps={{ toolbar: { showQuickFilter: true } }}
          />
        </div>
      </Item>
      {confirmDelete && (
        <ArchivePopUp
          setRefresh={setRefresh}
          refresh={refresh}
          FournisseurId={fournisseurToArchiveId}
          status={confirmDelete}
          setStatus={setConfirmDelete}
          handleArchive={handleArchive}
        />
      )}
      <SnackbarNotification
        open={snackOpen}
        setOpen={setSnackOpen}
        message={message}
      />
    </Box>
  );
}
