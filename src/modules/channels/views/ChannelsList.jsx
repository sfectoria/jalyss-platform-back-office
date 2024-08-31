import React, { useState } from "react";
import Box from "@mui/material/Box";
import {
  DataGrid,
  GridToolbar,
  GridActionsCellItem,
  gridPageCountSelector,
  GridPagination,
  useGridApiContext,
  useGridSelector,
} from "@mui/x-data-grid";
import Typography from "@mui/material/Typography";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { useNavigate } from "react-router-dom";
import CustomNoResultsOverlay from "../../../style/NoResultStyle";
import Item from "../../../style/ItemStyle";



import MuiPagination from "@mui/material/Pagination";

const ChannelsList = () => {

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
  const handleDetails = (id) => {
    navigate(`/channels/channel-details/${id}`);
  };

  const columns = [
    { field: "channelName", headerName: "Channel name", width: 200 },
    { field: "address", headerName: "Address", width: 270 },
    { field: "managerName", headerName: "Manager name", width: 250 },
    { field: "managerNumber", headerName: "Manager Tel number", width: 250 },
    {
      field: "details",
      headerName: "Details",
      width: 110,
      type: "actions",
      getActions: ({ id }) => [
        <GridActionsCellItem
          icon={<VisibilityIcon />}
          onClick={() => handleDetails(id)}
          label=""
        />,
      ],
    },
  ];

  const rows = [
    {
      id: 1,
      channelName: "Sfax1",
      address: "Sfax1/Sfax",
      managerName: "Salim sfexi",
      managerNumber: "+216 28527345",
      details: "fff",
    },
    {
      id: 2,
      channelName: "Stock l mida",
      address: "Mida/menzel tmim/Nabeul",
      managerName: "Hamida midawi",
    },
    {
      id: 3,
      channelName: "Stock sahlin",
      address: "Sahlin/Sousse",
      managerName: "Wael ben sahloul",
    },
    {
      id: 4,
      channelName: "Stock alia",
      address: "Alia/bizerte",
      managerName: "Mouhamed Amin ben yahya",
    },
    {
      id: 5,
      channelName: "Targaryen",
      address: "Daenerys",
      managerName: "houssem ben ammar",
    },
    { id: 6, channelName: "Melisandre", address: null, managerName: 150 },
    { id: 7, channelName: "Clifford", address: "Ferrara", managerName: 44 },
    { id: 8, channelName: "Frances", address: "Rossini", managerName: 36 },
    { id: 9, channelName: "Roxie", address: "Harvey", managerName: 65 },
  ];

  return (
    <Box
      sx={{
        bgcolor: "background.default",
        mx: 3,
        mt: 3,
      }}
    >
      <Item sx={{ py: 5, px: 7, borderRadius: 10 }} elevation={5}>
        <Typography
          variant="h5"
          mb={3}
          gutterBottom
          sx={{ fontWeight: "bold" }}
        >
          Channels
        </Typography>
        <div style={{ width: "100%" }}>
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
      </Item>
    </Box>
  );
};

export default ChannelsList;

// import React, { useState } from 'react';
// import { TextField, Autocomplete, MenuItem, Typography } from '@mui/material';
// import 'bootstrap/dist/css/bootstrap.min.css';
// import 'bootstrap-icons/font/bootstrap-icons.css';

// const rows = [
//   { id: 1, col1: 'Hello', col2: 'World' },
//   { id: 2, col1: 'DataGrid', col2: 'is Awesome' },
//   { id: 3, col1: 'Material-UI', col2: 'is Cool' },
// ];

// const SearchWithDropdown = () => {
//   const [searchText, setSearchText] = useState('');

//   const handleInputChange = (event, value) => {
//     setSearchText(value);
//   };

//   const filteredRows = rows.filter((row) =>
//     Object.values(row).some((field) =>
//       String(field).toLowerCase().includes(searchText.toLowerCase())
//     )
//   );

//   return (
//     <div className="container mt-5">
//       <div className="input-group" style={{ width: '30%' }}>
//         <input type="text" className="form-control" placeholder="Search" />
//         <button className="btn btn-outline-secondary" type="button">
//         <i class="bi bi-upc-scan"></i>
//         </button>
//       </div>
//       <Autocomplete
//         freeSolo
//         inputValue={searchText}
//         onInputChange={handleInputChange}
//         options={filteredRows}
//         getOptionLabel={(option) => `${option.col1} ${option.col2}`}
//         renderInput={(params) => (
//           <TextField
//             {...params}
//             label="Search"
//             variant="outlined"
//             fullWidth
//           />
//         )}
//         renderOption={(props, option) => (
//           <MenuItem {...props} key={option.id}>
//             <div>
//               <Typography variant="body1">{`ID: ${option.id}`}</Typography>
//               <Typography variant="body1">{`Column 1: ${option.col1}`}</Typography>
//               <Typography variant="body1">{`Column 2: ${option.col2}`}</Typography>
//             </div>
//           </MenuItem>
//         )}
//       />
//     </div>
//   );
// };

// export default SearchWithDropdown;
