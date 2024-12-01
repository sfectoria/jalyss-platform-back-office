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
import CheckIcon from "@mui/icons-material/Check";
import { MenuItem, Select, IconButton } from "@mui/material";
import InvoiceModal from "../../../components/InvoiceModal";
import MouseOverPopover from "../../channels/component/cosOrForPopUp";
import MouseOverPopoverFou from "./cosOrForPopUp";
import { ip } from "../../../constants/ip";
import axios from "axios";
import { useParams } from "react-router-dom";
import CustomNoRowsOverlay from "../../../style/NoRowsStyle";
import PartPayedDialog from "./PartPayedDialog";

export default function StockHistory() {
  const [rows, setRows] = useState([]);
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const [count, setCount] = useState(0);
  const [modalId, setModalId] = useState(0);
  const [rowInfo, setRowInfo] = useState({});
  const [editingRowId, setEditingRowId] = useState(null);
  const [editedStatus, setEditedStatus] = useState("");
  const [openPartPay, setOpenPartPay] = useState(false);
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

  const handleSaveStatus = async (rowId) => {
    const row = rows.find((row) => row.id === rowId);
    const updatedRow = { ...row, paymentStatus: editedStatus };
    let obj = {
      paymentStatus: editedStatus,
      modified: true,
    };

    try {
      console.log(editedStatus, "hello");
      if (editedStatus !== "PartiallyPayed") {
        if (editedStatus === "NotPayed") {
          obj["payedAmount"] = 0;
          obj["restedAmount"] = row?.totalAmount;
        } else if (editedStatus === "Payed") {
          obj["restedAmount"] = 0;
          obj["payedAmount"] = row?.totalAmount;
        }
        let reelId = rowId.slice(rowId.indexOf('-')+1)
        if (rowId.includes("receipt")) {
          await axios.patch(`${ip}/receiptNote/${reelId}`, obj);
          let purchase = rows.find((el) => el.id === rowId);
          if (purchase.type.includes("BL")) {
            let salesId = purchase.purchaseDeliveryNote[0].id;
            await axios.patch(`${ip}/purchase-delivery-note/${salesId}`, obj);
          } else if (purchase.type.includes("BLF")) {
            let salesId = purchase.purchaseDeliveryInvoice[0].id;
            await axios.patch(
              `${ip}/purchase-delivery-invoices/${salesId}`,
              obj
            );
          } else if (purchase.type.includes("F")) {
            let salesId = purchase.purchaseInvoice[0].id;
            await axios.patch(`${ip}/purchase-invoices/${salesId}`, obj);
          }
        }
        else if (rowId.includes("exit")){
          await axios.patch(`${ip}/exitNote/${reelId}`, obj);
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
      field: "date",
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
        const date = new Date(row?.date);
        return date.toLocaleTimeString("fr-TN", {
          hour: "2-digit",
          minute: "2-digit",
        });
      },
    },
    {
      field: "clientName",
      headerName: "Client",
      width: 230,
      renderCell: (params) =>
        params.row.client ? <MouseOverPopover name={params.row.client} /> : "X",
    },
    {
      field: "fournisseurName",
      headerName: "Fournisseur",
      width: 230,
      renderCell: (params) =>
        params.row?.provider ? (
          <MouseOverPopoverFou name={params.row?.provider} />
        ) : (
          "X"
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
              console.log(params.row);
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
      <div style={{ flexGrow: 1, height: 500 }}>
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
