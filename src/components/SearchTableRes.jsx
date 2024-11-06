import * as React from 'react';
import Box from '@mui/material/Box';
import { DataGrid, GridToolbar, GridActionsCellItem } from '@mui/x-data-grid';
import Typography from '@mui/material/Typography';
import AddBoxIcon from '@mui/icons-material/AddBox';
import { useNavigate } from 'react-router-dom';
import CustomNoResultsOverlay from '../style/NoResultStyle';
import ImagePopUp from './ImagePopUp';
import CustomNoRowsOverlay from '../style/NoRowsStyle';

export default function SearchTableRes({handelRef,rows,handelAddItem}) {
  const navigate = useNavigate();
  const handleDetails = (obj) => {
    handelAddItem(obj)
    handelRef()
  };

 const columns = [
  { field: 'image', headerName: 'Image', width: 90 ,renderCell: (params) => {
    return<ImagePopUp image={params.value} />}
  },
  { field: 'title', headerName: 'Titel', width: 220 },
  { field: 'quantity', headerName: 'QTY', width: 70 },
  { field: 'author', headerName: 'Author', width: 210 },
  { field: 'publisher', headerName: 'Publisher', width: 180 },
  {
    field: 'details',
    headerName: 'Details',
    width: 70,
    type: 'actions',
    getActions: ({row}) => [
      <GridActionsCellItem icon={<AddBoxIcon />} onClick={() => handleDetails(row)} label="" />,
    ],
  },
];

  return (
    <div style={{ width: '100%', color:'red' , height : 500}}>
               
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
                      noRowsOverlay: CustomNoRowsOverlay,
                      noResultsOverlay: CustomNoResultsOverlay,
                    }}
                    initialState={{
                      pagination: { paginationModel: { pageSize: 7 } },
                    }}
                  />
             
              </div>
  );
}
