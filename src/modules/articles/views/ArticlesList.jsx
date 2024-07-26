import * as React from 'react';
import Box from '@mui/material/Box';
import { DataGrid, GridToolbar, GridActionsCellItem } from '@mui/x-data-grid';
import Typography from '@mui/material/Typography';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { useNavigate } from 'react-router-dom';
import CustomNoResultsOverlay from '../../../style/NoResultStyle';
import Item from '../../../style/ItemStyle';
import ImagePopUp from '../../../component/ImagePopUp';

export default function ArticlesList() {
  const navigate = useNavigate();
  const handleDetails = (ids) => {
    navigate(`/articles/${ids}`);
  };

  const columns = [
    { field: 'articleImage', headerName: 'Image', width: 90 ,renderCell: (params) => (
      <ImagePopUp image={params.row.articleImage} />
    ) },
    { field: 'address', headerName: 'Address', width: 270 },
    { field: 'managerName', headerName: 'Manager name', width: 250 },
    { field: 'managerNumber', headerName: 'Manager Tel number', width: 250 },
    {
      field: 'details',
      headerName: 'Details',
      width: 110,
      type: 'actions',
      getActions: ({ id }) => [
        <GridActionsCellItem icon={<VisibilityIcon />} onClick={() => handleDetails(id)} label="" />,
      ],
    },
  ];

  const rows = [
    { id: 1, articleImage: 'https://jalyss.com/520-large_default/alabe-alghani-alabe-alfaker.jpg', address: 'Sfax1/Sfax', managerName: 'Salim sfexi', managerNumber: '+216 28527345', details: 'fff' },
    { id: 2, articleImage: 'Stock l mida', address: 'Mida/menzel tmim/Nabeul', managerName: 'Hamida midawi' },
    { id: 3, articleImage: 'Stock sahlin', address: 'Sahlin/Sousse', managerName: 'Wael ben sahloul' },
    { id: 4, articleImage: 'Stock alia', address: 'Alia/bizerte', managerName: 'Mouhamed Amin ben yahya' },
    { id: 5, articleImage: 'Targaryen', address: 'Daenerys', managerName: 'houssem ben ammar' },
    { id: 6, articleImage: 'Melisandre', address: null, managerName: 150 },
    { id: 7, articleImage: 'Clifford', address: 'Ferrara', managerName: 44 },
    { id: 8, articleImage: 'Frances', address: 'Rossini', managerName: 36 },
    { id: 9, articleImage: 'Roxie', address: 'Harvey', managerName: 65 },
  ];

  return (
          <Box
            sx={{
              bgcolor: 'background.default',
              marginLeft: '2%',
              marginRight: '2%',
            }}
          >
            <Item sx={{ pt: 7, pb: 1, px: 7, borderRadius: 10 }} elevation={5}>
              <Typography variant="h5" mb={3} gutterBottom sx={{ fontWeight: 'bold' }}>
                Articles
              </Typography>
              <div style={{ width: '100%', color:'red' }}>
               
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
                    rows={rows}
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
