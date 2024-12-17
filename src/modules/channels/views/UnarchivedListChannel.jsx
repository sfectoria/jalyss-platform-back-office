import React, { useState, useEffect } from "react";
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
import UnarchiveIcon from "@mui/icons-material/Unarchive";
import UnarchiveSharpIcon from "@mui/icons-material/UnarchiveSharp";
import Tooltip from '@mui/material/Tooltip';
import Typography from "@mui/material/Typography";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { useNavigate } from "react-router-dom";
import CustomNoResultsOverlay from "../../../style/NoResultStyle";
import Item from "../../../style/ItemStyle";
import { ip } from "../../../constants/ip";
import axios from "axios";
import CustomNoRowsOverlay from "../../../style/NoRowsStyle";
import ArchiveChannels from "./ArchiveChannels";
import ArchiveChannelSnackBar from "./ArchiveChannelSnackBar";
import UnarchiveChannelSnackBar from "./UnarchiveChannelSnackBar";
import UnarchiveChannels from "./UnarchiveChannels";

const getPageFromUrl = () => {
  const params = new URLSearchParams(window.location.search);
  return +params.get("page") || 0;
};

const getPageSizeFromUrl = () => {
  const params = new URLSearchParams(window.location.search);
  return +params.get("take") || 10;
};

const UnarchivedListChannel = () => {
  const [rows, setRows] = useState([]);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);
 const [channelId, setChannelId] = useState(0);
 const [archivePopUp, setArchivePopUp] = useState(false);
  const [message, setMessage] = useState("");
 const [refresh, setRefresh] = useState(true);
const [openSnack, setOpenSnack] = useState(false);

  const navigate = useNavigate();

  const handleDetails = (id) => {
    navigate(`/channels/channel-details/${id}`);
  };

  useEffect(() => {
    fetchData();
  }, [refresh]);

  const fetchData = async () => {
    try {
      const response = await axios.get(`${ip}/selling/getAll`);
      console.log(response.data);
  
      if (response.data) {
        const filteredData = response.data.filter((item) => item.archived === true);
        setRows(filteredData);
        console.log("th1",filteredData);
        
      } else {
        setRows([]);
      }
    } catch (err) {
      setError(err);
      setRows([]);
    } finally {
      setLoading(false);
    }
  };
  

  const handleArchiveChannel = (id) => {
    setChannelId(id);
    setArchivePopUp(true);
    setMessage("Channel Unarchived");
    setRefresh((prev) => !prev);
  };

  const navigateToUnarchivedChannel = () => {
    navigate("/channels");
  };

  const columns = [
    { field: "name", headerName: "Channel name", width: 200 },
    { field: "region", headerName: "Address", width: 270 },
    {
      field: "managerName",
      headerName: "Manager name",
      width: 250,
      valueGetter: (value, row) =>
        row?.Employee
          ? `${row.Employee.firstName} ${row.Employee.lastName}`
          : "No manager",
    },
    {
      field: "managerNumber",
      headerName: "Manager Tel number",
      width: 250,
      valueGetter: (value, row) =>
        row?.Employee?.phoneNumber || "No number",
    },
    {
      field: "details",
      headerName: "Actions",
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
          <Tooltip title="Unarchive Channel">
            <GridActionsCellItem
              icon={<UnarchiveSharpIcon />}
              label="Archive"
              onClick={() => handleArchiveChannel(params.id)}
              style={{ color: "red" }}
              />
          </Tooltip>
        </>
      ),
    },
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
            sx={{
              fontWeight: "bold",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
        >
          Archived Channels
          <Tooltip title="Channels">
              <UnarchiveIcon
                variant="contained"
                color="primary"
                onClick={navigateToUnarchivedChannel}
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
             />
             
            </Tooltip>
        </Typography>
        <div style={{ width: "100%", height: 500 }}>
             {archivePopUp && (
                      <UnarchiveChannels
                        refresh={refresh}
                        setRefresh={setRefresh}
                        setOpenSnack={setOpenSnack}
                        channelId={channelId}
                        status={archivePopUp}
                        setStatus={setArchivePopUp}
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
            loading={loading}
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
             <UnarchiveChannelSnackBar
                      openSnack={openSnack}
                      setOpenSnack={setOpenSnack}
                      message={message}
                    />
        </div>
      </Item>
    </Box>
  );
};

export default UnarchivedListChannel;
