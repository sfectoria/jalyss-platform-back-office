import React, { useState } from "react";
import { DataGrid, GridToolbar, GridActionsCellItem } from "@mui/x-data-grid";
import VisibilityIcon from "@mui/icons-material/Visibility";
import CustomNoResultsOverlay from "../../../style/NoResultStyle";
import InvoiceModal from "../../../components/InvoiceModal";
import { useNavigate } from "react-router-dom";
import CustomNoRowsOverlay from "../../../style/NoRowsStyle";
export default function ChannelInventaire() {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
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

  const handelNavigation = () => {
    navigate("/inventaire");
  };

  const openModal = (event) => {
    event.preventDefault();
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  const columns = [
    { field: "title", headerName: "Invontaire Title", width: 200 },
    { field: "date", headerName: "Date", width: 170 },
    { field: "time", headerName: "Time", width: 100 },
    { field: "customerName", headerName: "Customer", width: 200 },
    { field: "valid", headerName: "T", width: 50 },
    { field: "falsy", headerName: "F", width: 50 },
    { field: "percentage", headerName: "Percentage", width: 100 },

    {
      field: "details",
      headerName: "Details",
      width: 110,
      type: "actions",
      getActions: ({ id }) => [
        <GridActionsCellItem
          icon={<VisibilityIcon />}
          onClick={handelNavigation}
          label=""
        />,
      ],
    },
  ];

  const rows = [
    {
      id: 1,
      title: "Inventory Check A",
      date: "2024-08-01",
      time: "10:00 AM",
      customerName: "Customer One",
      valid: 30,
      falsy: 10,
      percentage: (30 / (30 + 10)) * 100,
    },
    {
      id: 2,
      title: "Inventory Check B",
      date: "2024-08-02",
      time: "11:30 AM",
      customerName: "Customer Two",
      valid: 25,
      falsy: 15,
      percentage: (25 / (25 + 15)) * 100,
    },
    {
      id: 3,
      title: "Inventory Check C",
      date: "2024-08-03",
      time: "02:15 PM",
      customerName: "Customer Three",
      valid: 40,
      falsy: 10,
      percentage: (40 / (40 + 10)) * 100,
    },
    {
      id: 4,
      title: "Inventory Check D",
      date: "2024-08-04",
      time: "09:45 AM",
      customerName: "Customer Four",
      valid: 20,
      falsy: 30,
      percentage: (20 / (20 + 30)) * 100,
    },
    {
      id: 5,
      title: "Inventory Check E",
      date: "2024-08-05",
      time: "03:30 PM",
      customerName: "Customer Five",
      valid: 50,
      falsy: 20,
      percentage: (50 / (50 + 20)) * 100,
    },
    {
      id: 6,
      title: "Inventory Check F",
      date: "2024-08-06",
      time: "12:00 PM",
      customerName: "Customer Six",
      valid: 45,
      falsy: 5,
      percentage: (45 / (45 + 5)) * 100,
    },
    {
      id: 7,
      title: "Inventory Check G",
      date: "2024-08-07",
      time: "04:00 PM",
      customerName: "Customer Seven",
      valid: 10,
      falsy: 30,
      percentage: (10 / (10 + 30)) * 100,
    },
    {
      id: 8,
      title: "Inventory Check H",
      date: "2024-08-08",
      time: "01:30 PM",
      customerName: "Customer Eight",
      valid: 35,
      falsy: 15,
      percentage: (35 / (35 + 15)) * 100,
    },
    {
      id: 9,
      title: "Inventory Check I",
      date: "2024-08-09",
      time: "10:30 AM",
      customerName: "Customer Nine",
      valid: 28,
      falsy: 12,
      percentage: (28 / (28 + 12)) * 100,
    },
    {
      id: 10,
      title: "Inventory Check J",
      date: "2024-08-10",
      time: "11:00 AM",
      customerName: "Customer Ten",
      valid: 22,
      falsy: 18,
      percentage: (22 / (22 + 18)) * 100,
    },
  ];

  return (
    <div style={{ width: "100%" , height : 500}}>
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
          noRowsOverlay: CustomNoRowsOverlay,
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
