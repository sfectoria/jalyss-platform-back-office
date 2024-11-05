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
import CustomNoRowsOverlay from '../../../style/NoRowsStyle';


export default function AuthorsList() {
  const [authors, setAuthors] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${ip}/author`);
        setAuthors(response.data);
        console.log('from authors', response.data);
      } catch (error) {
        console.log('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const navigate = useNavigate();

  const handleDetails = (id) => {
    navigate(`${id}`);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${ip}/author/${id}`);
      setAuthors(authors.filter((author) => author.id !== id));
    } catch (error) {
      console.log('Error deleting author:', error);
    }
  };


  const columns = [
    // { field: 'id', headerName: 'ID', width: 70 },
    {
      field:'image',
      headerName:'',
      width:90,
      getActions:({})=>[
        <Stack direction="row" spacing={2}>
        <Avatar sx={{ bgcolor: deepOrange[500], width: 50, height: 50,fontSize:50}}>A</Avatar>
      </Stack>
      ]
    },
    {
      field: 'nameAr',
      headerName: 'Author Name Ar',
      width: 200,
    },
    {
      field: 'nameEn',
      headerName: 'Author Name Eng',
      width: 200,
    },
    {
      field: 'biographyAr',
      headerName: 'Author Bio Ar',
      width: 220,
    },
    {
      field: 'biographyEn',
      headerName: 'Author Bio En',
      width: 150,
    },

    {
      field: 'actions',
      headerName: 'Actions',
      width: 100,
      type: 'actions',
      getActions: ({ id }) => {
        return [
          <GridActionsCellItem
          icon={<VisibilityIcon />}
          label="Details"
          onClick={() => handleDetails(id)} 
          />,
          <GridActionsCellItem
            icon={<DeleteOutlineIcon />}
            label="Delete"
            onClick={() => handleDelete(id)}
            color="inherit"
          />,
        ];
      },
    }
  ]

  return (
    <Box sx={{ bgcolor: 'background.default', mx: 3, mt: 3 }}>
      <Item sx={{ pt: 7, pb: 1, px: 7, borderRadius: 10 }} elevation={5}>
        <Typography variant="h5" mb={3} gutterBottom sx={{ fontWeight: 'bold' }}>
          Authors
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
    </Box>
  );
}
