import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import { DataGrid, GridToolbar, GridActionsCellItem } from "@mui/x-data-grid";
import MuiPagination from "@mui/material/Pagination";
import Typography from "@mui/material/Typography";
import VisibilityIcon from "@mui/icons-material/Visibility";
import EditIcon from "@mui/icons-material/Edit";
import SaveIcon from "@mui/icons-material/Save";
import { useLocation, useNavigate } from "react-router-dom";
import CustomNoResultsOverlay from "../../../style/NoResultStyle";
import Item from "../../../style/ItemStyle";
import ImagePopUp from "../../../components/ImagePopUp";
import axios from "axios";
import { ip } from "../../../constants/ip";

export default function ArticleInChannels({ channelInfo }) {
  const [rows, setRows] = useState([]);
  const [editRowId, setEditRowId] = useState(null);
  const [price, setPrice] = useState({});
  const [refresh,setRefresh]=useState(true)

  useEffect(() => {
    fetchData();
  }, [refresh]);
  const mergeAndSortByDate = (exitNotes, receiptNotes) => {
    const combined = [
      ...exitNotes.map((item) => ({
        ...item,
        type: "exit",
        date: new Date(item.exitDate),
        id: `exit-${item.id}`,
      })),
      ...receiptNotes.map((item) => ({
        ...item,
        type: "receipt",
        date: new Date(item.receiptDate),
        id: `receipt-${item.id}`,
      })),
    ];

    return combined.sort((a, b) => a.date - b.date);
  };
  const fetchData = async () => {
    const responseReceipt = await axios.get(`${ip}/receiptNote/all_rn`, {
      params: { stocksIds: [channelInfo.idStock] },
    });
    console.log(responseReceipt.data);
    const responseExit = await axios.get(`${ip}/exitNote/all_en`, {
      params: { stocksIds: [channelInfo.idStock] },
    });
    console.log(responseExit.data, "exit");
    const sortedData = mergeAndSortByDate(
      responseExit.data,
      responseReceipt.data
    );
    const responsePriceByChannel = await axios.get(
      `http://localhost:3000/price-By-Channel/getAll`,
      { params: { salesChannelIds: [channelInfo.id] } }
    );
    console.log(responsePriceByChannel.data);

    const result = sortedData.reduce((acc, allData) => {
      if (allData.type === "receipt") {
        allData.receiptNoteLine.forEach((line) => {
          const existingArticle = acc.find(
            (item) => item.id === line.idArticle
          );

          if (existingArticle) {
            existingArticle.quantity += line.quantity;
          } else {
            acc.push({
              id: line.idArticle,
              name: line.Article.title,
              image: line.Article.cover.path,
              author: line.Article.articleByAuthor.length
                ? line.Article.articleByAuthor[0].author.nameAr
                : null,
              publisher: line.Article.articleByPublishingHouse.length
                ? line.Article.articleByPublishingHouse[0].publisher.nameAr
                : null,
              quantity: line.quantity,
              price: 0,
              history: [],
            });
          }
        });
      } else if (allData.type === "exit") {
        allData.exitNoteLine.forEach((line) => {
          const existingArticle = acc.find(
            (item) => item.id === line.articleId
          );

          if (existingArticle) {
            existingArticle.quantity -= line.quantity;
          } else {
            acc.push({
              id: line.articleId,
              name: line.Article.title,
              image: line.Article.cover.path,
              author: null,
              publisher: null,
              quantity: -line.quantity,
              price: 0,
              history: [],
            });
          }
        });
      }

      return acc;
    }, []);

    console.log(result, "before");
    result.forEach((article) => {
      const priceData = responsePriceByChannel.data.find(
        (priceItem) => priceItem.idArticle === article.id
      );
      if (priceData) {
        article.price = priceData.price;
      }
    });
    console.log(result, "after");
    setRows(result);
  };

  const handleEditClick = (id) => {
    setEditRowId(id);
  };

  const handleSaveClick = async (id) => {
    const responseExistPrice = await axios.get(
      `http://localhost:3000/price-By-Channel/getAll`,
      { params: { salesChannelIds: [channelInfo.id], articleIds: [id] } }
    );
    if (responseExistPrice.data.length&&price[id]&&!isNaN(price[id])) {
        console.log(responseExistPrice.data);
        const updatePrice = await axios.patch(
            `http://localhost:3000/price-By-Channel/${responseExistPrice.data[0].id}`,
            {
              price:parseInt(price[id]),
            }
          );
    } else if (responseExistPrice.data.length === 0) {
      console.log(price[id], "price");

      const newPrice = await axios.post(
        `http://localhost:3000/price-By-Channel/create`,
        {
          price:parseInt(price[id]),
          idArticle: id,
          idSalesChannel: channelInfo.id,
        }
      );
      console.log(newPrice);
      
    }
    setRefresh(!refresh)
    setEditRowId(null);
  };
  const handlePriceChange = (id, value) => {
    setPrice((prev) => ({ ...prev, [id]: value }));
  };

  const handleDetails = (id) => {
    console.log("View details for ID:", id);
  };

  const columns = [
    {
      field: "image",
      headerName: "Image",
      width: 90,
      renderCell: ({ value }) => {
        return <ImagePopUp image={value} />;
      },
    },
    { field: "name", headerName: "Title", width: 220 },
    { field: "quantity", headerName: "Quantity", width: 90 },
    {
      field: "price",
      headerName: "Price",
      width: 90,
      renderCell: ({ id }) => {
        return editRowId === id ? (
          <input
            type="number"
            value={price[id] || ""}
            onChange={(e) => handlePriceChange(id, e.target.value)}
            style={{ width: "100%", height: "100%" }}
          />
        ) : (
          <div>{rows.find((row) => row.id === id)?.price}</div>
        );
      },
    },
    {
      field: "author",
      headerName: "Author",
      width: 220,
    },
    {
      field: "publisher",
      headerName: "Publisher",
      width: 220,
    },
    {
      field: "details",
      headerName: "Details",
      width: 110,
      type: "actions",
      getActions: ({ id }) => [
        editRowId === id ? (
          <GridActionsCellItem
            icon={<SaveIcon />}
            onClick={() => handleSaveClick(id)}
            label="Save"
          />
        ) : (
          <GridActionsCellItem
            icon={<EditIcon />}
            onClick={() => handleEditClick(id)}
            label="Edit"
          />
        ),
        <GridActionsCellItem
          icon={<VisibilityIcon />}
          onClick={() => handleDetails(id)}
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
        rows={rows}
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
