import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import { DataGrid, GridToolbar, GridActionsCellItem } from "@mui/x-data-grid";
import Typography from "@mui/material/Typography";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { useNavigate } from "react-router-dom";
import CustomNoResultsOverlay from "../../../style/NoResultStyle";
import UnarchiveIcon from "@mui/icons-material/Unarchive";
import Item from "../../../style/ItemStyle";
import Avatar from "@mui/material/Avatar";
import { deepOrange } from "@mui/material/colors";
import CustomNoRowsOverlay from "../../../style/NoRowsStyle";
import axios from "axios";
import Tooltip from "@mui/material/Tooltip";
import { ip } from "../../../constants/ip";
import UnarchiveSharpIcon from "@mui/icons-material/UnarchiveSharp";
import UnarchivePopUp from "./UnarchivePopUp";
import { SnackBar } from "./SnackBar";

export const ArchivedFournisseur = () => {
  const [archivedFournissuer, setArchivedFournisseur] = useState([]);
  const [confirmToArchive, setConfirmToArchive] = useState(false);
  const [fournisseurToUnarchiveId, setFournisseurToUnarchiveId] = useState(null);
  const [refresh, setRefresh] = useState(false);
  const [snackOpen, setSnackOpen] = useState(false);
  const [message, setSnackMessage] = useState("");
  const navigate = useNavigate();

  const getArchived = async () => {
    try {
      const response = await axios.get(`${ip}/provider`);
      const archived = response.data.filter((element) => element.archived);
      setArchivedFournisseur(archived);
      if (refresh) {
        setSnackMessage("Fournisseur Unarchived successfully!");
        setSnackOpen(true);
      }
    } catch (error) {
      console.error("Error fetching archived fournisseurs:", error);
    }
  };

  useEffect(() => {
    getArchived();
  }, [refresh]);

  const handleDetails = (id) => {
    navigate(`${id}`);
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
          <Tooltip title="Unarchive Fournisseur">
            <GridActionsCellItem
              icon={<UnarchiveSharpIcon />}
              label="Unarchive"
              onClick={() => {
                setFournisseurToUnarchiveId(params.id);
                setConfirmToArchive(true);
              }}
              style={{ color: "green" }}
            />
          </Tooltip>
        </>
      ),
    },
  ];

  const handleBackToFournisseurs = () => {
    navigate("/fournisseurs");
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
        <Typography variant="h5" mb={1} gutterBottom sx={{ fontWeight: "bold" }}>
          Archived Fournisseurs
        </Typography>
        <UnarchiveIcon
          sx={{ fontSize: "50px", color: "green", cursor: "pointer" }}
          onClick={handleBackToFournisseurs}
        />
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
            rows={archivedFournissuer}
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
      {confirmToArchive && (
        <UnarchivePopUp
          FournisseurId={fournisseurToUnarchiveId}
          isOpen={confirmToArchive}
          setIsOpen={setConfirmToArchive}
          refresh={refresh}
          setRefresh={setRefresh}
          setSnackMessage={setSnackMessage}
          setSnackOpen={setSnackOpen}
        />
      )}
      <SnackBar open={snackOpen} setOpen={setSnackOpen} message={message} />
    </Box>
  );
};
