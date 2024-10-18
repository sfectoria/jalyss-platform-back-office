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
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${ip}/clients`)
        setClients(response.data); 
        console.log("from clients",response.data);
      } catch (error) {
        console.log("Error fetching data:", error); 
      }
    };

    fetchData(); 
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
      field: 'companyName',
      headerName: 'Company Name',
      width: 200,
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
      field: 'details',
      headerName: 'More Details',
      width: 110,
      type: 'actions',
      getActions: ({id}) => [
        <GridActionsCellItem icon={<VisibilityIcon/>} onClick={()=>{handelDetails(id)}} label="Print" />,
      ]
    },
    {
      field: 'DELETE',
      headerName: 'Delete',
      width: 110,
      type: 'actions',
      getActions: ({id}) => [
        <GridActionsCellItem icon={<ClearIcon/>} onClick={()=>{handelDelete(id)}} label="Print" />,
      ]
    }
    
  ];
  
  const rows = [
    { id: 1, fullName: 'Sfax1', companyName: 'Sfax1/Sfax', clientEmail: "Salim sfexi" , details:"fff"},
    { id: 2, fullName: 'Stock l mida', companyName: 'Mida/menzel tmim/Nabeul', clientEmail: "Hamida midawi" },
    { id: 3, fullName: 'Stock sahlin', companyName: 'Sahlin/Sousse', clientEmail: "Wael ben sahloul" },
    { id: 4, fullName: 'Stock alia', companyName: 'Alia/bizerte', clientEmail: "Mouhamed Amin ben yahya" },
    { id: 5, fullName: 'Targaryen', companyName: 'Daenerys', clientEmail: "houssem ben ammar" },
    { id: 6, fullName: 'Melisandre', companyName: null, clientEmail: 150 },
    { id: 7, fullName: 'Clifford', companyName: 'Ferrara', clientEmail: 44 },
    { id: 8, fullName: 'Frances', companyName: 'Rossini', clientEmail: 36 },
    { id: 9, fullName: 'Roxie', companyName: 'Harvey', clientEmail: 65 },
  ];


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
        ...data.initialState,
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
