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
import MuiPagination from "@mui/material/Pagination";
import Tooltip from "@mui/material/Tooltip";
import UnarchiveSharpIcon from '@mui/icons-material/UnarchiveSharp';
import Typography from "@mui/material/Typography";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { useLocation, useNavigate } from "react-router-dom";
import CustomNoResultsOverlay from "../../../style/NoResultStyle";
import Item from "../../../style/ItemStyle";
import ImagePopUp from "../../../components/ImagePopUp";
import axios from "axios";
import { ip } from "../../../constants/ip";
import CustomNoRowsOverlay from "../../../style/NoRowsStyle";
import Avatar from "@mui/material/Avatar";
import { grey } from "@mui/material/colors";
import ArchivePublishingHouseSnackBar from "./ArchiveP.houseSnackBar";
import UnarchivePublishingHousePopUp from "./UnarchiveP.housePopUp";


const getPageFromUrl = () => {
  const params = new URLSearchParams(window.location.search);
  return +params.get("page") || 0;
};

const getPageSizeFromUrl = () => {
  const params = new URLSearchParams(window.location.search);
  return +params.get("take") || 10;
};

export const ArchivedPublishingHouses = () => {
    const [publishingHouses, setPublishingHouses] = useState([]);
    const [count, setCount] = useState(0);
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(true);
    const location = useLocation();
    const [page, setPage] = useState(getPageFromUrl);
    const [pageSize, setPageSize] = useState(getPageSizeFromUrl());
    const [text, setText] = useState(null);
    const [openSnack, setOpenSnack] = useState(false);
    const [unarchivePopUp, setUnarchivePopUp] = useState(false);
    const [message, setMessage] = useState("");
    const [publishingHouseId, setPublishingHouseId] = useState(0);
    const [refresh, setRefresh] = useState(true);
  
   
  
    function Pagination({ onPageChange, className }) {
      const apiRef = useGridApiContext();
      const pageCount = useGridSelector(apiRef, gridPageCountSelector);
  
      return (
        <MuiPagination
          color="secondary"
          className={className}
          count={pageCount}
          page={page + 1}
          onChange={(event, newPage) => {
            setPage(newPage - 1);
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
      console.log("Navigating to details for ID:", id);
      navigate(`${id}`);
    };
  
   
    const handleUnarchivePublishingHouse = (id) => {
      setPublishingHouseId(id);
      setUnarchivePopUp(true);
      setMessage("Publishing House unarchived");
      setRefresh((prev) => !prev);
    };
  
    
  
    useEffect(() => {
      fetchData();
    }, [location, text,refresh]);
  
    useEffect(() => {
      updateUrlParams();
    }, [page]);
  
    const fetchData = async () => {
      try {
        setError(false);
        let queryParams = new URLSearchParams(location.search);
        let params = Object.fromEntries(queryParams.entries());
        if (text) params["text"] = text;
  
        const response = await axios.get(ip + "/publishingHouses/all", {
          params,
        });
        const archivedPublishingHouses = response.data.filter((publishingHouse) => publishingHouse.archived);
        setPublishingHouses(archivedPublishingHouses);
        setCount(archivedPublishingHouses.length);
      } catch (err) {
        console.error("API Fetch Error:", err);
        setError(true);
      } finally {
        setLoading(false);
      }
    };
  
    const updateUrlParams = () => {
      const params = new URLSearchParams(location.search);
      params.set("page", page);
      params.set("take", pageSize);
      params.set("skip", page * pageSize);
      const newUrl = `${location.pathname}?${params.toString()}`;
      navigate(newUrl);
    };
  
    const handlePageChange = (newPageInfo) => {
      if (pageSize === newPageInfo.pageSize) {
        setPage(newPageInfo.page);
      } else {
        setPageSize(newPageInfo.pageSize);
        const params = new URLSearchParams(location.search);
        params.set("page", 0);
        params.set("take", newPageInfo.pageSize);
        params.set("skip", 0);
        const newUrl = `${location.pathname}?${params.toString()}`;
        navigate(newUrl);
      }
    };
  
    const columns = [
      {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        field: "logo",
        headerName: "Logo",
        width: 90,
  
        renderCell: (params) => (
          <Avatar
            src={params.row.logo?.path || ""}
            sx={{ bgcolor: grey[500], width: 35, height: 35 }}
          >
            {params.row.nameEn?.charAt(0)}
          </Avatar>
        ),
      },
      { field: "nameAr", headerName: "Name (AR)", width: 160 },
      { field: "nameEn", headerName: "Name (EN)", width: 185 },
      { field: "address", headerName: "Address", width: 200 },
      { field: "phone_number", headerName: "PhoneNumber", width: 155 },
      { field: "email", headerName: "Email", width: 210 },
      {
        field: "details",
        headerName: "Actions",
        width: 100,
        type: "actions",
        renderCell: (params) => [
          <>
          <Tooltip title="View Details">
            <GridActionsCellItem
              icon={<VisibilityIcon />}
              label="Details"
              onClick={() => handleDetails(params.id)}
            />
            </Tooltip>
            <Tooltip title="Unarchive Publishing House">
            <GridActionsCellItem
             icon={<UnarchiveSharpIcon />}
              label="Unarchive"
              onClick={() => handleUnarchivePublishingHouse(params.id)}
              style={{ color: "green" }}
            />
            </Tooltip>
          </>,
        ],
      },
    ];
  
const navigateToPHouse =()=>{
  navigate('/articles/publishingHouses')
}


    return (
      <>
      <Box
        sx={{
          bgcolor: "background.default",
          mx: 3,
          mt: 3,
        }}
      >
       
          <Item sx={{ pt: 7, pb: 1, px: 7, borderRadius: 10 }} elevation={5}>
          <Box
    sx={{
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between", 
      mb: 3,
    }}
  >
            <Typography
              variant="h5"
              mb={3}
              gutterBottom
              sx={{ fontWeight: "bold" }}
            >
                  Archived Publishing Houses
                  </Typography>
                  <Tooltip title="Articles">
            <UnarchiveIcon
               onClick={navigateToPHouse}
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

              </Box>
            
            
            <div style={{ width: "100%", height: 500 }}>
            {unarchivePopUp && (
              <UnarchivePublishingHousePopUp
                refresh={refresh}
                setRefresh={setRefresh}
                setOpenSnack={setOpenSnack}
                publishingHouseId={publishingHouseId}
                status={unarchivePopUp}
                setStatus={setUnarchivePopUp}
              />
            )}

              <DataGrid
                rowHeight={70}
                pageSizeOptions={[7, 10, 20, 100]}
                sx={{
                  boxShadow: 0,
                  border: 0,
                  borderColor: "primary.light",
                  "& .MuiDataGrid-cell:hover": {
                    color: "primary.main",
                  },
                }}
                onPaginationModelChange={(event) => handlePageChange(event)}
                onFilterModelChange={(e) =>
                  setText(e.quickFilterValues.join(" "))
                }
                rows={publishingHouses}
                columns={columns}
                pagination
                pageSize={pageSize}
                paginationMode="server"
                rowCount={count}
                slots={{
                  noRowsOverlay: CustomNoRowsOverlay,
                  noResultsOverlay: CustomNoResultsOverlay,
                  toolbar: GridToolbar,
                  pagination: CustomPagination,
                }}
                initialState={{
                  pagination: { paginationModel: { pageSize: 10 } },
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
               <ArchivePublishingHouseSnackBar
              openSnack={openSnack}
              setOpenSnack={setOpenSnack}
              message={message}
            />
            </div>
          </Item>
        </Box>
        
        </>
      
    );
}
