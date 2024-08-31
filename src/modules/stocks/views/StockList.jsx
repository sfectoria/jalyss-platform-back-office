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
import Typography from '@mui/material/Typography';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { useNavigate } from 'react-router-dom';
import CustomNoResultsOverlay from '../../../style/NoResultStyle';
import Item from '../../../style/ItemStyle';


import MuiPagination from "@mui/material/Pagination";
export default function StockList() {

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
  const navigate = useNavigate();
  const handleDetails = (ids) => {
    navigate(`/stock/${ids}`);
  };

  const columns = [
    { field: 'stockName', headerName: 'Stock name', width: 200 },
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
    { id: 1, stockName: 'Sfax1', address: 'Sfax1/Sfax', managerName: 'Salim sfexi', managerNumber: '+216 28527345', details: 'fff' },
    { id: 2, stockName: 'Stock l mida', address: 'Mida/menzel tmim/Nabeul', managerName: 'Hamida midawi' },
    { id: 3, stockName: 'Stock sahlin', address: 'Sahlin/Sousse', managerName: 'Wael ben sahloul' },
    { id: 4, stockName: 'Stock alia', address: 'Alia/bizerte', managerName: 'Mouhamed Amin ben yahya' },
    { id: 5, stockName: 'Targaryen', address: 'Daenerys', managerName: 'houssem ben ammar' },
    { id: 6, stockName: 'Melisandre', address: null, managerName: 150 },
    { id: 7, stockName: 'Clifford', address: 'Ferrara', managerName: 44 },
    { id: 8, stockName: 'Frances', address: 'Rossini', managerName: 36 },
    { id: 9, stockName: 'Roxie', address: 'Harvey', managerName: 65 },
  ];

  return (
          <Box
            sx={{
              bgcolor: 'background.default',
              mx:3,
              mt:3
            }}
          >
            <Item sx={{ py:5, px: 7, borderRadius: 10 }} elevation={5}>
              <Typography variant="h5" mb={3} gutterBottom sx={{ fontWeight: 'bold' }}>
                Stock
              </Typography>
              <div style={{ width: '100%' }}>
               
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
                      pagination: CustomPagination
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
