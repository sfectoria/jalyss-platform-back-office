import React, { useEffect, useState } from "react";
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
import ImagePopUp from "../../../components/ImagePopUp";
import { ip } from "../../../constants/ip";
import axios from "axios";
import { useParams } from "react-router-dom";
import CustomNoResultsOverlay from "../../../style/NoResultStyle";
import RequestQuoteIcon from "@mui/icons-material/RequestQuote";

export default function StockArticles() {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const [count, setCount] = useState(0);
  const [refresh, setRefresh] = useState(false);
  const param = useParams();

  useEffect(() => {
    fetchData();
  }, [refresh]);
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

  const fetchData = async () => {
    let params = { take: pageSize, skip: page * pageSize };
    const response = await axios.get(`${ip}/stocks/${param.id}`, { params });
    console.log(response.data.data.stockArticle, response.data.count);
    setData(response.data.data.stockArticle);
    setCount(response.data.count);
  };

  const handlePageChange = (newPageInfo) => {
    console.log(newPageInfo, "pagesize");
    console.log(pageSize === newPageInfo.pageSize);

    if (pageSize === newPageInfo.pageSize) {
      setPage(newPageInfo.page);
      setRefresh(!refresh);
    }
    if (pageSize !== newPageInfo.pageSize) {
      setPageSize(newPageInfo.pageSize);
      setPage(0);
      setRefresh(!refresh);
    }
  };

  const columns = [
    {
      field: "image",
      headerName: "Image",
      width: 90,
      renderCell: ({ value, row }) => {
        return <ImagePopUp image={row?.article?.cover?.path} />;
      },
    },
    {
      field: "name",
      headerName: "Title",
      width: 220,
      valueGetter: (value, row) => {
        return row?.article?.title;
      },
    },
    { field: "quantity", headerName: "Quantity", width: 90 },
    {
      field: "author",
      headerName: "Author",
      width: 220,
      valueGetter: (value, row) => {
        return row?.article.articleByAuthor[0]?.author?.nameAr;
      },
    },
    {
      field: "publisher",
      headerName: "Publisher",
      width: 220,
      valueGetter: (value, row) => {
        return row?.article.articleByPublishingHouse[0]?.publishingHouse
          ?.nameAr;
      },
    },
    {
      field: "history",
      headerName: "History",
      width: 110,
      type: "actions",
      getActions: ({ id }) => [
        <GridActionsCellItem
          icon={<RequestQuoteIcon />}
          onClick={() => console.log("history")}
          label="View"
        />,
      ],
    },
  ];
  return (
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
        rows={data}
        columns={columns}
        onPaginationModelChange={(event) => {
          handlePageChange(event);
        }}
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
  );
}
