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
import { useDemoData } from "@mui/x-data-grid-generator";
import Typography from "@mui/material/Typography";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { useNavigate } from "react-router-dom";
import CustomNoResultsOverlay from "../../../style/NoResultStyle";
import Item from "../../../style/ItemStyle";
import MuiPagination from "@mui/material/Pagination";

export default function EmployeesList() {
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
    dataSet: "Commodity",
    rowLength: 500,
    maxColumns: 6,
  });
  const navigate = useNavigate();
  const handelDetails = (ids) => {
    navigate("/stock/location", { state: { id: ids } });
  };
  const columns = [
    {
      field: "fullName",
      headerName: "Employer Name",
      width: 200,
    },
    {
      field: "post",
      headerName: "Post",
      width: 200,
    },
    {
      field: "postLocation",
      headerName: "Post Location",
      width: 200,
    },
    {
      field: "empEmail",
      headerName: "Email",
      width: 220,
    },
    {
      field: "empNumber",
      headerName: "Phone Number",
      width: 150,
    },
    {
      field: "address",
      headerName: "Address",
      width: 200,
    },
    {
      field: "details",
      headerName: "More Details",
      width: 110,
      type: "actions",
      getActions: ({ id }) => [
        <GridActionsCellItem
          icon={<VisibilityIcon />}
          onClick={() => {
            handelDetails(id);
          }}
          label="Print"
        />,
      ],
    },
  ];

  const rows = [
    {
      id: 1,
      post: "Manager",
      postLocation: "Sfax1/Sfax",
      fullName: "Salim sfexi",
      empEmail: "slouma@gmail.com",
      details: "fff",
    },
    {
      id: 2,
      post: "Vendure",
      postLocation: "Boutique Nabeul",
      empEmail: "hamidamidawi@gmail.com",
      fullName: "Hamida midawi",
    },
    {
      id: 3,
      post: "Manager",
      postLocation: "Stock Sahlin",
      empEmail: "waelbensahloul@gmail.com",
      fullName: "Wael ben sahloul",
    },
    {
      id: 4,
      post: "",
      postLocation: "Stock alia",
      fullName: "Mouhamed Amin ben yahya",
    },
    {
      id: 5,
      post: "Targaryen",
      postLocation: "Daenerys",
      fullName: "houssem ben ammar",
    },
    { id: 6, post: "Melisandre", postLocation: null, fullName: 150 },
    { id: 7, post: "Clifford", postLocation: "Ferrara", fullName: 44 },
    { id: 8, post: "Frances", postLocation: "Rossini", fullName: 36 },
    { id: 9, post: "Roxie", postLocation: "Harvey", fullName: 65 },
  ];
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
}
