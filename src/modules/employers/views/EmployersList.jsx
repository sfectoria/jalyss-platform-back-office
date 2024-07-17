import * as React from 'react';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import { DataGrid,GridToolbar,GridActionsCellItem  } from '@mui/x-data-grid';
import { useDemoData } from '@mui/x-data-grid-generator';
import { createTheme, ThemeProvider, styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { useNavigate } from 'react-router-dom';


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
    { field: 'id', headerName: 'ID', width: 90 },
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
  const StyledGridOverlay = styled('div')(({ theme }) => ({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
    '& .no-results-primary': {
      fill: theme.palette.mode === 'light' ? '#AEB8C2' : '#3D4751',
    },
    '& .no-results-secondary': {
      fill: theme.palette.mode === 'light' ? '#E8EAED' : '#1D2126',
    },
  }));

  const Item = styled(Paper)(({ theme }) => ({
    ...theme.typography.body2,
    color: theme.palette.text.secondary,
    lineHeight: '60px',
  }));
  
  const lightTheme = createTheme({ palette: { mode: 'light' } });

  function CustomNoResultsOverlay() {
    return (
      <StyledGridOverlay>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          width={96}
          viewBox="0 0 523 299"
          aria-hidden
          focusable="false"
        >
          <path
            className="no-results-primary"
            d="M262 20c-63.513 0-115 51.487-115 115s51.487 115 115 115 115-51.487 115-115S325.513 20 262 20ZM127 135C127 60.442 187.442 0 262 0c74.558 0 135 60.442 135 135 0 74.558-60.442 135-135 135-74.558 0-135-60.442-135-135Z"
          />
          <path
            className="no-results-primary"
            d="M348.929 224.929c3.905-3.905 10.237-3.905 14.142 0l56.569 56.568c3.905 3.906 3.905 10.237 0 14.143-3.906 3.905-10.237 3.905-14.143 0l-56.568-56.569c-3.905-3.905-3.905-10.237 0-14.142ZM212.929 85.929c3.905-3.905 10.237-3.905 14.142 0l84.853 84.853c3.905 3.905 3.905 10.237 0 14.142-3.905 3.905-10.237 3.905-14.142 0l-84.853-84.853c-3.905-3.905-3.905-10.237 0-14.142Z"
          />
          <path
            className="no-results-primary"
            d="M212.929 185.071c-3.905-3.905-3.905-10.237 0-14.142l84.853-84.853c3.905-3.905 10.237-3.905 14.142 0 3.905 3.905 3.905 10.237 0 14.142l-84.853 84.853c-3.905 3.905-10.237 3.905-14.142 0Z"
          />
          <path
            className="no-results-secondary"
            d="M0 43c0-5.523 4.477-10 10-10h100c5.523 0 10 4.477 10 10s-4.477 10-10 10H10C4.477 53 0 48.523 0 43ZM0 89c0-5.523 4.477-10 10-10h80c5.523 0 10 4.477 10 10s-4.477 10-10 10H10C4.477 99 0 94.523 0 89ZM0 135c0-5.523 4.477-10 10-10h74c5.523 0 10 4.477 10 10s-4.477 10-10 10H10c-5.523 0-10-4.477-10-10ZM0 181c0-5.523 4.477-10 10-10h80c5.523 0 10 4.477 10 10s-4.477 10-10 10H10c-5.523 0-10-4.477-10-10ZM0 227c0-5.523 4.477-10 10-10h100c5.523 0 10 4.477 10 10s-4.477 10-10 10H10c-5.523 0-10-4.477-10-10ZM523 227c0 5.523-4.477 10-10 10H413c-5.523 0-10-4.477-10-10s4.477-10 10-10h100c5.523 0 10 4.477 10 10ZM523 181c0 5.523-4.477 10-10 10h-80c-5.523 0-10-4.477-10-10s4.477-10 10-10h80c5.523 0 10 4.477 10 10ZM523 135c0 5.523-4.477 10-10 10h-74c-5.523 0-10-4.477-10-10s4.477-10 10-10h74c5.523 0 10 4.477 10 10ZM523 89c0 5.523-4.477 10-10 10h-80c-5.523 0-10-4.477-10-10s4.477-10 10-10h80c5.523 0 10 4.477 10 10ZM523 43c0 5.523-4.477 10-10 10H413c-5.523 0-10-4.477-10-10s4.477-10 10-10h100c5.523 0 10 4.477 10 10Z"
          />
        </svg>
        <Box sx={{ mt: 2 }}>No results found.</Box>
      </StyledGridOverlay>
    );
  }

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
