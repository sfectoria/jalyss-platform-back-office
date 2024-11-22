import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import {
  DataGrid,
  GridToolbar,
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
  const location = useLocation();
  const [page, setPage] = useState(getPageFromUrl);
  const [pageSize, setPageSize] = useState(getPageSizeFromUrl());
  const [text, setText] = useState(null);

  const navigate = useNavigate();

  const handleDetails = (ids) => {
    navigate(`/articles/${ids}`);
  };

  useEffect(() => {
    fetchData();
  }, [location, text]);

  useEffect(() => {
    updateUrlParams();
  }, [page]);

  const fetchData = async () => {
    try {
      let queryParams = new URLSearchParams(location.search);
      let params = Object.fromEntries(queryParams.entries());
      if (text) params["text"] = text;
      const response = await axios.get(ip + "/articles/getAll", {
        params,
      });
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
      setPage(newPageInfo.page);
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
      headerName: "Author(s)",
      width: 250,
      valueGetter: (value, row) => {
        return row?.articleByAuthor
          ?.map((e) => e.author.nameAr)
          .join(", ") || "";
      },
    },
    {
      field: "nameAr",
      headerName: "Publisher(s)",
      width: 250,
      valueGetter: (value, row) => {
        return row?.articleByPublishingHouse
          ?.map((e) => e.publishingHouse.nameAr)
          .join(", ") || "";
      },
    },
    {
      field: "actions",
      headerName: "Actions",
      width: 100,
      type: "actions",
      renderCell: (params) => (
        <VisibilityIcon
          onClick={() => handleDetails(params.id)}
          style={{ cursor: "pointer" }}
        />
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
    <Box
      sx={{
        bgcolor: "background.default",
        mx: 3,
        mt: 3,
      }}
    >
      <Item sx={{ pt: 7, pb: 1, px: 7, borderRadius: 10 }} elevation={5}>
        <Typography
          variant="h5"
          mb={3}
          gutterBottom
          sx={{ fontWeight: "bold" }}
        >
          Articles
        </Typography>
        <div style={{ width: "100%", color: "red", height: 500 }}>
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
            onFilterModelChange={(e) => {
              setText(e.quickFilterValues.join(" "));
            }}
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
        </div>
      </Item>
    </Box>
  );
}
