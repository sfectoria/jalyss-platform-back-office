import React, { useState, useEffect } from "react";
import Button from "@mui/material/Button";
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
import MuiPagination from "@mui/material/Pagination";
import Typography from "@mui/material/Typography";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { useLocation, useNavigate } from "react-router-dom";
import CustomNoResultsOverlay from "../../../style/NoResultStyle";
import Item from "../../../style/ItemStyle";
import ImagePopUp from "../../../components/ImagePopUp";
import axios from "axios";
import { ip } from "../../../constants/ip";
import CustomNoRowsOverlay from "../../../style/NoRowsStyle";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import Avatar from "@mui/material/Avatar";
import { grey } from "@mui/material/colors";
import { MdOutlinePersonAdd } from "react-icons/md";

const getPageFromUrl = () => {
  const params = new URLSearchParams(window.location.search);
  return +params.get("page") || 0;
};

const getPageSizeFromUrl = () => {
  const params = new URLSearchParams(window.location.search);
  return +params.get("take") || 10;
};

export default function PublishingHousesList() {
  const [publishingHouses, setPublishingHouses] = useState([]);
  const [count, setCount] = useState(0);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);
  const location = useLocation();
  const [page, setPage] = useState(getPageFromUrl);
  const [pageSize, setPageSize] = useState(getPageSizeFromUrl());
  const [text, setText] = useState(null);
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [publishingHouseToDelete, setPublishingHouseToDelete] = useState(null);

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

  const handleDeleteClick = (id) => {
    setPublishingHouseToDelete(id);
    setConfirmDelete(true);
  };

  const handleDelete = async () => {
    try {
      const response = await axios.delete(
        `${ip}/publishingHouses/${publishingHouseToDelete}`
      );
      console.log(response.data);
      setPublishingHouses((prevHouses) =>
        prevHouses.filter((house) => house.id !== publishingHouseToDelete)
      );
      setConfirmDelete(false);
      setPublishingHouseToDelete(null);
      await fetchData();
    } catch (error) {
      console.log("Error deleting publishing house:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [location, text]);

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
      console.log(response.data);
      setPublishingHouses(response.data);
      setCount(response.data.length);
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
      headerName: "Details",
      width: 75,
      type: "actions",
      renderCell: (params) => [
        <>
          <GridActionsCellItem
            icon={<VisibilityIcon />}
            label="Details"
            onClick={() => handleDetails(params.id)}
          />
          <GridActionsCellItem
            icon={<DeleteOutlineIcon />}
            label="Delete"
            onClick={() => handleDeleteClick(params.id)}
            style={{ color: "red" }}
          />
        </>,
      ],
    },
  ];

  return (
    <Box
      sx={{
        bgcolor: "background.default",
        mx: 3,
        mt: 3,
        position: "relative",
      }}
    >
      <Box
        sx={{
          filter: confirmDelete ? "blur(2px)" : "none",
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
            Publishing Houses
          </Typography>
          <Box
            sx={{
              display: "flex",
              justifyContent: "flex-end",
              padding: 1,
              borderRadius: "50%",
              cursor: "pointer",
            }}
            onClick={() => navigate("/articles/add-publishingHouses")}
          >
            <MdOutlinePersonAdd size={53} />
            </Box>
          </Box>
          <div style={{ width: "100%", color: "red", height: 500 }}>
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
          </div>
        </Item>
      </Box>

      {confirmDelete && (
        <>
          <Box
            sx={{
              position: "fixed",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              backgroundColor: "rgba(0, 0, 0, 0.5)",
              zIndex: 999,
            }}
            onClick={() => setConfirmDelete(false)}
          />

          <Box
            sx={{
              backgroundColor: "#dc2626",
              padding: "20px",
              borderRadius: "8px",
              boxShadow: "0 0 10px rgba(0,0,0,0.1)",
              position: "fixed",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              zIndex: 1000,
            }}
          >
            <Typography sx={{ fontSize: 20, mb: 2, color: "white" }}>
              Do you want to delete this PublishingHouse?
            </Typography>
            <span style={{ color: "white" }}>This action is irreversible!</span>

            <Box sx={{ mt: 2, display: "flex", gap: 2 }}>
              <Button
                variant="contained"
                color="error"
                onClick={handleDelete}
                sx={{
                  backgroundColor: "white",
                  color: "red",
                  "&:hover": {
                    backgroundColor: "red",
                    color: "white",
                  },
                }}
              >
                Yes, Delete
              </Button>

              <Button
                variant="contained"
                color="error"
                onClick={() => setConfirmDelete(false)}
                sx={{
                  backgroundColor: "white",
                  color: "red",
                  "&:hover": {
                    backgroundColor: "red",
                    color: "white",
                  },
                }}
              >
                Cancel
              </Button>
            </Box>
          </Box>
        </>
      )}
    </Box>
  );
}
