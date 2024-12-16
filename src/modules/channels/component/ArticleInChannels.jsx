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
import VisibilityIcon from "@mui/icons-material/Visibility";
import EditIcon from "@mui/icons-material/Edit";
import SaveIcon from "@mui/icons-material/Save";
import CustomNoResultsOverlay from "../../../style/NoResultStyle";
import ImagePopUp from "../../../components/ImagePopUp";
import axios from "axios";
import { ip } from "../../../constants/ip";
import CustomNoRowsOverlay from "../../../style/NoRowsStyle";

export default function ArticleInChannels({ channelInfo }) {
  const [rows, setRows] = useState([]);
  const [editRowId, setEditRowId] = useState(null);
  const [price, setPrice] = useState({});
  const [refresh, setRefresh] = useState(true);
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const [count, setCount] = useState(0);

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
        page={page+1}
        onChange={(event, newPage) => {
          setPage(newPage-1,page)
          onPageChange(event, newPage-1);
        }}
      />
    );
  }
  
  function CustomPagination(props) {
    return <GridPagination ActionsComponent={Pagination} {...props} />;
  }

  const fetchData = async () => {
    let params ={take:pageSize,skip:page*pageSize,notNullQuan:1 }
    const response = await axios.get(`${ip}/stocks/${channelInfo.idStock}`,{params});
    if (response.data.data) {
      const result = response.data.data.stockArticle.reduce(
        (acc, item) => {
          acc.data.push({
            id: item.articleId,
            name: item.article?.title,
            code: item.article?.code,
            image: item.article?.cover?.path,
            author: item.article?.articleByAuthor[0]?.author?.nameAr,
            publisher:
              item.article?.articleByPublishingHouse[0]?.publishingHouse.nameAr,
            quantity: item?.quantity,
            price: 0,
          });
          acc.ids.push(item.articleId);
          return acc;
        },
        {
          data: [],
          ids: [],
        }
      );

      const responsePriceByChannel = await axios.get(
        `${ip}/price-By-Channel/getAll`,
        {
          params: { salesChannelIds: [channelInfo.id], articleIds: result.ids },
        }
      );

      result.data.forEach((article) => {
        const priceData = responsePriceByChannel.data.find(
          (priceItem) => priceItem.idArticle === article.id
        );
        if (priceData) {
          article.price = priceData.price;
        }
      });
      console.log("result", result);
      setRows(result.data);
      setCount(response.data.count)
    }
  };

  const handleEditClick = (id) => {
    setEditRowId(id);
  };

  const handleSaveClick = async (id) => {
    const responseExistPrice = await axios.get(
      `http://localhost:3000/price-By-Channel/getAll`,
      { params: { salesChannelIds: [channelInfo.id], articleIds: [id] } }
    );
    if (responseExistPrice.data.length && price[id] && !isNaN(price[id])) {
      console.log(responseExistPrice.data);
      const updatePrice = await axios.patch(
        `http://localhost:3000/price-By-Channel/${responseExistPrice.data[0].id}`,
        {
          price: parseInt(price[id]),
        }
      );
    } else if (responseExistPrice.data.length === 0) {
      console.log(price[id], "price");

      const newPrice = await axios.post(
        `http://localhost:3000/price-By-Channel/create`,
        {
          price: parseInt(price[id]),
          idArticle: id,
          idSalesChannel: channelInfo.id,
        }
      );
      console.log(newPrice);
    }
    setRefresh(!refresh);
    setEditRowId(null);
  };
  const handlePriceChange = (id, value) => {
    setPrice((prev) => ({ ...prev, [id]: value }));
  };

  const handleDetails = (id) => {
    console.log("View details for ID:", id);
  };

  const handlePageChange = (newPageInfo) => {
    console.log(newPageInfo, "pagesize");
    console.log(pageSize===newPageInfo.pageSize)
    
    if (pageSize===newPageInfo.pageSize) {
      setPage(newPageInfo.page);
      setRefresh(!refresh)
    }
    if (pageSize!==newPageInfo.pageSize) {
      setPageSize(newPageInfo.pageSize)
      setPage(0)
      setRefresh(!refresh)
    }}

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
    <div style={{ width: "100%", color: "red" , height : 500}}>
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
        onPaginationModelChange={(event)=>{
          handlePageChange(event)
        }}
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
  );
}
