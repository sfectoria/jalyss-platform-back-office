import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import { DataGrid, GridToolbar, GridActionsCellItem } from '@mui/x-data-grid';
import { useDemoData } from '@mui/x-data-grid-generator';
import Typography from '@mui/material/Typography';
import VisibilityIcon from '@mui/icons-material/Visibility';
import ModeEditOutlineIcon from '@mui/icons-material/ModeEditOutline';
import { useNavigate } from 'react-router-dom';
import CustomNoResultsOverlay from '../../../style/NoResultStyle';
import Item from '../../../style/ItemStyle';
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import { deepOrange } from '@mui/material/colors';
import { ip } from '../../../constants/ip';
import axios from 'axios';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { Button } from '@mui/material';
import CustomNoRowsOverlay from '../../../style/NoRowsStyle';

export default function ClientsList() {
  const [clients, setClients] = useState([]);
  const [categories, setCategories] = useState([]);
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [clientToDelete, setClientToDelete] = useState(null); 

  useEffect(() => {
    const fetchClients = async () => {
      try {
        const response = await axios.get(`${ip}/clients`);
        setClients(response.data);
      } catch (error) {
        console.error('Error fetching clients:', error);
      }
    };

    const fetchCategories = async () => {
      try {
        const response = await axios.get(`${ip}/categoryClients`);
        setCategories(response.data);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    fetchClients();
    fetchCategories();
  }, []);

  const { data } = useDemoData({
    dataSet: 'Commodity',
    rowLength: 500,
    maxColumns: 6,
  });

  const navigate = useNavigate();

  const handelDetails = (ids) => {
    navigate(`/clients/${ids}`);
  };

  const handleDeleteClick = (id) => {
    setClientToDelete(id);
    setConfirmDelete(true); 
  };

  const handelDelete = async () => {
    try {
      await axios.delete(`${ip}/clients/${clientToDelete}`);
      setClients(clients.filter((client) => client.id !== clientToDelete));
      setConfirmDelete(false); 
    } catch (error) {
      console.log('Error deleting client:', error);
    }
  };

  const categoryMap = categories.reduce((acc, category) => {
    acc[category.id] = category.name;
    return acc;
  }, {});

  const columns = [
    {
      field: 'image',
      headerName: '',
      width: 90,
      renderCell: () => (
        <Stack direction="row" spacing={2}>
        </Stack>
      ),
    },
    {
      field: 'fullName',
      headerName: 'Client Name',
      width: 200,
    },
    {
      field: 'categoryClient',
      headerName: 'Category',
      width: 200,
      renderCell: (params) => {
        const categoryName = categoryMap[params.row.idCategoryClient];
        return <Typography>{categoryName}</Typography>;
      },
    },
    {
      field: 'email',
      headerName: 'Client Email',
      width: 220,
    },
    {
      field: 'phoneNumber',
      headerName: 'Phone Number',
      width: 150,
    },
    {
      field: 'address',
      headerName: 'Address',
      width: 190,
    },
    {
      field: 'actions',
      headerName: 'Actions',
      width: 100,
      type: 'actions',
      getActions: ({ id }) => [
        <GridActionsCellItem
          icon={<VisibilityIcon />}
          label="Details"
          onClick={() => handelDetails(id)}
        />,
        <GridActionsCellItem
          icon={<DeleteOutlineIcon />}
          label="Delete"
          onClick={() => handleDeleteClick(id)} 
          style={{color:"red"}}
        />,
      ],
    },
  ];

  return (
    <Box
      sx={{
        bgcolor: 'background.default',
        mx: 3,
        mt: 3,
      }}
    >
      <Item sx={{ pt: 7, pb: 1, px: 7, borderRadius: 10 }} elevation={5}>
        <Typography variant="h5" mb={3} gutterBottom sx={{ fontWeight: 'bold' }}>
          Clients
        </Typography>
        <div style={{ width: '100%' , height : 500}}>
          <DataGrid
            pageSizeOptions={[7, 10, 20]}
            sx={{
              boxShadow: 0,
              border: 0,
              borderColor: 'primary.light',
              '& .MuiDataGrid-cell:hover': {
                color: 'primary.main',
              },
            }}
            rows={clients}
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
            Do you want to delete this, sir?
          </Typography>
          <span style={{ color: 'red' }}>This action is irreversible!</span>

          <Box sx={{ mt: 2, display: 'flex', gap: 2 }}>
            <Button
              variant="contained"
              color="error"
              onClick={handelDelete}
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
