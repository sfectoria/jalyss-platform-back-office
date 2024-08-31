import React, { useState } from "react";
import Box from '@mui/material/Box';
import {
  DataGrid,
  GridToolbar,
  GridActionsCellItem,
  gridPageCountSelector,
  GridPagination,
  useGridApiContext,
  useGridSelector,
} from "@mui/x-data-grid";
import { useDemoData } from '@mui/x-data-grid-generator';
import Typography from '@mui/material/Typography';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { useNavigate } from 'react-router-dom';
import CustomNoResultsOverlay from '../../../style/NoResultStyle'
import Item from '../../../style/ItemStyle';
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import { deepOrange } from '@mui/material/colors';

import MuiPagination from "@mui/material/Pagination";

export default function ClientsList() {

  const getPageFromUrl = () => {
    const params = new URLSearchParams(window.location.search);
    return +params.get("page") || 0;
  };

  const [page, setPage] = useState(getPageFromUrl());

  function Pagination({ onPageChange, className }) {
    const apiRef = useGridApiContext();
    const pageCount = useGridSelector(apiRef, gridPageCountSelector);
    console.log(page);

    return (
      <MuiPagination
      color='secondary'
        className={className}
        count={pageCount}
        page={page + 1}
        onChange={(event, newPage) => {
          setPage(newPage - 1, page);
          onPageChange(event, newPage - 1);
        }}
      />
    );
  }

  function CustomPagination(props) {
    return <GridPagination ActionsComponent={Pagination} {...props} />;
  }
  const { data } = useDemoData({
    dataSet: 'Commodity',
    rowLength: 500,
    maxColumns: 6,
  });
  const navigate = useNavigate()
  const handelDetails = (ids)=>{
    navigate(`/clients/${ids}`)
  }
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
      field: 'clientEmail',
      headerName: 'Client Email',
      width: 220,
    },
    {
      field: 'clientNumber',
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
            mt:3
          }}
        >   
            <Item sx={{pt:7,pb:1,px:7,borderRadius:10}} elevation={5}>
            <Typography variant="h5" mb={3} gutterBottom sx={{ fontWeight: 'bold' }}>
         Clients
        </Typography>
    <div style={{width:'100%'}}>
      <DataGrid
      pageSizeOptions={[7, 10,20]}
       sx={{
        boxShadow: 0,
        border: 0,
        borderColor: 'primary.light',
        '& .MuiDataGrid-cell:hover': {
          color: 'primary.main',
        }}}
        rows={rows}
        columns={columns}
       slots={{
        noResultsOverlay: CustomNoResultsOverlay,
         toolbar: GridToolbar,
        pagination: CustomPagination,
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
