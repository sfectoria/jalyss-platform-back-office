import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Button from "@mui/material/Button";
import { DataGrid, GridToolbar, GridActionsCellItem } from '@mui/x-data-grid';
import Typography from '@mui/material/Typography';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { useNavigate } from 'react-router-dom';
import CustomNoResultsOverlay from '../../../style/NoResultStyle';
import UnarchiveIcon from '@mui/icons-material/Unarchive';
import Item from '../../../style/ItemStyle';
import Avatar from '@mui/material/Avatar';
import { deepOrange } from '@mui/material/colors';
import CustomNoRowsOverlay from '../../../style/NoRowsStyle';
import axios from 'axios';
import MoveToInboxIcon from '@mui/icons-material/MoveToInbox';
import { ip } from "../../../constants/ip";

export const ArchivedFournisseur = () => {
  const [archivedFournissuer, setArchivedFournisseur] = useState([]);
  const [confirmToArchive, setConfirmToArchive] = useState(false);
  const [fournisseurToArchiveId, setFournisseurToArchiveId] = useState(null);

  const navigate = useNavigate();

  const getArchived = async () => {
    try {
      const response = await axios.get(`${ip}/provider`);
      const Archived = response.data.filter((element) => element.archived);
      setArchivedFournisseur(Archived);
      console.log("Archived Fournisseurs fetched successfully:", Archived);
    } catch (error) {
      console.error("Error fetching archived fournisseurs:", error);
    }
  };

  useEffect(() => {
    getArchived();
  }, []);

  const handleDetails = (id) => {
    navigate(`${id}`);
  };

  const handleArchive = async () => {
    if (!fournisseurToArchiveId) return;

    try {
      await axios.patch(`${ip}/provider/${fournisseurToArchiveId}`, { archived: false });
      setArchivedFournisseur((prev) =>
        prev.filter((fournisseur) => fournisseur.id !== fournisseurToArchiveId)
      );
      console.log(`Fournisseur with ID ${fournisseurToArchiveId} archived successfully.`);
    } catch (error) {
      console.error("Error archiving fournisseur:", error);
    } finally {
      setConfirmToArchive(false);
      setFournisseurToArchiveId(null);
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
    { field: 'nameProvider', headerName: 'Fournisseur Name', width: 200 },
    { field: 'registrationNumber', headerName: 'Registration Number', width: 200 },
    { field: 'email', headerName: 'Fournisseur Email', width: 220 },
    { field: 'phoneNumber', headerName: 'Phone Number', width: 150 },
    { field: 'adresse', headerName: 'Address', width: 190 },
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
          <GridActionsCellItem
            icon={<MoveToInboxIcon />}
            label="Archive"
            onClick={() => {
              setFournisseurToArchiveId(params.id);
              setConfirmToArchive(true);
            }}
            style={{ color: "red" }}
          />
        </>
      ),
    },
  ];
  const HandleClick =() =>{
    navigate("/fournisseurs")
  }

  return (
    <Box sx={{ bgcolor: 'background.default', mx: 3, mt: 3 }}>
      <Item sx={{ pt: 7, pb: 1, px: 7, borderRadius: 10 }} elevation={5}>
        <Typography variant="h5" mb={1} gutterBottom sx={{ fontWeight: 'bold' }}>
          Archived Fournisseurs
        </Typography>
        <  UnarchiveIcon sx={{fontSize:"50px",color:"green"}}  onClick={HandleClick} />
        <div style={{ width: '100%', height: 500 }}>
          <DataGrid
            pageSizeOptions={[7, 10, 20]}
            sx={{
              boxShadow: 0,
              border: 0,
              borderColor: 'primary.light',
              '& .MuiDataGrid-cell:hover': { color: 'primary.main' },
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
        <Box
          sx={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            zIndex: 999,
          }}
          onClick={() => {
            setConfirmToArchive(false);
            setFournisseurToArchiveId(null);
          }}
        >
          <Box
            sx={{
              backgroundColor: "#16a34a",
              padding: "20px",
              borderRadius: "8px",
              boxShadow: "0 0 10px rgba(0,0,0,0.1)",
              position: "fixed",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              zIndex: 1000,
            }}
          >
            <Typography sx={{ fontSize: 20, mb: 2, color: "white" }}>
              Are you sure you want to unarchive this fournisseur?
            </Typography>
            <span style={{ color: "white" }}>This action is reversible.</span>
            <Box sx={{ mt: 2, display: "flex", gap: 2 }}>
              <Button
                variant="contained"
                color="error"
                onClick={handleArchive}
                sx={{
                  backgroundColor: "white",
                  color: "green",
                  "&:hover": { backgroundColor: "green", color: "white" },
                }}
              >
                Yes, Archive
              </Button>
              <Button
                variant="contained"
                color="error"
                onClick={() => {
                  setConfirmToArchive(false);
                  setFournisseurToArchiveId(null);
                }}
                sx={{
                  backgroundColor: "white",
                  color: "green",
                  "&:hover": { backgroundColor: "green", color: "white" },
                }}
              >
                Cancel
              </Button>
            </Box>
          </Box>
        </Box>
      )}
    </Box>
  );
};
