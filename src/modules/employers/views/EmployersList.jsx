import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import { DataGrid,GridToolbar,GridActionsCellItem  } from '@mui/x-data-grid';
import { useDemoData } from '@mui/x-data-grid-generator';
import Typography from '@mui/material/Typography';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { useNavigate } from 'react-router-dom';
import CustomNoResultsOverlay from '../../../style/NoResultStyle'
import Item from '../../../style/ItemStyle';
import { Pagination, Stack } from '@mui/material';
import { GridPagination } from "@mui/x-data-grid";
import { styled } from "@mui/material/styles";
import axios from 'axios';
import { ip } from '../../../constants/ip';

function BasicPagination() {
  return (
    <Stack spacing={2}>
      <Pagination count={10} color="secondary" />
    </Stack>
  );
}

export default function EmployeesList() {

const [employer,setEmployer]=useState([])

useEffect(()=>{
  const fetchEmplyer = async()=>{
    try {
      const response = await axios.get(`${ip}/employees/all`)
      setEmployer(response.data)
      console.log("from employers",response.data);
      
    } catch (error) {
      console.log("error fetching data",error);
    }
  }
  fetchEmplyer()
},[])



  const { data } = useDemoData({
    dataSet: 'Commodity',
    rowLength: 500,
    maxColumns: 6,
  });
  const navigate = useNavigate()
  const handelDetails = (ids)=>{
    navigate('/stock/location',{state:{id:ids}})
  }
  const columns = [
    {
      field: `firstName`,
      headerName: 'Employer Name',
      width: 200,
    },
    {
      field: 'position',
      headerName: 'Post',
      width: 200,
    },
    {
      field: 'postLocation',
      headerName: 'Post Location',
      width: 200,
    },
    {
      field: 'email',
      headerName: 'Email',
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
      width: 200,
    },
    {
      field: 'details',
      headerName: 'More Details',
      width: 110,
      type: 'actions',
      getActions: ({id}) => [
        <GridActionsCellItem icon={<VisibilityIcon/>} onClick={()=>{handelDetails(id)}} label="Print" />,
      ]
    }
    
  ];
  
  // const rows = [
  //   { id: 1, post: 'Manager', postLocation: 'Sfax1/Sfax', fullName: "Salim sfexi" ,empEmail:"slouma@gmail.com", details:"fff"},
  //   { id: 2, post: 'Vendure', postLocation: 'Boutique Nabeul',empEmail:"hamidamidawi@gmail.com", fullName: "Hamida midawi" },
  //   { id: 3, post: 'Manager', postLocation: 'Stock Sahlin',empEmail:"waelbensahloul@gmail.com", fullName: "Wael ben sahloul" },
  //   { id: 4, post: '', postLocation: 'Stock alia', fullName: "Mouhamed Amin ben yahya" },
  //   { id: 5, post: 'Targaryen', postLocation: 'Daenerys', fullName: "houssem ben ammar" },
  //   { id: 6, post: 'Melisandre', postLocation: null, fullName: 150 },
  //   { id: 7, post: 'Clifford', postLocation: 'Ferrara', fullName: 44 },
  //   { id: 8, post: 'Frances', postLocation: 'Rossini', fullName: 36 },
  //   { id: 9, post: 'Roxie', postLocation: 'Harvey', fullName: 65 },
  // ];
  return (
    <Box
      sx={{
        bgcolor: "background.default",
        mx: 3,
        mt: 3,
      }}
    >
      <Item sx={{ pt: 7, pb: 1, px: 7, borderRadius: 10 }} elevation={5}>
        <Typography variant="h5" mb={3} gutterBottom>
          Employers
        </Typography>
        <div style={{ height: 500 }}>
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
            rows={employer}
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
        <BasicPagination />
      </Item>
    </Box>
  );
}
