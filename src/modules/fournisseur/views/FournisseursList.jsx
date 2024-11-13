import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Button from "@mui/material/Button";
import { DataGrid,GridToolbar,GridActionsCellItem  } from '@mui/x-data-grid';
import Typography from '@mui/material/Typography';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { useNavigate } from 'react-router-dom';
import CustomNoResultsOverlay from '../../../style/NoResultStyle'
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import Item from '../../../style/ItemStyle';
import Avatar from '@mui/material/Avatar';
import { deepOrange } from '@mui/material/colors';
import CustomNoRowsOverlay from '../../../style/NoRowsStyle';
import axios from 'axios';
import { ip } from "../../../constants/ip";

export default function FournisseursList() {
 

const [fournisseur,setFournisseur] = useState([]) 
const [confirmDelete, setConfirmDelete] = useState(false);
const [fournisseurToDelete, setFournissurToDelete] = useState(null);
  const navigate = useNavigate()

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${ip}/provider`);
        setFournisseur(response.data);
        console.log("fournisseur fetched:", response.data);
      } catch (error) {
        console.log("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);




  const handelDetails = (ids)=>{
    navigate(`${ids}`)
  }


  const handleDeleteClick = (id) => {
    setFournissurToDelete(id);
    setConfirmDelete(true);
  };


  const handleDelete = async () => {
    try {
      await axios.delete(`${ip}/provider/${fournisseurToDelete}`);
      setFournisseur(fournisseur.filter((four) => four.id !== fournisseurToDelete));
      setConfirmDelete(false);
      setFournissurToDelete(null);
    } catch (error) {
      console.log("Error deleting fournisseur:", error);
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
    {
      field: 'nameProvider',
      headerName: 'fournisseur Name',
      width: 200,
      // getActions:({})=>{}
    },
    {
      field: 'registrationNumber',
      headerName: 'Registration Number',
      width: 200,
    },
    {
      field: 'email',
      headerName: 'fournisseur Email',
      width: 220,
    },
    {
      field:'phoneNumber',
      headerName: 'Phone Number',
      width: 150,
    },
    {
      field: 'adresse',
      headerName: 'Address',
      width: 190,
    },
    {
      field: "actions",
      headerName: "Actions",
      width: 100,
      type: "actions",
      renderCell: (params) => (
        <>
          <GridActionsCellItem
            icon={<VisibilityIcon />}
            label="Details"
            onClick={() => handelDetails(params.id)}
          />
          <GridActionsCellItem
            icon={<DeleteOutlineIcon />}
            label="Delete"
            onClick={() => handleDeleteClick(params.id)}
            style={{ color: "red" }}
          />
        </>
      ),
    },
    
  ];
  



  return (
        <Box
          sx={{
            bgcolor: 'background.default',
            mx:3,
            mt:3
          }}
        >   
            <Item sx={{pt:7,pb:1,px:7,borderRadius:10}} elevation={5}>
            <Typography variant="h5" mb={3} gutterBottom sx={{ fontWeight: 'bold' }}>
            Fournisseurs
        </Typography>
    <div style={{width:'100%', height : 500}}>
      <DataGrid
      pageSizeOptions={[7, 10,20]}
       sx={{
        boxShadow: 0,
        border: 0,
        borderColor: 'primary.light',
        '& .MuiDataGrid-cell:hover': {
          color: 'primary.main',
        }}}
        rows={fournisseur}
        columns={columns}
       slots={{
        noRowsOverlay: CustomNoRowsOverlay,
        noResultsOverlay: CustomNoResultsOverlay,
        toolbar: GridToolbar,
      }} 
      initialState={{
        pagination: { paginationModel: { pageSize: 7 } },
        filter: {
          filterModel: {
            items: [],
            quickFilterValues: [''],
          },
        },
      }}
      slotProps={{
        toolbar: {
          showQuickFilter: true,
        },
      }}
      />
    </div>
         </Item>  
         {confirmDelete && (
    <>
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
        onClick={() => setConfirmDelete(false)}
      />

      <Box
        sx={{
          backgroundColor: "#dc2626",
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
          Are you sure you want to delete this author?
        </Typography>
        <span style={{ color: "white" }}>This action is irreversible!</span>

        <Box sx={{ mt: 2, display: "flex", gap: 2 }}>
          <Button
            variant="contained"
            color="error"
            onClick={handleDelete}
            sx={{
              backgroundColor: "white",
              color: "red",
              "&:hover": {
                backgroundColor: "red",
                color: "white",
              },
            }}
          >
            Yes, Delete
          </Button>

          <Button
            variant="contained"
            color="error"
            onClick={() => setConfirmDelete(false)}
            sx={{
              backgroundColor: "white",
              color: "red",
              "&:hover": {
                backgroundColor: "red",
                color: "white",
              },
            }}
          >
            Cancel
          </Button>
        </Box>
      </Box>
    </>
  )}
</Box>
        
  );
}
