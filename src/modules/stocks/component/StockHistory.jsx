import React, { useEffect, useState } from "react";
import { DataGrid, GridToolbar, GridActionsCellItem } from "@mui/x-data-grid";
import DescriptionIcon from '@mui/icons-material/Description';
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
  const [row, setRow] = useState({});
  const [info, setInfo] = useState({});
  const [modalId, setModalId] = useState(0);
  const [isOpen, setIsOpen] = useState(false);

  const params = useParams();

  useEffect(() => {
    fetchHistoryData();
  }, []);

  const mergeAndSortByDate = (exitNotes, receiptNotes) => {
    const combined = [
      ...exitNotes.map((item) => ({
        ...item,
        type: "exit",
        date: new Date(item.exitDate),
        id: `exit-${item.id}`,
      })),
      ...receiptNotes.map((item) => ({
        ...item,
        type: "receipt",
        date: new Date(item.receiptDate),
        id: `receipt-${item.id}`,
      })),
    ];

    return combined.sort((a, b) => a.date - b.date);
  };

  const fetchHistoryData = async () => {
    const responseReceipt = await axios.get(`${ip}/receiptNote/all_rn`, {
      params: { stocksIds: [params.id] },
    });
    console.log(responseReceipt.data);
    const responseExit = await axios.get(`${ip}/exitNote/all_en`, {
      params: { stocksIds: [params.id] },
    });
    console.log(responseExit.data);
    const sortedData = mergeAndSortByDate(
      responseExit.data.data,
      responseReceipt.data.data
    );
    console.log(sortedData);
    setRows(sortedData);
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
    { field: "date", headerName: "Date", width: 200,
      valueGetter:(value)=>(value.toString().slice(0,value.toString().indexOf('GMT')-1))
     },
    {
      field: "customerName",
      headerName: "Customer",
      width: 270,
      renderCell: (params) => (
        <MouseOverPopover name={params.row.client} />
      ),
    },
    {
      field: "fournisseurName",
      headerName: "Fournisseur",
      width: 250,
      renderCell: (params) => (
        <MouseOverPopover name={params.row.fournisseurName} />
      ),
    },
    {
      field: "br",
      headerName: "BR",
      width: 50,
      renderCell: (params) =>
        params.row.type==='receipt' ? (
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
        params.row.type==='exit' ? (
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
      renderCell: ({id}) => {
       return <GridActionsCellItem
          icon={<DescriptionIcon />}
          onClick={(e)=>{
            openModal(e)
            setModalId(id);
          }}
          label=""
        />
      },
    },
  ];

  // const rows = [
  //   { id: 1, date:'07/23/2024 6:56 PM', customerName: null, fournisseurName: 'Salim sfexi', managerNumber: '+216 28527345', details: 'fff',br:true },
  //   { id: 2, date: '07/23/2024 6:56 PM', customerName:  'Hamida midawi' , fournisseurName:null,bs:true},
  //   { id: 3, date: '07/23/2024 6:56 PM', customerName: null, fournisseurName: 'Wael ben sahloul',br:true },
  //   { id: 4, date: '07/23/2024 6:56 PM', customerName: null, fournisseurName: 'Stock Gabes',br:true,bt:true },
  //   { id: 5, date: '07/23/2024 6:56 PM', customerName: 'Daenerys', fournisseurName:null ,bs:true},
  //   { id: 6, date: '07/23/2024 6:56 PM', customerName:  'houssem ben ammar', fournisseurName:null,bs:true },
  //   { id: 7, date: '07/23/2024 6:56 PM', customerName: null, fournisseurName: 'Ferrara',br:true },
  //   { id: 8, date: '07/23/2024 6:56 PM', customerName: 'Stock Nabeul', fournisseurName: null,bs:true,bt:true },
  //   { id: 9, date: '07/23/2024 6:56 PM', customerName: 'Harvey', fournisseurName:null ,bs:true },
  // ];

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
          modalId={modalId.slice(modalId.indexOf('-')+1)}
          currency={"DT"}
          subTotal={0}
          taxAmount={0}
          discountAmount={0}
          total={0}
          mode="viewer"
          type={modalId.slice(0,modalId.indexOf('-'))}
        />}
      </div>
    </div>
  );
}
