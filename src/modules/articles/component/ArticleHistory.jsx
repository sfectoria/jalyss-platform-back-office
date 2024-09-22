import React, { useEffect, useState } from "react";
import { Box, Typography } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import DoneIcon from "@mui/icons-material/Done";
import ClearIcon from "@mui/icons-material/Clear";
import axios from "axios";
import { useParams } from "react-router-dom";

export default function ArticleHistory() {
  const [history, setHistory] = useState([]);

  const { stocksIds, articleId } = useParams();
  console.log(articleId, "article")
console.log(stocksIds, "stocks")
  const fetchHistory = async () => {
    try {
      const params = {};

      if (stocksIds) {
        params.stocksIds = stocksIds.split(',').map(id => id.trim()); // Transformation en array
      }
      if (articleId) {
        params.articleId = articleId;
      }

      const response = await axios.get("http://localhost:3000/movements/getAll2", { params });
      setHistory(response.data.data); // On assume que l'API renvoie un objet avec un champ `data`
    } catch (error) {
      console.error("Erreur lors de la récupération des données:", error);
    }
  };
console.log(history, "History")
  // Appel initial pour récupérer les données avec les paramètres de l'URL
  useEffect(() => {
    fetchHistory();
  }, [stocksIds, articleId]);

  // Transformation des données pour le DataGrid
  const rows = history.map((historyRow, i) => {
    const noteLines = historyRow.type === "exit" ? historyRow.exitNoteLine : historyRow.receiptNoteLine;
    const firstLine = noteLines && noteLines.length > 0 ? noteLines[0] : null;
    return {
      id: i, // Chaque ligne doit avoir un ID unique pour le DataGrid
      date: historyRow.exitDate || historyRow.receiptDate,
      customer: historyRow.customerName || "N/A",
      fournisseur: historyRow.fournisseurName || "N/A",
      type: historyRow.type,
      transfer: historyRow.transferNote, // Stocker la valeur booléenne
      quantity: firstLine ? firstLine.quantity : "N/A",
      price: firstLine ? (firstLine.price !== null ? firstLine.price : "N/A") : "N/A",
      totalPrice:
        firstLine && firstLine.price !== null && firstLine.quantity
          ? (firstLine.price * firstLine.quantity).toFixed(2)
          : "N/A",
    };
  });

  // Colonnes du DataGrid
  const columns = [
    { field: "date", headerName: "Date", width: 150 },
    { field: "customer", headerName: "Customer", width: 150 },
    { field: "fournisseur", headerName: "Fournisseur", width: 150 },
    { field: "type", headerName: "Type", width: 150 },
    {
      field: "transfer",
      headerName: "Transfer",
      width: 150,
      align: "center",
      renderCell: (params) => (
        params.value ? <DoneIcon color="success" /> : <ClearIcon color="error" />
      ) // Rendu des icônes en fonction de la valeur booléenne
    },
    { field: "quantity", headerName: "Quantity", width: 150 },
    { field: "price", headerName: "Price", width: 150 },
    { field: "totalPrice", headerName: "Total Price ($)", width: 150 },
  ];

  return (
    <Box
      sx={{
        bgcolor: "background.default",
        mx: 3,
        mt: 3,
      }}
    >
      <Typography variant="h5" mb={3} gutterBottom sx={{ fontWeight: "bold" }}>
        Stock
      </Typography>
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
