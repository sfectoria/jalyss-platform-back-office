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
import MouseOverPopover from "./../../channels/component/cosOrForPopUp";
import axios from "axios";
import { ip } from "../../../constants/ip";
import { useParams } from "react-router-dom";
import Item from "../../../style/ItemStyle";
import { Box, Typography } from "@mui/material";
import AddButton from "../../../components/AddOp";
import CustomNoRowsOverlay from "../../../style/NoRowsStyle";
import PartPayedDialog from "../../../components/PartPayedDialog";

function VentList() {
  const [isOpen, setIsOpen] = useState(false);
  const [rows, setRows] = useState([]);
  const [modalId, setModalId] = useState(0);
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const [count, setCount] = useState(0);
  const [refresh, setRefresh] = useState(false);
  const [editingRowId, setEditingRowId] = useState(null);
  const [editedStatus, setEditedStatus] = useState("");
  const [text, setText] = useState("");
  const [openPartPay, setOpenPartPay] = useState(false);
  const [rowInfo, setRowInfo] = useState({});

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
  const channelInfo = { id: 0 };
  const fetchData = async () => {
    let params = {
      take: pageSize,
      skip: page * pageSize,
    };
    const responseChannels = await axios.get(`${ip}/selling/getAll`);
    let ids = responseChannels?.data?.map((e) => e.id);
    params["salesChannelsIds"] = ids;
    const response = await axios.get(`${ip}/exitNote/all_en`, {
      params,
    });
    console.log("there123",response.data);
    
    if (response.data.data.length) {
      const result = response.data.data.map((e) => {
        e.type = [];
        if (e.salesDeliveryInvoice.length) {
          e.type.push("BLF");
        }
        if (e.salesDeliveryNote.length) {
          e.type.push("BL");
        }
        if (e.salesInvoice.length) {
          e.type.push("F");
        }
        if (e.salesReceipt.length) {
          e.type.push("Ticket");
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

  const handleSaveStatus = async (rowId) => {
    const row = rows.find((row) => row.id === rowId);
    const updatedRow = { ...row, paymentStatus: editedStatus };
    let obj = {
      paymentStatus: editedStatus,
      modified: true,
    };
    try {
      if (editedStatus !== "PartiallyPayed") {
        if (editedStatus === "NotPayed") {
          obj["payedAmount"] = 0;
          obj["restedAmount"] = row?.totalAmount;
        } else if (editedStatus === "Payed") {
          obj["restedAmount"] = 0;
          obj["payedAmount"] = row?.totalAmount;
        }
        await axios.patch(`${ip}/exitNote/${rowId}`, obj);
        let sale = rows.find((el) => el.id === rowId);
        if (sale.type.includes("BL")) {
          let salesId = sale.salesDeliveryNote[0].id;
          await axios.patch(`${ip}/salesDeliveryNote/${salesId}`, obj);
        } else if (sale.type.includes("BLF")) {
          let salesId = sale.salesDeliveryInvoice[0].id;
          await axios.patch(`${ip}/salesDeliveryInvoice/${salesId}`, obj);
        } else if (sale.type.includes("F")) {
          let salesId = sale.salesInvoice[0].id;
          await axios.patch(`${ip}/sales-invoices/${salesId}`, obj);
        } else if (sale.type.includes("Ticket")) {
          let salesId = sale.salesReceipt[0].id;
          await axios.patch(`${ip}/sales-receipt/${salesId}`, obj);
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
        if (
          date.toISOString().slice(0, 10) ===
          new Date().toISOString().slice(0, 10)
        )
          return "Today";
        else return date.toLocaleDateString("fr-TN");
      },
    },
    {
      field: "time",
      headerName: "Time",
      width: 100,
      valueGetter: (value, row) => {
        const date = new Date(row?.exitDate);
        return date.toLocaleTimeString("fr-TN", {
          hour: "2-digit",
          minute: "2-digit",
        });
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
        } else if (params.row.type.includes("Ticket")) {
          client = params.row.salesReceipt[0].client;
        }
        return (
          <Box
          sx={{
            display: "flex",
            justifyContent: "start",
            alignItems: "center",
            height: "100%",
            width: "100%",
          }}
        >
        <MouseOverPopover name={client} />
        </Box>);
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
        params.row.type.includes("Ticket") ? (
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
              setEditingRowId(params.row.id);
              setEditedStatus(params.row.paymentStatus);
              setRowInfo(params.row);
            }}
          >
            <div style={{ color }}>
              {status === "Payed"
                ? "Payed"
                : status === "NotPayed"
                ? "Not Payed"
                : "Partially Payed"}
            </div>
            <div style={{ color: "gray" }}>{modified && "(modified)"}</div>
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
      }}
    >
      <Item sx={{ pt: 7, pb: 1, px: 7, borderRadius: 10 }} elevation={5}>
        <Typography
          variant="h5"
          mb={3}
          gutterBottom
          sx={{ fontWeight: "bold" }}
        >
          Vente List
        </Typography>
        {editedStatus === "PartiallyPayed" && (
          <PartPayedDialog
            setPartAmount={"hhh"}
            setOpenPartPayed={setOpenPartPay}
            setRefresh={setRefresh}
            refresh={refresh}
            openPartPayed={true}
            rowInfo={rowInfo}
            setEditingRowId={setEditingRowId}
          />
        )}
        <div style={{ width: "100%", color: "red", height: 500 }}>
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
            onFilterModelChange={(e) => {
              setText(e.quickFilterValues.join(" "));
            }}
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
              type="exit"
            />
          )}
        </div>
      </Item>
      <AddButton type={"vente"} info={channelInfo} />
    </Box>
  );
}

export default VentList;
