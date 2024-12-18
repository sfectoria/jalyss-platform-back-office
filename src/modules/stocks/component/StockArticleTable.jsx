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
import { useNavigate, useParams } from "react-router-dom";
import CustomNoResultsOverlay from "../../../style/NoResultStyle";
import RequestQuoteIcon from "@mui/icons-material/RequestQuote";
import CustomNoRowsOverlay from "../../../style/NoRowsStyle";

export default function StockArticles() {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const [count, setCount] = useState(0);
  const [refresh, setRefresh] = useState(false);
  const param = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    fetchData();
  }, [refresh, page, pageSize]);

  const fetchData = async () => {
    let params = { take: pageSize, skip: page * pageSize, notNullQuan: 1 };
    try {
      const response = await axios.get(`${ip}/stocks/${param.id}`, { params });
      const filteredData = response.data.data.stockArticle.filter(
        (e) => e.article.archived === false
      );

      setData(filteredData);
      setCount(response.data.count);
    } catch (error) {
      console.error("Error fetching data", error);
    }
  };

  const handlePageChange = (newPageInfo) => {
    setPage(newPageInfo.page);
    setPageSize(newPageInfo.pageSize);
    setRefresh(!refresh);
  };

  const columns = [
    {
      field: "image",
      headerName: "Image",
      width: 90,
      renderCell: ({ value, row }) => <ImagePopUp image={row?.article?.cover?.path} />,
    },
    {
      field: "name",
      headerName: "Title",
      width: 220,
      valueGetter: (value, row) => row?.article?.title,
    },
    {
      field: "quantity",
      headerName: "Quantity",
      width: 90,
    },
    {
      field: "author",
      headerName: "Author",
      width: 220,
      valueGetter: (value, row) => row?.article.articleByAuthor[0]?.author?.nameAr,
    },
    {
      field: "publisher",
      headerName: "Publisher",
      width: 220,
      valueGetter: (value, row) =>
        row?.article.articleByPublishingHouse[0]?.publishingHouse?.nameAr,
    },
    {
      field: "history",
      headerName: "History",
      width: 110,
      type: "actions",
      getActions: (params) => [
        <GridActionsCellItem
          icon={<RequestQuoteIcon />}
          onClick={() => navigate(`articles/${params.row.articleId}/full-history`)}
          label="View"
        />,
      ],
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
    <div style={{ width: "100%", height: 500 }}>
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
        onPaginationModelChange={handlePageChange}
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
