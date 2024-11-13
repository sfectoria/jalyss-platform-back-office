import React, { useEffect, useState } from "react";
import { DataGrid, GridToolbar, GridActionsCellItem } from "@mui/x-data-grid";
import VisibilityIcon from "@mui/icons-material/Visibility";
import CustomNoResultsOverlay from "../../../style/NoResultStyle";
import InvoiceModal from "../../../components/InvoiceModal";
import axios from "axios";
import CustomNoRowsOverlay from "../../../style/NoRowsStyle";

export default function Retour() {
  const [isOpen, setIsOpen] = useState(false);
  const [rows, setRows] = useState([]); 
  const [modalId, setModalId] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:3000/return-note/getAll');
        
        const formattedData = response.data.map((item) => ({
          id: item.id,
          returnDate: item.returnDate,
          customerName: item.client.fullName || "No Name", // Add customerName
        }));
        setRows(formattedData); 
      } catch (error) {
        console.error("Error fetching return notes:", error);
      }
    };

    fetchData();
  }, []);

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
      field: "returnDate",
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
        const date = new Date(row?.date);
        return date.toLocaleTimeString('fr-TN', { hour: '2-digit', minute: '2-digit'}); 
      },
    },
    {
      field: "customerName",
      headerName: "Customer",
      width: 270,
      renderCell: (params) => (
        <div>{params.row.customerName || "No Name"}</div>
      ),
    },
    {
      field: "details",
      headerName: "Details",
      width: 110,
      type: "actions",
      getActions: ({ id }) => [
        <GridActionsCellItem
          icon={<VisibilityIcon />}
          onClick={(e) => {
            openModal(e);
            setModalId(id);
          }}
          label=""
        />,
      ],
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
      {isOpen&&<InvoiceModal
        showModal={isOpen}
        closeModal={closeModal}
        modalId={modalId}
        currency={"DT"}
        subTotal={0}
        // taxAmount={0}
        discountAmount={0}
        total={0}
        mode="viewer"
        type="return"
      />}
    </div>
  
  );
}
