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
import DoneIcon from "@mui/icons-material/Done";
import ClearIcon from "@mui/icons-material/Clear";
import InvoiceModal from "../../../components/InvoiceModal";
import MouseOverPopover from "./cosOrForPopUp";
import axios from "axios";
import { ip } from "../../../constants/ip";
import { useParams } from "react-router-dom";

export default function Vente() {
  const [isOpen, setIsOpen] = useState(false);
  const [rows, setRows] = useState([]);
  const [modalId, setModalId] = useState(0);
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const [count, setCount] = useState(0);
  const [refresh, setRefresh] = useState(false);

  const param = useParams();

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

  useEffect(() => {
    fetchData();
  }, [refresh]);

  const fetchData = async () => {
    let params = {
      salesChannelsIds: [param.id],
      take: pageSize,
      skip: page * pageSize,
    };
    const response = await axios.get(`${ip}/exitNote/all_en`, {
      params,
    });
    if (response.data.data.length) {
      const result = response.data.data.map((e) => {
        e.type=[]
        if (e.salesDeliveryInvoice.length) {
          e.type.push("BLF")
        }
        if (e.salesDeliveryNote.length) {
          e.type.push("BL")
        }
        if (e.salesInvoice.length) {
          e.type.push("F")
        }
        if (e.salesReceipt.length){
         e.type.push("Ticket")
        }
        return e;
      });

      setRows(result);
      setCount(response.data.count);
    }
  };

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
      field: "exitDate",
      headerName: "Date",
      width: 150,
      valueGetter: (value) => {
        const date = new Date(value);
        if (date.toISOString().slice(0, 10) === new Date().toISOString().slice(0, 10))
          return "Today";
        else  
        return date.toLocaleDateString('fr-TN');
      },
    },
    {
      field: "time",
      headerName: "Time",
      width: 100,
      valueGetter: (value, row) => {
        const date = new Date(row?.exitDate);
        return date.toLocaleTimeString('fr-TN', { hour: '2-digit', minute: '2-digit'}); 
      },
    },
    {
      field: "customerName",
      headerName: "Client Name",
      width: 270,
      renderCell: (params) => {
        let client = {};
        if (params.row.type.includes("BL")) {
          client = params.row.salesDeliveryNote[0].client;
        } else if (params.row.type.includes("BLF")) {
          client = params.row.salesDeliveryInvoice[0].client;
        } else if (params.row.type.includes("F")) {
          client = params.row.salesInvoice[0].client;
        }
        else if (params.row.type.includes("Ticket")) {
          client = params.row.salesReceipt[0].client;
        }
        return <MouseOverPopover name={client} />;
      },
    },
    {
      field: "bl",
      headerName: "BL",
      width: 50,
      renderCell: (params) =>
        params.row.type.includes("BL") ? (
          <DoneIcon color="success" />
        ) : (
          <ClearIcon color="error" />
        ),
    },
    {
      field: "bl/f",
      headerName: "BL/F",
      width: 50,
      renderCell: (params) =>
        params.row.type.includes("BLF") ? (
          <DoneIcon color="success" />
        ) : (
          <ClearIcon color="error" />
        ),
    },
    {
      field: "f",
      headerName: "F",
      width: 50,
      renderCell: (params) =>
        params.row.type.includes("F") ? (
          <DoneIcon color="success" />
        ) : (
          <ClearIcon color="error" />
        ),
    },
    {
      field: "ticket",
      headerName: "Ticket",
      width: 50,
      renderCell: (params) =>
        params.row.type.includes('Ticket') ? (
          <DoneIcon color="success" />
        ) : (
          <ClearIcon color="error" />
        ),
    },
    {
      field: "payed",
      headerName: "Payed/Not",
      width: 90,
      renderCell: (params) => {
      let status =params?.row?.paymentStatus
      console.log(status);
      
        if(status==='Payed') return <div style={{ color: "green" }}>{params.row.paymentStatus}</div>
        else if (status ==='NotPayed') return <div style={{ color: "red" }}>{'Not Payed'}</div>
        else if (status ==='PartiallyPayed') return <div style={{ color: "orange" }}>{'Part Payed'}</div>
      }
    },
    { field: "totalAmount", headerName: "Total Amount", width: 100 },
    {
      field: "details",
      headerName: "Details",
      width: 110,
      type: "actions",
      renderCell: ({ id }) => {
        return (
          <GridActionsCellItem
            icon={<VisibilityIcon />}
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
          modalId={modalId}
          idChannel={param.id}
          currency={"DT"}
          subTotal={0}
          // taxAmount={0}
          discountAmount={0}
          total={0}
          mode="viewer"
          type="exit"
        />
      )}
    </div>
  );
}
