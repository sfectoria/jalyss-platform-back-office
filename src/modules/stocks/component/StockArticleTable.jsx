import React, { useEffect, useState } from "react";
import { DataGrid, GridToolbar, GridActionsCellItem } from "@mui/x-data-grid";
import ImagePopUp from "../../../components/ImagePopUp";
import { ip } from "../../../constants/ip";
import axios from "axios";
import { useParams } from "react-router-dom";
import CustomNoResultsOverlay from "../../../style/NoResultStyle";
import RequestQuoteIcon from "@mui/icons-material/RequestQuote";

export default function StockArticles() {
  const [data, setData] = useState([]);
  const params = useParams();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const response = await axios.get(`${ip}/stocks/${params.id}`);
    console.log(response.data.data.stockArticle);

    setData(response.data.data.stockArticle);
  };

  const columns = [
    {
      field: "image",
      headerName: "Image",
      width: 90,
      renderCell: ({ value, row }) => {
        return <ImagePopUp image={row.article.cover.path} />;
      },
    },
    {
      field: "name",
      headerName: "Title",
      width: 220,
      valueGetter: (value, row) => {
        return row?.article.title;
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
        slots={{
          noResultsOverlay: CustomNoResultsOverlay,
          toolbar: GridToolbar,
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
