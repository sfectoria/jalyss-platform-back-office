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

export default function Devis() {
  const [isOpen, setIsOpen] = useState(false);
  const [rows, setRows] = useState([]);
  const [modalId, setModalId] = useState([]);
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
  useEffect(() => {
    fetchData();
  }, [refresh]);

  const fetchData = async () => {
    let params = {
      salesChannelsIds: [param.id],
      take: pageSize,
      skip: page * pageSize,
    };
    const response = await axios.get(`${ip}/estimate/getAll`, {
      params,
    });
    if (response.data.data.length) {
      setRows(response.data.data);
      setCount(response.data.count);
    }
  };

  function CustomPagination(props) {
    return <GridPagination ActionsComponent={Pagination} {...props} />;
  }

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
    { field: "date", headerName: "Date", width: 200 ,valueGetter:(value)=>{
      const date = new Date(value);
      if (date.toISOString().slice(0, 10) === new Date().toISOString().slice(0, 10))
        return "Today";
      else  
      return date.toLocaleDateString('fr-TN');
    }},
    { field: "time", headerName: "Time", width: 200 ,valueGetter:(value,row)=>{
      const date = new Date(row?.date);
      return date.toLocaleTimeString('fr-TN', { hour: '2-digit', minute: '2-digit'}); 
    }},
    {
      field: "customerName",
      headerName: "Customer",
      width: 270,
      renderCell: (params) => (
        <MouseOverPopover name={params.row.customerName} />
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

  const rowss = [
    {
      id: 1,
      date: "07/23/2024 6:56 PM",
      customerName: null,
      fournisseurName: "Salim sfexi",
      managerNumber: "+216 28527345",
      details: "fff",
      bl: true,
    },
    {
      id: 2,
      date: "07/23/2024 6:56 PM",
      customerName: "Hamida midawi",
      fournisseurName: null,
      ticket: true,
    },
    {
      id: 3,
      date: "07/23/2024 6:56 PM",
      customerName: null,
      fournisseurName: "Wael ben sahloul",
      f: true,
    },
    {
      id: 4,
      date: "07/23/2024 6:56 PM",
      customerName: null,
      fournisseurName: "Stock Gabes",
      br: true,
      blf: true,
    },
    {
      id: 5,
      date: "07/23/2024 6:56 PM",
      customerName: "Daenerys",
      fournisseurName: null,
      bl: true,
    },
    {
      id: 6,
      date: "07/23/2024 6:56 PM",
      customerName: "houssem ben ammar",
      fournisseurName: null,
      ticket: true,
    },
    {
      id: 7,
      date: "07/23/2024 6:56 PM",
      customerName: null,
      fournisseurName: "Ferrara",
      f: true,
    },
    {
      id: 8,
      date: "07/23/2024 6:56 PM",
      customerName: "Stock Nabeul",
      fournisseurName: null,
      bs: true,
      blf: true,
    },
    {
      id: 9,
      date: "07/23/2024 6:56 PM",
      customerName: "Harvey",
      fournisseurName: null,
      bl: true,
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
        type="devis"
        />
      )}
    </div>
  );
}
