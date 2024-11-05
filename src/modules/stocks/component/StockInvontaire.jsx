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
import VisibilityIcon from "@mui/icons-material/Visibility";
import CustomNoResultsOverlay from "../../../style/NoResultStyle";
import { useNavigate, useParams } from "react-router-dom";
import DraftsIcon from "@mui/icons-material/Drafts";
import axios from "axios";
import { ip } from "../../../constants/ip";

export default function StockInvontaire() {
  const [isOpen, setIsOpen] = useState(false);
  const [data, setData] = useState([]);
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const [count, setCount] = useState(0);
  const [refresh, setRefresh] = useState(false);

  const param = useParams();
  useEffect(() => {
    fetchData();
  }, [refresh]);

  const fetchData = async () => {
    const response = await axios.get(`${ip}/inventory/all`, {
      params: { take: pageSize, skip: page * pageSize, stocksIds: [param.id] },
    });
    console.log(response.data);
    setData(response.data.data);
    setCount(response.data.count);
  };
  const navigate = useNavigate();

  const handelNavigationSee = (ids) => {
    navigate(`/inventaire/${ids}`);
  };

  const handelNavigationModify = (ids) => {
    navigate(`/stock/${param.id}/inv/${ids}`);
  };

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
    { field: "name", headerName: "Invontaire Title", width: 200 },
    {
      field: "date",
      headerName: "Date",
      width: 110,
      valueGetter: (value) => {
        const date = new Date(value);
        return date.toLocaleDateString('fr-TN');
      },
    },
    {
      field: "time",
      headerName: "Time",
      width: 100,
      valueGetter: (value, row) => {
        const date = new Date(row?.date);
        return date.toLocaleTimeString('fr-TN', { hour: '2-digit', minute: '2-digit'}); 
      },
    },
    {
      field: "creatorName",
      headerName: "Creator",
      width: 180,
      valueGetter: (value, row) => {
        return (
          (row?.createur?.Employee.firstName
            ? row?.createur?.Employee.firstName
            : "") +
          " " +
          (row?.createur?.Employee.lastName
            ? row?.createur?.Employee.lastName
            : "")
        );
      },
    },
    {
      field: "creatorPhone",
      headerName: "Creator number",
      width: 170,
      valueGetter: (value, row) => {
        return row?.createur?.Employee.phoneNumber;
      },
    },
    { field: "status", headerName: "Status", width: 100 },
    {
      field: "percentage",
      headerName: "Percentage",
      width: 100,
      valueGetter: (value, row) => {
        const totalQuantity = row.inventoryLine.reduce(
          (total, line) => total + line.quantity,
          0
        );
        const totalReelQuantity = row.inventoryLine.reduce(
          (total, line) => total + line.reelQuantity,
          0
        );
        if (totalQuantity === 0) return "0%";
        const percentage = Math.floor(
          (totalQuantity / totalReelQuantity) * 100
        );
        return `${percentage}%`;
      },
    },
    {
      field: "details",
      headerName: "Details",
      width: 110,
      type: "actions",
      renderCell: (params) => {
        if (params.row.status === "confirmed") {
          return (
            <GridActionsCellItem
              icon={<VisibilityIcon sx={{ color: "#448aff" }} />}
              onClick={() => {
                handelNavigationSee(params.id);
              }}
              label=""
            />
          );
        } else if (params.row.status === "draft") {
          return (
            <GridActionsCellItem
              icon={<DraftsIcon sx={{ color: "red" }} />}
              onClick={() => {
                handelNavigationModify(params.id);
              }}
              label=""
            />
          );
        }
      },
    },
  ];

  return (
    <div style={{ width: "100%" }}>
      <DataGrid
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
