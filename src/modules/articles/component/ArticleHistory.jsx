import React, { useEffect, useState } from "react";
import { Box, Typography } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import DoneIcon from "@mui/icons-material/Done";
import ClearIcon from "@mui/icons-material/Clear";
import axios from "axios";
import { useParams } from "react-router-dom";
import CustomNoRowsOverlay from "../../../style/NoRowsStyle";

export default function ArticleHistory() {
  const [rows, setRows] = useState([]);
  const [articleName, setArticleName] = useState("");



  const fetchHistory = async () => {
    try {
      const response = await axios.get(
        `http://localhost:3000/articles/${stocksIds}/${articleId}`
      );
      setHistory(response.data);
      console.log(response.data, ".data");
    } catch (error) {
      console.log("Error fetching history:", error.message);
    }
  };
  useEffect(() => {
    if (history) {
      setRows(formatHistoryRows());
    }
  }, [stocksIds, articleId]);

  const formatHistoryRows = () => {
    const rows = [];
  
    const addRows = (noteLines, type) => {
      noteLines.forEach((line) => {
        rows.push({
          id: line.id,
          date: line.createdAt,
          type,
          quantity: line.quantity || "N/A",
          price: line.price !== null ? line.price : "N/A",
          totalPrice:
            line.price !== null && line.quantity
              ? (line.price * line.quantity).toFixed(2)
              : "N/A",
          discount: line.discount ? `${line.discount} %` : "0%",
          customer: type === "exit" ? history.client?.fullName || "N/A" : "N/A",
          fournisseur:
            type === "receipt" ? history.provider?.nameProvider || "N/A" : "N/A",
          transfer: type === "transfer" ? true : false,
        });
      });
    };
  
    addRows(history.exitNoteLine || [], "exit");
    addRows(history.receiptNoteLine || [], "receipt");
    addRows(history.transferNoteLine || [], "transfer");
    addRows(history.ReturnNoteLine || [], "return");
  
    return rows;
  };
  //   const noteLines =
  //     historyRow.type === "exit"
  //       ? historyRow.exitNoteLine
  //       : historyRow.receiptNoteLine;

  //   const filteredLines = noteLines?.filter(
  //     (line) =>
  //       line.articleId === Number(articleId) ||
  //       line.Article?.id === Number(articleId)
  //   );
  //   const firstLine =
  //     filteredLines && filteredLines.length > 0 ? filteredLines[0] : null;
  //   const quantity = firstLine?.quantity || "N/A";
  //   const price = firstLine?.price !== null ? firstLine?.price : "N/A";
  //   const totalPrice =
  //     firstLine && firstLine.price !== null && firstLine.quantity
  //       ? (firstLine.price * firstLine.quantity).toFixed(2)
  //       : "N/A";

  //   return {
  //     id: i,
  //     date: historyRow.exitDate || historyRow.receiptDate,
  //     customer: historyRow.client?.fullName || "X",
  //     fournisseur: historyRow.provider?.nameProvider || "X",
  //     type: historyRow.type,
  //     transfer: historyRow.transferNote,
  //     quantity: quantity,
  //     price: price,
  //     totalPrice: totalPrice,
  //     discount: firstLine?.discount ? `${firstLine.discount} %` : "0%",
  //     totalAmount: historyRow.totalAmount || "N/A",
  //   };
  // });

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
    { field: "customer", headerName: "Customer", width: 150 },
    { field: "fournisseur", headerName: "Fournisseur", width: 150 },
    { field: "type", headerName: "Type", width: 120 },
    {
      field: "transfer",
      headerName: "Transfer",
      width: 80,
      align: "center",
      renderCell: (params) =>
        params.value ? (
          <DoneIcon color="success" />
        ) : (
          <ClearIcon color="error" />
        ),
    },
    { field: "quantity", headerName: "Quantity", width: 120 },
    { field: "price", headerName: "Price", width: 110 },
    { field: "totalPrice", headerName: "Total Price (Dt)", width: 120 },
    { field: "discount", headerName: "Discount", width: 120 },
    { field: "totalAmount", headerName: "TotalAmount (Dt)", width: 130 },
  ];
  console.log(history, "history");

  return (
    <Box
      sx={{
        bgcolor: "background.default",
        mx: 3,
        mt: 3,
      }}
    >
      <Typography variant="h5" mb={3} gutterBottom sx={{ fontWeight: "bold" }}>
        Historique de l'Article :
      </Typography>
      <div style={{ width: "100%", height: 500 }}>
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
            noResultsOverlay: () => <div>No data available</div>, // Overlay personnalisé quand il n'y a pas de données
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
      </div>
    </Box>
  );
}
