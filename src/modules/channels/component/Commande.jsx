import React, { useEffect, useState } from "react";
import { DataGrid, GridToolbar, GridActionsCellItem } from "@mui/x-data-grid";
import VisibilityIcon from "@mui/icons-material/Visibility";
import CustomNoResultsOverlay from "../../../style/NoResultStyle";
import InvoiceModal from "../../../components/InvoiceModal";
import MouseOverPopover from "./cosOrForPopUp";
import ColorToggleButton from "../../../components/ColorToggleButton";
import axios from "axios";
import { ip } from "../../../constants/ip";
import { useParams } from "react-router-dom";

export default function Commande() {
  const [isOpen, setIsOpen] = useState(false);
  const [rows,setRows]=useState([])
  const [count,setCount]=useState(0)
  const param = useParams()

  useEffect(()=>{
    fetchData()
  },[])

  const fetchData=async()=>{
    const response=await axios.get(`${ip}/purchaseOrder/getAll`,{params:{salesChannelsIds:[param.id]}})
    console.log("res",response.data.data);
    setRows(response.data.data);
  }

  
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
      field: "date",
      headerName: "Date",
      width: 150,
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
        return row.date.slice(
          row.date.indexOf("T") + 1,
          row.date.indexOf("T") + 6
        );
      },
    },
    {
      field: "customerName",
      headerName: "Customer",
      width: 250,
      renderCell: (params) => (
       <MouseOverPopover name={params.row?.client} />
      )
    },
    {
      field: "state",
      headerName: "State",
      width: 400,
      renderCell: (params) => (
        <ColorToggleButton state={params.row?.status?.toLowerCase()}  idPurchaseOrder={params.row.id} saleChannelId={params.row.salesChannelsId} idClient={params.row.idClient} deliveryDate={params.row.orderDate} purchaseOrderLine={params.row.purchaseOrderLine} />
      )
    },
    {
      field: "details",
      headerName: "Details",
      width: 110,
      type: "actions",
      getActions: ({ id }) => [
        <GridActionsCellItem
          icon={<VisibilityIcon />}
          onClick={openModal}
          label=""
        />,
      ],
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
      {isOpen&&<InvoiceModal
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
        // taxAmount={0}
        discountAmount={0}
        total={0}
      />}
    </div>
  );
}
