import React, { useEffect, useState } from "react";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from "@mui/material";
import DoneIcon from "@mui/icons-material/Done";
import ClearIcon from "@mui/icons-material/Clear";

export default function ArticleHistory() {
    const [history, setHistory] = useState([]);

    useEffect(() => {
        const fetchHistory = async () => {
          try {
            const response = await fetch("http://localhost:3000/movements/getAll2");
            const result = await response.json();
            setHistory(result.data); // Accéder à la propriété "data" dans le résultat de l'API
          } catch (error) {
            console.error("Erreur lors de la récupération des données:", error);
          }
        };
    
        fetchHistory();
      }, []);

  console.log("history", history); 
  
  return (
    <TableContainer sx={{ mt: 5 }} component={Paper}>
      <Table aria-label="full history table">
        <TableHead>
          <TableRow>
            <TableCell>Date</TableCell>
            <TableCell>Customer</TableCell>
            <TableCell>Fournisseur</TableCell>
            <TableCell>Type</TableCell>
            <TableCell align="center">Transfer</TableCell>
            <TableCell>Quantity</TableCell>
            <TableCell>Price</TableCell>
            <TableCell>Total price ($)</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {history.length > 0 ? (
            history.map((historyRow, i) => {
              // Récupérer les lignes d'articles selon le type (exitNoteLine ou receiptNoteLine)
              const noteLines = historyRow.type === "exit" ? historyRow.exitNoteLine : historyRow.receiptNoteLine;
              
              // Si les lignes existent, on prend la première ligne pour cet exemple
              const firstLine = noteLines && noteLines.length > 0 ? noteLines[0] : null;

              return (
                <TableRow key={i}>
                  <TableCell component="th" scope="row">
                    {historyRow.exitDate || historyRow.receiptDate}
                  </TableCell>
                  <TableCell>{historyRow.customerName || "N/A"}</TableCell>
                  <TableCell>{historyRow.fournisseurName || "N/A"}</TableCell>
                  <TableCell>{historyRow.type}</TableCell>
                  <TableCell align="center">
                    {historyRow.transferNote ? <DoneIcon color="success" /> : <ClearIcon color="error" />}
                  </TableCell>
                  <TableCell>
                    {firstLine ? firstLine.quantity : "N/A"}
                  </TableCell>
                  <TableCell>
                    {firstLine ? (firstLine.price !== null ? firstLine.price : "N/A") : "N/A"}
                  </TableCell>
                  <TableCell>
                    {firstLine && firstLine.price !== null && firstLine.quantity
                      ? (firstLine.price * firstLine.quantity).toFixed(2)
                      : "N/A"}
                  </TableCell>
                </TableRow>
              );
            })
          ) : (
            <TableRow>
              <TableCell colSpan={8} align="center">
                No data available
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
