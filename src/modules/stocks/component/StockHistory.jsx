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
import DescriptionIcon from "@mui/icons-material/Description";
import MuiPagination from "@mui/material/Pagination";
import CustomNoResultsOverlay from "../../../style/NoResultStyle";
import DoneIcon from "@mui/icons-material/Done";
import ClearIcon from "@mui/icons-material/Clear";
import InvoiceModal from "../../../components/InvoiceModal";
import MouseOverPopover from "./cosOrForPopUp";
import { ip } from "../../../constants/ip";
import axios from "axios";
import { useParams } from "react-router-dom";

export default function StockHistory() {
  const [rows, setRows] = useState([]);
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const [count, setCount] = useState(0);
  const [modalId, setModalId] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const [refresh, setRefresh] = useState(false);

  const param = useParams();

  useEffect(() => {
    fetchHistoryData();
  }, [refresh]);

  const fetchHistoryData = async () => {
    let params = {
      take: pageSize,
      skip: page * pageSize,
      stocksIds: [param.id],
    };
    const responseHistory = await axios.get(`${ip}/movements/getAll`, {
      params,
    });
    console.log(responseHistory.data);

    setRows(responseHistory.data.data);
    setCount(responseHistory.data.count);
  };
  console.log("rows", rows);

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

  const openModal = (event) => {
    event.preventDefault();
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
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
      field: "date",
      headerName: "Date",
      width: 200,
      valueGetter: (value) =>
        value.toString().slice(0, value.toString().indexOf("GMT") - 1),
    },
    {
      field: "customerName",
      headerName: "Customer",
      width: 270,
      renderCell: (params) => (<MouseOverPopover name={params.row.client?.fullName || "N/A" } />),
    },
    {
      field: "fournisseurName",
      headerName: "Fournisseur",
      width: 250,
      renderCell: (params) => (
        <MouseOverPopover name={params.row.provider?.nameProvider || "N/A"} />
      ),
    },
    {
      field: "br",
      headerName: "BR",
      width: 50,
      renderCell: (params) =>
        params.row.type === "receipt" ? (
          <DoneIcon color="success" />
        ) : (
          <ClearIcon color="error" />
        ),
    },
    {
      field: "bs",
      headerName: "BS",
      width: 50,
      renderCell: (params) =>
        params.row.type === "exit" ? (
          <DoneIcon color="success" />
        ) : (
          <ClearIcon color="error" />
        ),
    },
    {
      field: "bt",
      headerName: "BT",
      width: 50,
      renderCell: (params) =>
        params.row.transferNote.length ? (
          <DoneIcon color="success" />
        ) : (
          <ClearIcon color="error" />
        ),
    },
    {
      field: "details",
      headerName: "Details",
      width: 110,
      type: "actions",
      renderCell: ({ id }) => {
        return (
          <GridActionsCellItem
            icon={<DescriptionIcon />}
            onClick={(e) => {
              openModal(e);
              setModalId(id);
            }}
            label=""
          />
        );
      },
    },
  ];

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100%" }}>
      <div style={{ flexGrow: 1 }}>
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
          rows={rows}
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
        {isOpen && (
          <InvoiceModal
            showModal={isOpen}
            closeModal={closeModal}
            modalId={modalId.slice(modalId.indexOf("-") + 1)}
            currency={"DT"}
            subTotal={0}
            // taxAmount={0}
            discountAmount={0}
            total={0}
            mode="viewer"
            type={modalId.slice(0, modalId.indexOf("-"))}
          />
        )}
      </div>
    </div>
  );
}
