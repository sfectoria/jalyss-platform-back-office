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
import Tooltip from '@mui/material/Tooltip';
import MuiPagination from "@mui/material/Pagination";
import Typography from "@mui/material/Typography";
import VisibilityIcon from "@mui/icons-material/Visibility";
import UnarchiveSharpIcon from '@mui/icons-material/UnarchiveSharp';
import { useLocation, useNavigate } from "react-router-dom";
import CustomNoResultsOverlay from "../../../style/NoResultStyle";
import UnarchiveArticlePopUp from "./UnarchiveArticlePopUp";
import ArchiveArticleSnackBar from "./ArchiveArticleSnackBar";
import Item from "../../../style/ItemStyle";
import ImagePopUp from "../../../components/ImagePopUp";
import axios from "axios";
import { ip } from "../../../constants/ip";
import CustomNoRowsOverlay from "../../../style/NoRowsStyle";

const getPageFromUrl = () => {
  const params = new URLSearchParams(window.location.search);
  return +params.get("page") || 0;
};

const getPageSizeFromUrl = () => {
  const params = new URLSearchParams(window.location.search);
  return +params.get("take") || 10;
};

export default function ArchivedArticles() {
  const [rows, setRows] = useState([]);
  const [count, setCount] = useState(0);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);
  const [articleId, setArticleId] = useState(0);
  const [unarchivePopUp, setUnarchivePopUp] = useState(false);
  const location = useLocation();
  const [page, setPage] = useState(getPageFromUrl);
  const [pageSize, setPageSize] = useState(getPageSizeFromUrl());
  const [text, setText] = useState(null);
  const [refresh, setRefresh] = useState(true);
  const [openSnack, setOpenSnack] = useState(false);
  const [message, setMessage] = useState("");

  const navigate = useNavigate();

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
          setPage(newPage - 1, page);
          onPageChange(event, newPage - 1);
        }}
      />
    );
  }

  function CustomPagination(props) {
    return <GridPagination ActionsComponent={Pagination} {...props} />;
  }

  const handleDetails = (ids) => {
    navigate(`/articles/${ids}`);
  };

  useEffect(() => {
    fetchData();
  }, [location, text, refresh]);

  useEffect(() => {
    updateUrlParams();
  }, [page]);

  const fetchData = async () => {
    try {
      let queryParams = new URLSearchParams(location.search);
      let params = Object.fromEntries(queryParams.entries());
      if (text) params["text"] = text;

      const response = await axios.get(ip + "/articles/getAll", { params : { archived: true } });
      const result = response.data.data.map((ele) => {
        ele.quantity = ele.stockArticle.reduce((acc, ele) => {
          acc += ele.quantity;
          return acc;
        }, 0);
        return ele;
      });
      setRows(response.data.data);
      setCount(response.data.count);
    } catch (err) {
      setError(err);
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
      setPage(newPageInfo.page)
    }
    if (pageSize !== newPageInfo.pageSize) {
      setPageSize(newPageInfo.pageSize);
      const params = new URLSearchParams(location.search);
      params.set("page", 0);
      params.set("take", newPageInfo.pageSize);
      params.set("skip", 0);
      const newUrl = `${location.pathname}?${params.toString()}`;
      navigate(newUrl);
    }
  };

  const handleUnarchiveArticle = (id) => {
    setArticleId(id);
    setUnarchivePopUp(true);
    setMessage("Article unarchived")
    setRefresh((prev) => !prev)
  };

  const columns = [
    {
      field: "image",
      headerName: "Image",
      width: 90,
      renderCell: (value) => {
        return <ImagePopUp image={value?.row?.cover?.path} />;
      },
    },
    { field: "title", headerName: "Title", width: 210 },
    { field: "code", headerName: "Bar Code", width: 120 },
    { field: "quantity", headerName: "Quantity", width: 90 },
    {
      field: "author",
      headerName: "Author",
      width: 250,
      valueGetter: (value, row) => {
        const nameAr = row?.articleByAuthor[0]?.author?.nameAr;
        const nameEn = row?.articleByAuthor[0]?.author?.nameEn;
        return nameAr !== '' ? nameAr : nameEn;
      },
    },
    {
      field: "nameAr",
      headerName: "Publisher",
      width: 250,
      valueGetter: (value, row) => {
        const nameAr = row?.articleByPublishingHouse[0]?.publishingHouse?.nameAr;
        const nameEn = row?.articleByPublishingHouse[0]?.publishingHouse?.nameEn;
        return nameAr !== '' ? nameAr : nameEn;
      },
    },

    {
      field: "actions",
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

        <Tooltip title="Unarchive Article" >
          <GridActionsCellItem
            icon={<UnarchiveSharpIcon />}
            label="Unarchive"
            onClick={() => handleUnarchiveArticle(params.id)}
            style={{ color: "green" }}
          />
          </Tooltip>

        </>
      ),
    },
  ];

const navigateToArticles= ()=>{
  navigate('/articles')
}

  return (
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
            justifyContent: "space-between",
            alignItems: "center",
            mb: 2,
          }}
        >
       <Typography variant="h5" gutterBottom sx={{ fontWeight: "bold" }}>
       Archived Articles
          </Typography>
          <Tooltip title="Articles">
            <UnarchiveIcon
               onClick={navigateToArticles}
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
        <div style={{ width: "100%", color: "red", height: 500 }}>
          {unarchivePopUp && (
            <UnarchiveArticlePopUp
              refresh={refresh}
              setRefresh={setRefresh}
              setOpenSnack={setOpenSnack}
              articleId={articleId}
              status={unarchivePopUp}
              setStatus={setUnarchivePopUp}
            />
          )}
          <DataGrid
            rowHeight={70}
            pageSizeOptions={[7, 10, 20]}
            sx={{
              boxShadow: 0,
              border: 0,
              borderColor: "primary.light",
              "& .MuiDataGrid-cell:hover": {
                color: "primary.main",
              },
            }}
            onPaginationModelChange={(event) => {
              handlePageChange(event);
            }}
            onFilterModelChange={(e) => { setText(e.quickFilterValues.join(' ')) }}
            rows={rows}
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
          <ArchiveArticleSnackBar
            openSnack={openSnack}
            setOpenSnack={setOpenSnack}
            message={message}
          />
        </div>
      </Item>
    </Box>
  );
}