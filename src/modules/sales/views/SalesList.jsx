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
import CheckIcon from "@mui/icons-material/Check";
import { MenuItem, Select, IconButton } from "@mui/material";
import InvoiceModal from "../../../components/InvoiceModal";
import axios from "axios";
import { ip } from "../../../constants/ip.js";
import { useParams } from "react-router-dom";
import Item from "../../../style/ItemStyle";
import { Box, Typography } from "@mui/material";
import AddButton from "../../../components/AddOp";
import CustomNoRowsOverlay from "../../../style/NoRowsStyle";
import PartPayedDialog from "../components/PartPayedDialog.jsx";

function SalesList() {
  const [isOpen, setIsOpen] = useState(false);
  const [rows, setRows] = useState([]);
  const [modalId, setModalId] = useState(0);
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const [count, setCount] = useState(0);
  const [rowInfo, setRowInfo] = useState({});
  const [editingRowId, setEditingRowId] = useState(null); 
  const [editedStatus, setEditedStatus] = useState(""); 
  const [refresh, setRefresh] = useState(false);
  const [text, setText] = useState('');
  const [openPartPay, setOpenPartPay] = useState(false);
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
  const channelInfo = {id:0}
  const fetchData = async () => {
    let params = {
      take: pageSize,
      skip: page * pageSize,
    };
    const response = await axios.get(`${ip}/receiptNote/all_rn`, {});
    if (response.data.data.length) {
      const result = response.data.data.map((e) => {
        e.type=[]
        if (e.purchaseDeliveryInvoice.length) {
          e.type.push("BLF")
        }
        if (e.purchaseDeliveryNote.length) {
          e.type.push("BL")
        }
        if (e.purchaseInvoice.length) {
          e.type.push("F")
        }
        return e;
      });
      setRows(result);
      console.log(result);
      setCount(response.data.count);
    }
  };

  const handleSaveStatus = async (rowId) => {
    const row = rows.find((row) => row.id === rowId);
    const updatedRow = { ...row, paymentStatus: editedStatus };
    let obj ={
      paymentStatus: editedStatus,
      modified:true
    }

    try {
      if (editedStatus!=="PartiallyPayed") {
        if(editedStatus==="NotPayed"){
          obj["payedAmount"]=0
          obj["restedAmount"]=row?.totalAmount
        }
        else if(editedStatus==="Payed"){
          obj["restedAmount"]=0
          obj["payedAmount"]=row?.totalAmount
        }
      await axios.patch(`${ip}/receiptNote/${rowId}`,obj);
      let purchase = rows.find((el)=>el.id===rowId)
      if(purchase.type.includes('BL')){
        let salesId=purchase.purchaseDeliveryNote[0].id
      await axios.patch(`${ip}/purchase-delivery-note/${salesId}`,obj);
     }
      else if(purchase.type.includes('BLF')){
        let salesId=purchase.purchaseDeliveryInvoice[0].id
      await axios.patch(`${ip}/purchase-delivery-invoices/${salesId}`,obj);
     }
      else if(purchase.type.includes('F')){
        let salesId=purchase.purchaseInvoice[0].id
      await axios.patch(`${ip}/purchase-invoices/${salesId}`,obj);
     }
      setRows((prevRows) =>
        prevRows.map((row) => (row.id === rowId ? updatedRow : row))
      );
      setRefresh(!refresh);
      setEditingRowId(null); 
    }
    } catch (error) {
      console.error("Error updating status:", error);
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
      field: "receiptDate",
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
        const date = new Date(row?.receiptDate);
        return date.toLocaleTimeString('fr-TN', { hour: '2-digit', minute: '2-digit'}); 
      },
    },
    {
      field: "customerName",
      headerName: "Provider Name",
      width: 270,
      // renderCell: (params) => {
      //   let client = {};
      //   if (params.row.type.includes("BL")) {
      //     client = params.row.salesDeliveryNote[0].client;
      //   } else if (params.row.type.includes("BLF")) {
      //     client = params.row.salesDeliveryInvoice[0].client;
      //   } else if (params.row.type.includes("F")) {
      //     client = params.row.salesInvoice[0].client;
      //   }
      //   else if (params.row.type.includes("Ticket")) {
      //     client = params.row.salesReceipt[0].client;
      //   }
      //   return <MouseOverPopover name={client} />;
      // },
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
      width: 200,
      renderCell: (params) => {
        const { id, paymentStatus: status, modified } = params.row;
    
        if (id === editingRowId) {
          return (
            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <Select
                value={editedStatus}
                onChange={(e) => setEditedStatus(e.target.value)}
                size="small"
              >
                <MenuItem value="Payed">Payed</MenuItem>
                <MenuItem value="NotPayed">Not Payed</MenuItem>
                <MenuItem value="PartiallyPayed">Partially Payed</MenuItem>
              </Select>
              <IconButton
                onClick={() => {
                  handleSaveStatus(id);
                  setEditingRowId(null);
                }}
                color="primary"
                aria-label="Save status"
              >
                <CheckIcon />
              </IconButton>
            </div>
          );
        }
    
        const color =
          status === "Payed"
            ? "green"
            : status === "NotPayed"
            ? "red"
            : "orange";
    
        return (
          <div
            style={{ display: "flex", gap: 3, cursor: "pointer" }}
            onClick={() => {
              setEditingRowId(id);
              setEditedStatus(status);
              setRowInfo(params.row); 
            }}
            title={modified ? "Status has been modified" : "Click to edit"}
          >
            <div style={{ color }}>
              {status === "Payed"
                ? "Payed"
                : status === "NotPayed"
                ? "Not Payed"
                : "Partially Payed"}
            </div>
            {modified && <div style={{ color: "gray" }}>(modified)</div>}
          </div>
        );
      },
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
    <Box
    sx={{
      bgcolor: "background.default",
      mx: 3,
      mt: 3,
      height: '100vh',
    }}
  >
    <Item sx={{ pt: 7, pb: 1, px: 7, borderRadius: 10 }} elevation={5}>
    <Typography
          variant="h5"
          mb={3}
          gutterBottom
          sx={{ fontWeight: "bold" }}
        >
          Achat List
        </Typography>
       {editedStatus==="PartiallyPayed" && <PartPayedDialog setPartAmount={"hhh"} setOpenPartPayed={setOpenPartPay} setRefresh={setRefresh} refresh={refresh} openPartPayed={true} rowInfo={rowInfo} setEditingRowId={setEditingRowId} />}
        <div style={{ width: "100%", color: "red", height : 500 }}>
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
          type="receipt"
        />
      )}
        </div>
    </Item>
    <AddButton type={"achat"} info={channelInfo} />
  </Box>
  )
}

export default SalesList