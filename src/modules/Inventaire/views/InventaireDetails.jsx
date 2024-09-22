import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import {
  DataGrid,
  GridToolbar,
  GridActionsCellItem,
  GridRowEditStopReasons,
  gridPageCountSelector,
  GridPagination,
  useGridApiContext,
  useGridSelector,
} from "@mui/x-data-grid";
import MuiPagination from "@mui/material/Pagination";
import Typography from "@mui/material/Typography";
import { useParams } from "react-router-dom";
import CustomNoResultsOverlay from "../../../style/NoResultStyle";
import Item from "../../../style/ItemStyle";
import ImagePopUp from "../../../components/ImagePopUp";
import axios from "axios";
import { ip } from "../../../constants/ip";


export default function InventaireDetails() {
  const [data, setData] = useState([]);
  const [info, setInfo] = useState({});
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const [count, setCount] = useState(0);
  const [refresh, setRefresh] = useState(false);

  const param = useParams();
  useEffect(() => {
    fetchInv();
  }, [refresh]);

  const fetchInv = async () => {
    const response = await axios.get(`${ip}/inventory/${param.id}`,{params:{take:pageSize,skip:page*pageSize}});
    console.log(response.data.data.inventoryLine);
    setInfo(response.data.data);
    setCount(response.data.count)
    setData(response.data.data.inventoryLine);
  };
  function Pagination({ onPageChange, className }) {
    const apiRef = useGridApiContext();
    const pageCount = useGridSelector(apiRef, gridPageCountSelector);
   console.log(page);
  //  console.log(text);
   
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
      renderCell: (params) => {
        return <ImagePopUp image={params?.row?.article?.cover?.path} />;
      },
    },
    {
      field: "title",
      headerName: "Titel",
      width: 270,
      valueGetter: (value, row) => {
        return row?.article?.title;
      },
    },
    { field: "quantity", headerName: "Quantity", width: 90 },
    { field: "reelQuatity", headerName: "R-Quantity", width: 90 },
    {
      field: "author",
      headerName: "Author",
      width: 250,
      valueGetter: (value, row) => {
        return row?.article?.articleByAuthor[0]?.author?.nameAr;
      },
    },
    {
      field: "publisher",
      headerName: "Publisher",
      width: 250,
      valueGetter: (value, row) => {
        return row?.article?.articleByPublishingHouse[0]?.publishingHouse
          ?.nameAr;
      },
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
          Inventaire {info.name}
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
      </Item>
    </Box>
  );
}
