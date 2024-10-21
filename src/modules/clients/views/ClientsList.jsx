import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import { DataGrid,GridToolbar,GridActionsCellItem  } from '@mui/x-data-grid';
import { useDemoData } from '@mui/x-data-grid-generator';
import Typography from '@mui/material/Typography';
import VisibilityIcon from '@mui/icons-material/Visibility';
import ModeEditOutlineIcon from '@mui/icons-material/ModeEditOutline';
import { useNavigate } from 'react-router-dom';
import CustomNoResultsOverlay from '../../../style/NoResultStyle'
import Item from '../../../style/ItemStyle';
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import { deepOrange } from '@mui/material/colors';
import { ip } from '../../../constants/ip';
import axios from 'axios';
import ClearIcon from '@mui/icons-material/Clear';




export default function ClientsList() {
  const [clients, setClients] = useState([]); 
  const [categories, setCategories] = useState([]);


  useEffect(() => {
    // Fetch clients
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
  const navigate = useNavigate()
  const handelDetails = (ids)=>{
    navigate(`/clients/${ids}`)
  }

  const handelDelete = async (id) => {
    try {
      await axios.delete(`${ip}/clients/${id}`); 
      setClients(clients.filter(client => client.id !== id)); 
    } catch (error) {
      console.log("Error deleting client:", error);
    }
  };
  const categoryMap = categories.reduce((acc, category) => {
    acc[category.id] = category.name;
    return acc;
  }, {});

  const columns = [
    { field: 'id', headerName: 'ID', width: 70 },
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
      field: 'fullName',
      headerName: 'Client Name',
      width: 200,
      // getActions:({})=>{}
    },
    {
      field: 'categoryClient',
      headerName: 'Category',
      width: 200,
      renderCell: (params) => {
        const categoryName = categoryMap[params.row.idCategoryClient] ;
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
      getActions: ({ id }) => {
        return [
          <GridActionsCellItem
          icon={<VisibilityIcon />}
          label="Details"
          onClick={() => handelDetails(id)} 
          />,
          <GridActionsCellItem
            icon={<ClearIcon />}
            label="Delete"
            onClick={() => handelDelete(id)}
            color="inherit"
          />,
        ];
      },
    }
  ]


  return (
        <Box
          sx={{
            bgcolor: 'background.default',
            mx:3,
            mt:3,
            height: '100vh',
          }}
        >   
            <Item sx={{pt:7,pb:1,px:7,borderRadius:10}} elevation={5}>
            <Typography variant="h5" mb={3} gutterBottom sx={{ fontWeight: 'bold' }}>
         Clients
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
        rows={clients}
        columns={columns}
       slots={{
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
