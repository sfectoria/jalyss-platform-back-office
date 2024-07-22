import * as React from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import { DataGrid,GridToolbar,GridActionsCellItem  } from '@mui/x-data-grid';
import { useDemoData } from '@mui/x-data-grid-generator';
import {ThemeProvider } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { useNavigate } from 'react-router-dom';
import CustomNoResultsOverlay from '../../../style/NoResultStyle'
import lightTheme from '../../../style/lightTheme';
import Item from '../../../style/ItemStyle';


export default function EmployersList() {
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
      field: 'fullName',
      headerName: 'Employer Name',
      width: 200,
    },
    {
      field: 'post',
      headerName: 'Post',
      width: 200,
    },
    {
      field: 'postLocation',
      headerName: 'Post Location',
      width: 200,
    },
    {
      field: 'empEmail',
      headerName: 'Email',
      width: 220,
    },
    {
      field: 'empNumber',
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
  
  const rows = [
    { id: 1, post: 'Manager', postLocation: 'Sfax1/Sfax', fullName: "Salim sfexi" ,empEmail:"slouma@gmail.com", details:"fff"},
    { id: 2, post: 'Vendure', postLocation: 'Boutique Nabeul',empEmail:"hamidamidawi@gmail.com", fullName: "Hamida midawi" },
    { id: 3, post: 'Manager', postLocation: 'Stock Sahlin',empEmail:"waelbensahloul@gmail.com", fullName: "Wael ben sahloul" },
    { id: 4, post: '', postLocation: 'Stock alia', fullName: "Mouhamed Amin ben yahya" },
    { id: 5, post: 'Targaryen', postLocation: 'Daenerys', fullName: "houssem ben ammar" },
    { id: 6, post: 'Melisandre', postLocation: null, fullName: 150 },
    { id: 7, post: 'Clifford', postLocation: 'Ferrara', fullName: 44 },
    { id: 8, post: 'Frances', postLocation: 'Rossini', fullName: 36 },
    { id: 9, post: 'Roxie', postLocation: 'Harvey', fullName: 65 },
  ];

  return (<Grid    >
    <Grid item  >
      <ThemeProvider theme={lightTheme}>
        <Box
          sx={{
            pt:7,
            bgcolor: 'background.default',
            display: 'grid',
            marginLeft:'20%',
            marginRight:2
          }}
        >   
            <Item sx={{pt:7,pb:1,px:7,borderRadius:10}} elevation={5}>
            <Typography variant="h5" mb={3} gutterBottom sx={{ fontWeight: 'bold' }}>
         Employers
        </Typography>
    <div style={{height:500 }}>
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
       </ThemeProvider>
     </Grid>
 </Grid>
  );
}
