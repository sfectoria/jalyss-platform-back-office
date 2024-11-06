import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import { DataGrid, GridToolbar, GridActionsCellItem } from '@mui/x-data-grid';
import Typography from '@mui/material/Typography';
import VisibilityIcon from '@mui/icons-material/Visibility';
import Stack from '@mui/material/Stack';
import Avatar from '@mui/material/Avatar';
import { deepOrange } from '@mui/material/colors';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';
import CustomNoResultsOverlay from '../../../style/NoResultStyle';
import Item from '../../../style/ItemStyle';
import { ip } from '../../../constants/ip';
import axios from 'axios';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import CustomNoRowsOverlay from '../../../style/NoRowsStyle';


export default function AuthorsList() {
  const [authors, setAuthors] = useState([]);
  const [confirmDelete, setConfirmDelete] = useState(false); 
  const [authorToDelete, setAuthorToDelete] = useState(null); 
  const navigate = useNavigate();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${ip}/author`);
        setAuthors(response.data);
        console.log("from authors", response.data);
      } catch (error) {
        console.log("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);


  const handleDetails = (id) => {
    navigate(`${id}`);
  };

  const handleDeleteClick = (id) => {
    setAuthorToDelete(id);
    setConfirmDelete(true); 
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`${ip}/author/${authorToDelete}`);
      setAuthors(authors.filter((author) => author.id !== authorToDelete));
      setConfirmDelete(false); 
      setAuthorToDelete(null); 
    } catch (error) {
      console.log("Error deleting author:", error);
    }
  };

  const columns = [
    {
      field: 'image',
      headerName: '',
      width: 90,
      renderCell: () => (
        <Stack direction="row" spacing={2}>
        </Stack>
      )
    },
    {
      field: "nameAr",
      headerName: "Author Name Ar",
      width: 200,
    },
    {
      field: "nameEn",
      headerName: "Author Name Eng",
      width: 200,
    },
    {
      field: "biographyAr",
      headerName: "Author Bio Ar",
      width: 220,
    },
    {
      field: "biographyEn",
      headerName: "Author Bio En",
      width: 150,
    },
    {
      field: "actions",
      headerName: "Actions",
      width: 100,
      type: 'actions',
      renderCell: ({ id }) => (
        <>
          <GridActionsCellItem
            icon={<VisibilityIcon />}
            label="Details"
            onClick={() => handleDetails(id)} 
          />
          <GridActionsCellItem
            icon={<DeleteOutlineIcon />}
            label="Delete"
            onClick={() => handleDeleteClick(id)}
            style={{ color: "red" }}
          />
        </>
      )
    }
  ];

  return (
    <Box sx={{ bgcolor: "background.default", mx: 3, mt: 3 }}>
      <Item sx={{ pt: 7, pb: 1, px: 7, borderRadius: 10 }} elevation={5}>
        <div className="d-flex justify-content-between">
        <Typography
          variant="h5"
          mb={3}
          gutterBottom
          sx={{ fontWeight: "bold" }}
        >
          Authors
        </Typography>
        <div style={{ width: '100%' }}>
          <DataGrid
            pageSizeOptions={[7, 10, 20]}
            sx={{
              boxShadow: 0,
              border: 0,
              borderColor: "primary.light",
              "& .MuiDataGrid-cell:hover": {
                color: "primary.main",
              },
            }}
            rows={authors}
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
                  quickFilterValues: [""],
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
        <Box
          sx={{
            backgroundColor: 'white',
            padding: '20px',
            borderRadius: '8px',
            boxShadow: '0 0 10px rgba(0,0,0,0.1)',
            position: 'fixed',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            zIndex: 1000,
          }}
        >
          <Typography sx={{ fontSize: 20, mb: 2 }}>
            Do you want to delete this author?
          </Typography>
          <span style={{ color: 'red' }}>This action is irreversible!</span>

          <Box sx={{ mt: 2, display: 'flex', gap: 2 }}>
            <Button
              variant="contained"
              color="error"
              onClick={handleDelete}
            >
              Yes, Delete
            </Button>
            <Button
              variant="outlined"
              onClick={() => setConfirmDelete(false)} 
            >
              Cancel
            </Button>
          </Box>
        </Box>
      )}
    </Box>
  );
}
