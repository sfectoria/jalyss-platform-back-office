import * as React from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import { DataGrid,GridToolbar,GridActionsCellItem  } from '@mui/x-data-grid';
import { useDemoData } from '@mui/x-data-grid-generator';
import { ThemeProvider } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { useNavigate } from 'react-router-dom';
import CustomNoResultsOverlay from '../../../style/NoResultStyle'
import lightTheme from '../../../style/lightTheme';
import Item from '../../../style/ItemStyle';

export default function ClientsList() {
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
      headerName: 'Client Name',
      width: 200,
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
         Clients
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
