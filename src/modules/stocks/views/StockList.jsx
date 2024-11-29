import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import { DataGrid, GridToolbar, GridActionsCellItem } from "@mui/x-data-grid";
import Typography from "@mui/material/Typography";
import VisibilityIcon from "@mui/icons-material/Visibility";
import ArchiveIcon from "@mui/icons-material/Archive";
import ArchiveSharpIcon from "@mui/icons-material/ArchiveSharp";
import { useNavigate } from "react-router-dom";
import CustomNoResultsOverlay from "../../../style/NoResultStyle";
import Item from "../../../style/ItemStyle";
import axios from "axios";
import Tooltip from '@mui/material/Tooltip';
import { ip } from "../../../constants/ip";
import CustomNoRowsOverlay from "../../../style/NoRowsStyle";
import ArchiveStockPopUp from "../component/ArchiveStockPopUp";
import ArchiveStockSnackBar from "../component/ArchiveStockSnackBar";

export default function StockList() {
  const [rows, setRows] = useState([]);
  const [popUp, setPopUp] = useState(false);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);
  const [stockId, setStockId] = useState(0);
  const [openSnack, setOpenSnack] = useState(false);
  const [refresh, setRefresh] = useState(true);

  const navigate = useNavigate();

  const handleDetails = (ids) => {
    navigate(`/stock/${ids}`);
  };
  useEffect(() => {
    fetchData();
  }, [refresh]);

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${ip}/stocks/getAll`);
      const filteredData = response.data.filter((stock) => stock.archived === false); 
      const modifiedData = filteredData.map((stock) => ({
        ...stock,
        managerName: stock.employee
          ? `${stock.employee.firstName} ${stock.employee.lastName}`
          : "N/A",
        managerNumber: stock.employee ? stock.employee.phoneNumber : "N/A",
      }));
      setRows(modifiedData);
      console.log("here",modifiedData);
      
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };
  
  const handelArchiveStock = (id) => {
    setStockId(id);
    setPopUp(true);
  };
  const columns = [
    { field: "name", headerName: "Stock name", width: 200 },
    { field: "location", headerName: "Address", width: 270 },
    { field: "managerName", headerName: "Manager name", width: 250 },
    { field: "managerNumber", headerName: "Manager Tel number", width: 250 },
    {
      field: "details",
      headerName: "Details",
      width: 110,
      type: "actions",
      renderCell: (params) => (
        <>
          <Tooltip title="View Details">
          <GridActionsCellItem
            icon={<VisibilityIcon />}
            label="Details"
            onClick={() => handleDetails(params.id)}
          />
          </Tooltip>
            <Tooltip title="Archive Stock">
          <GridActionsCellItem
            icon={<ArchiveSharpIcon />}
            label="Archive"
            onClick={() => handelArchiveStock(params.id)}
            style={{ color: "red" }}
          />
          </Tooltip>
        </>
      ),
    },
  ];
const navigateToArchiveStock =() =>{
  navigate("/stock/archived-Stock")
}
  return (
    <Box
      sx={{
        bgcolor: "background.default",
        mx: 3,
        mt: 3,
        height: "100vh",
      }}
    >
      <Item sx={{ py: 5, px: 7, borderRadius: 10 }} elevation={5}>
      <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mb: 2,
          }}
        >
       <Typography variant="h5" gutterBottom sx={{ fontWeight: "bold" }}>
       Stocks
          </Typography>
          <Tooltip title="Archived Stock">
            <ArchiveIcon
               onClick={navigateToArchiveStock}
              sx={{
                  flexShrink: 0,
                  ml: "auto",
                  marginBottom: { xs: 2, sm: 0 },
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  padding: 1,
                  cursor: "pointer",
                  fontSize: "55px",
                  color: "#701583",
              }}
            >
             </ArchiveIcon>
          </Tooltip>
        </Box>
        <div style={{ width: "100%", height: 500 }}>
          {popUp && (
            <ArchiveStockPopUp
              refresh={refresh}
              setRefresh={setRefresh}
              setOpenSnack={setOpenSnack}
              stockId={stockId}
              status={popUp}
              setStatus={setPopUp}
            />
          )}
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
              noRowsOverlay: CustomNoRowsOverlay,
              noResultsOverlay: CustomNoResultsOverlay,
              toolbar: GridToolbar,
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
          {openSnack && (
            <ArchiveStockSnackBar
              openSnack={openSnack}
              setOpenSnack={setOpenSnack}
            />
          )}
        </div>
      </Item>
    </Box>
  );
}
