import * as React from 'react';
import Box from '@mui/material/Box';
import { DataGrid, GridToolbar, GridActionsCellItem } from '@mui/x-data-grid';
import Typography from '@mui/material/Typography';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { useNavigate } from 'react-router-dom';
import CustomNoResultsOverlay from '../../../style/NoResultStyle';
import Item from '../../../style/ItemStyle';
import ImagePopUp from '../../../component/ImagePopUp';

function createData(id,image, title, quantity, author, publisher, price) {
  return {
    id,
    image,
    title,
    quantity,
    author,
    publisher,
    price,
  };
}

export default function ArticlesList() {
  const navigate = useNavigate();
  const handleDetails = (ids) => {
    navigate(`/articles/${ids}`);
  };

  const columns = [
    { field: 'image', headerName: 'Image', width: 90 ,renderCell: (params) => {
      return<ImagePopUp image={params.value} />}
    },
    { field: 'title', headerName: 'Titel', width: 270 },
    { field: 'quantity', headerName: 'Quantity', width: 90 },
    { field: 'author', headerName: 'Author', width: 250 },
    { field: 'publisher', headerName: 'Publisher', width: 250 },
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
    createData(1,'https://jalyss.com/520-large_default/alabe-alghani-alabe-alfaker.jpg', 'الرجل الغني و الرجل الفقير', 24, 'robert ti kyosaki', 'maktabat jarir' ),
    createData(2,'https://jalyss.com/899-large_default/The-Subtle-Art-of-Not-Giving.jpg', 'فن اللامبالات',120, 'mark manson', 'attanwir'),
    createData(3,'https://jalyss.com/1064-home_default/-kon-ant.jpg', 'كن انت', 160, 'iheb hamarna','molhimon'),
    createData(4,'https://jalyss.com/2759-large_default/-.jpg', 'خلق الكون في القران الكريم', 123, 'walid mohyi e din al asghar', 'dar e salam'),
    createData(5,'https://jalyss.com/423-home_default/min-ajl-annajah.jpg', 'من أجل النجاح', 49, 'abd el karim bakkar','dar e salam'),
    createData(6,'https://jalyss.com/1170-large_default/-.jpg', 'اولاد حارتنا', 49, 'najib mahfoudh','dar e chourouk'),
  ];

  return (
          <Box
            sx={{
              bgcolor: 'background.default',
              mx:3,
              mt:3
            }}
          >
            <Item sx={{ pt: 7, pb: 1, px: 7, borderRadius: 10 }} elevation={5}>
              <Typography variant="h5" mb={3} gutterBottom sx={{ fontWeight: 'bold' }}>
                Articles
              </Typography>
              <div style={{ width: '100%', color:'red' }}>
               
                  <DataGrid
                  rowHeight={70}
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
