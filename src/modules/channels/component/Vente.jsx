import React, { useEffect, useState } from "react";
import { DataGrid, GridToolbar, GridActionsCellItem } from "@mui/x-data-grid";
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

  const param = useParams();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const response = await axios.get(`${ip}/exitNote/all_en`, {
      params: { salesChannelsIds: [param.id] },
    });
    console.log(response.data.data);
    const result = response.data.data.map((e) => {
      if (e.salesDeliveryInvoice.length) {
        e.type = "BLF";
      }
      if (e.salesDeliveryNote.length) {
        e.type = "BL";
      }
      if (e.salesInvoice.length) {
        e.type = "F";
      }
      return e;
    });

    setRows(result);
  };
  const items = [
    {
      id: (+new Date() + Math.floor(Math.random() * 999999)).toString(36),
      name: "hhhh",
      description: "a  book",
      price: "1.00",
      quantity: 7,
    },
    {
      id: (+new Date() + Math.floor(Math.random() * 999999)).toString(36),
      name: "halima",
      description: "a  book",
      price: "1.00",
      quantity: 1,
    },
    {
      id: (+new Date() + Math.floor(Math.random() * 999999)).toString(36),
      name: "nooo",
      description: "a  book",
      price: "4.00",
      quantity: 5,
    },
  ];

  const openModal = (event) => {
    event.preventDefault();
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  const columns = [
    {
      field: "exitDate",
      headerName: "Date",
      width: 200,
      valueGetter: (value) => {
        if (value.slice(0, 10) === new Date().toISOString().slice(0, 10))
          return "Today";
        else return new Date(value).toString().slice(0, 16);
      },
    },
    {
      field: "time",
      headerName: "Time",
      width: 100,
      valueGetter: (value, row) => {
        return row.exitDate.slice(
          row.exitDate.indexOf("T") + 1,
          row.exitDate.indexOf("T") + 6
        );
      },
    },
    {
      field: "customerName",
      headerName: "Client Name",
      width: 270,
      renderCell: (params) => {
        let client = {};
        if (params.row.type === "BL") {
          client = params.row.salesDeliveryNote[0].client;
        } else if (params.row.type === "BLF") {
          client = params.row.salesDeliveryInvoice[0].client;
        } else if (params.row.type === "F") {
          client = params.row.salesInvoice[0].client;
        }
        return <MouseOverPopover name={client} />;
      },
    },
    {
      field: "bl",
      headerName: "BL",
      width: 50,
      renderCell: (params) =>
        params.row.type === "BL" ? (
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
        params.row.type === "BLF" ? (
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
        params.row.type === "F" ? (
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
        params.row.ticket ? (
          <DoneIcon color="success" />
        ) : (
          <ClearIcon color="error" />
        ),
    },
    {
      field: "payed",
      headerName: "Payed/Not",
      width: 90,
      renderCell: (params) => <div style={{ color: "green" }}>Payed</div>,
    },
    { field: "totalAmount", headerName: "Total Amount", width: 100 },
    {
      field: "details",
      headerName: "Details",
      width: 110,
      type: "actions",
      renderCell : ({ id }) => {  
      return  <GridActionsCellItem
          icon={<VisibilityIcon />}
          onClick={openModal}
          label=""
        />
      }
    },
  ];

  // const rows = [
  //   {
  //     id: 1,
  //     date: "07/23/2024 6:56 PM",
  //     customerName: null,
  //     fournisseurName: "Salim sfexi",
  //     managerNumber: "+216 28527345",
  //     details: "fff",
  //     bl: true,
  //   },
  //   {
  //     id: 2,
  //     date: "07/23/2024 6:56 PM",
  //     customerName: "Hamida midawi",
  //     fournisseurName: null,
  //     ticket: true,
  //   },
  //   {
  //     id: 3,
  //     date: "07/23/2024 6:56 PM",
  //     customerName: null,
  //     fournisseurName: "Wael ben sahloul",
  //     f: true,
  //   },
  //   {
  //     id: 4,
  //     date: "07/23/2024 6:56 PM",
  //     customerName: null,
  //     fournisseurName: "Stock Gabes",
  //     br: true,
  //     blf: true,
  //   },
  //   {
  //     id: 5,
  //     date: "07/23/2024 6:56 PM",
  //     customerName: "Daenerys",
  //     fournisseurName: null,
  //     bl: true,
  //   },
  //   {
  //     id: 6,
  //     date: "07/23/2024 6:56 PM",
  //     customerName: "houssem ben ammar",
  //     fournisseurName: null,
  //     ticket: true,
  //   },
  //   {
  //     id: 7,
  //     date: "07/23/2024 6:56 PM",
  //     customerName: null,
  //     fournisseurName: "Ferrara",
  //     f: true,
  //   },
  //   {
  //     id: 8,
  //     date: "07/23/2024 6:56 PM",
  //     customerName: "Stock Nabeul",
  //     fournisseurName: null,
  //     bs: true,
  //     blf: true,
  //   },
  //   {
  //     id: 9,
  //     date: "07/23/2024 6:56 PM",
  //     customerName: "Harvey",
  //     fournisseurName: null,
  //     bl: true,
  //   },
  // ];

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
        slots={{
          noResultsOverlay: CustomNoResultsOverlay,
          toolbar: GridToolbar,
        }}
        initialState={{
          pagination: { paginationModel: { pageSize: 7 } },
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
      <InvoiceModal
        showModal={isOpen}
        closeModal={closeModal}
        info={{
          // currentDate,
          // dateOfIssue,
          invoiceNumber: 1,
          billTo: "hamadi",
          billToEmail: "hamadi@gmail.com",
          billToAddress: "win",
          // billFrom,
          // billFromEmail,
          // billFromAddress,
          // notes,
          // total,
          // subTotal,
          // taxAmount,
          // discountAmount
        }}
        items={items}
        currency={0}
        subTotal={0}
        taxAmount={0}
        discountAmount={0}
        total={0}
      />
    </div>
  );
}
