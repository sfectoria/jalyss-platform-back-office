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
import MuiPagination from "@mui/material/Pagination";
import Typography from "@mui/material/Typography";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { useLocation, useNavigate } from "react-router-dom";
import CustomNoResultsOverlay from "../../../style/NoResultStyle";
import Item from "../../../style/ItemStyle";
import ImagePopUp from "../../../components/ImagePopUp";
import axios from "axios";
import { ip } from "../../../constants/ip";

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
 
  function Pagination({ onPageChange, className }) {
    const apiRef = useGridApiContext();
    const pageCount = useGridSelector(apiRef, gridPageCountSelector);
    console.log(page);

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
      console.log("hh", new URLSearchParams(location.search));
      let params = Object.fromEntries(queryParams.entries());
      console.log(params);
      if (text) params["text"] = text;
      console.log(params, text);
      const response = await axios.get(ip + "/articles/getAll", {
        params,
      });
      console.log(response.data.data);

      const result = response.data.data.map((ele) => {
        ele.quantity = ele.stockArticle.reduce((acc, ele) => {
          acc += ele.quantity;
          return acc;
        }, 0);
        return ele;
      });
      console.log(result);
      console.log("after", result);
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
    console.log("handleuP");
    const newUrl = `${location.pathname}?${params.toString()}`;
    navigate(newUrl);
  };

  const handlePageChange = (newPageInfo) => {
    console.log(newPageInfo, "pagesize");
    console.log(pageSize === newPageInfo.pageSize);

    if (pageSize === newPageInfo.pageSize) {
      setPage(newPageInfo.page);
    }
    if (pageSize !== newPageInfo.pageSize) {
      setPageSize(newPageInfo.pageSize);
      const params = new URLSearchParams(location.search);
      params.set("page", 0);
      params.set("take", newPageInfo.pageSize);
      params.set("skip", 0);
      console.log("handleuP");
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
    { field: "title", headerName: "Title", width: 270 },
    { field: "quantity", headerName: "Quantity", width: 90 },
    {
      field: "author",
      headerName: "Author",
      width: 250,

      valueGetter: (value, row) => {
        return row?.articleByAuthor[0]?.author?.nameAr;
      },
    },
    {
      field: "nameAr",
      headerName: "Publisher",
      width: 250,
      valueGetter: (value, row) => {
        return row?.articleByPublishingHouse[0]?.publishingHouse?.nameAr;
      },
    },
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
        <div style={{ width: "100%", color: "red" }}>
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
            onFilterModelChange={(e)=>{setText(e.quickFilterValues.join(' '))}}
            rows={rows}
            columns={columns}
            pagination
            pageSize={pageSize}
            paginationMode="server"
            rowCount={count}
            slots={{
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
