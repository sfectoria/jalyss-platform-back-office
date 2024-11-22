import React, { useState, useEffect } from "react";
import { Button } from "@mui/material";
import Box from "@mui/material/Box";
import {
  DataGrid,
  GridToolbar,
  gridPageCountSelector,
  GridPagination,
  useGridApiContext,
  useGridSelector,
  GridActionsCellItem,
} from "@mui/x-data-grid";
import MuiPagination from "@mui/material/Pagination";
import Typography from "@mui/material/Typography";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { useLocation, useNavigate } from "react-router-dom";
import CustomNoResultsOverlay from "../../../style/NoResultStyle";
import UnarchiveSharpIcon from "@mui/icons-material/UnarchiveSharp";
import ArchiveArticle from "../component/ArchiveArticlePopUp";
import ArchiveArticleSnackBar from "../component/ArchiveArticleSnackBar";
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

export default function ArticlesList() {
  const [rows, setRows] = useState([]);
  const [count, setCount] = useState(0);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);
  const [articleId, setArticleId] = useState(0);
  const [archivePopUp, setArchivePopUp] = useState(false);
  const location = useLocation();
  const [page, setPage] = useState(getPageFromUrl);
  const [pageSize, setPageSize] = useState(getPageSizeFromUrl());
  const [text, setText] = useState(null);
  const [refresh, setRefresh] = useState(true);
  const [openSnack, setOpenSnack] = useState(false);
  const [message, setMessage] = useState("");

  const navigate = useNavigate();

  const handleDetails = (id) => {
    navigate(`/articles/${id}`);
  };

  const navigateToArchivedArticles = () => {
    navigate("/articles/articlesarchived");
  };

  useEffect(() => {
    fetchData();
  }, [location, text, refresh]);

  useEffect(() => {
    updateUrlParams();
  }, [page, pageSize]);

  const fetchData = async () => {
    try {
      setLoading(true);
      const queryParams = new URLSearchParams(location.search);
      const params = Object.fromEntries(queryParams.entries());
      if (text) params.text = text;

      const response = await axios.get(`${ip}/articles/getAll`, { params });
      const result = response.data.data.map((article) => ({
        ...article,
        quantity: article.stockArticle.reduce((acc, stock) => acc + stock.quantity, 0),
      }));
      setRows(result);
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
    navigate(`${location.pathname}?${params.toString()}`);
  };

  const handlePageChange = (newPageInfo) => {
    if (pageSize === newPageInfo.pageSize) {
      setPage(newPageInfo.page);
    } else {
      setPageSize(newPageInfo.pageSize);
      setPage(0);
    }
  };

  const handleArchiveArticle = (id) => {
    setArticleId(id);
    setArchivePopUp(true);
    setMessage("Article archived");
    setRefresh((prev) => !prev);
  };

  const columns = [
    {
      field: "image",
      headerName: "Image",
      width: 90,
      renderCell: (params) => <ImagePopUp image={params.row?.cover?.path} />,
    },
    { field: "title", headerName: "Title", width: 210 },
    { field: "code", headerName: "Bar Code", width: 120 },
    { field: "quantity", headerName: "Quantity", width: 90 },
    {
      field: "author",
      headerName: "Author(s)",
      width: 250,
      valueGetter: (params) =>
        params.row.articleByAuthor
          ?.map((author) => author.author.nameAr)
          .join(", ") || "",
    },
    {
      field: "publisher",
      headerName: "Publisher(s)",
      width: 250,
      valueGetter: (params) =>
        params.row.articleByPublishingHouse
          ?.map((pub) => pub.publishingHouse.nameAr)
          .join(", ") || "",
    },
    {
      field: "actions",
      headerName: "Actions",
      width: 150,
      type: "actions",
      renderCell: (params) => (
        <>
          <GridActionsCellItem
            icon={<VisibilityIcon />}
            label="Details"
            onClick={() => handleDetails(params.id)}
          />
          <GridActionsCellItem
            icon={<UnarchiveSharpIcon />}
            label="Archive"
            onClick={() => handleArchiveArticle(params.id)}
            style={{ color: "red" }}
          />
        </>
      ),
    },
  ];

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

  return (
    <Box sx={{ bgcolor: "background.default", mx: 3, mt: 3 }}>
      <Item sx={{ pt: 7, pb: 1, px: 7, borderRadius: 10 }} elevation={5}>
        <Typography
          variant="h5"
          mb={3}
          gutterBottom
          sx={{ fontWeight: "bold", display: "flex", alignItems: "center" }}
        >
          Articles
          <Button
            variant="contained"
            onClick={navigateToArchivedArticles}
            sx={{ position: "absolute", right: 90, backgroundColor: "#701583" }}
          >
            Archived Articles
          </Button>
        </Typography>
        <div style={{ width: "100%", height: 500 }}>
          {archivePopUp && (
            <ArchiveArticle
              refresh={refresh}
              setRefresh={setRefresh}
              setOpenSnack={setOpenSnack}
              articleId={articleId}
              status={archivePopUp}
              setStatus={setArchivePopUp}
            />
          )}
          <DataGrid
            rowHeight={70}
            pageSizeOptions={[7, 10, 20]}
            sx={{
              boxShadow: 0,
              border: 0,
              "& .MuiDataGrid-cell:hover": { color: "primary.main" },
            }}
            onPaginationModelChange={handlePageChange}
            onFilterModelChange={(e) => setText(e.quickFilterValues.join(" "))}
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
