import {
  createTheme,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  ThemeProvider,
  Typography,
} from "@mui/material";
import React from "react";
import { useParams } from "react-router-dom";
import DoneIcon from "@mui/icons-material/Done";
import ClearIcon from "@mui/icons-material/Clear";

const ChannelHistoryDetails = () => {
  const { id } = useParams();
  const history = [
    {
      date: "2020-01-05",
      customerName: null,
      fournisseurName: "Dar el kiteb",
      type: "BR",
      transfer: false,
      quantity: 40,
      price: 5.5,
    },
    {
      date: "2020-01-02",
      customerName: "Canaux sfax",
      fournisseurName: null,
      type: "BS",
      transfer: false,
      quantity: 40,
      price: 6,
    },
    {
      date: "2020-01-02",
      customerName: "Canaux sfax",
      type: "BS",
      transfer: true,
      quantity: 70,
    },
    {
      date: "2020-01-05",
      customerName: "canaux gafsa",
      type: "BR",
      quantity: 40,
      price: 5.5,
    },
    {
      date: "2020-01-02",
      customerName: "Canaux sfax",
      type: "BS",
      quantity: 40,
      price: 6,
    },
    {
      date: "2020-01-02",
      customerName: "Canaux sfax",
      type: "BR",
      transfer: true,
      quantity: 70,
    },
    {
      date: "2020-01-05",
      customerName: "Dar el kiteb",
      type: "BR",
      quantity: 40,
      price: 5.5,
    },
    {
      date: "2020-01-02",
      customerName: "Canaux sfax",
      type: "BS",
      quantity: 40,
      price: 6,
    },
    {
      date: "2020-01-02",
      customerName: "Canaux sfax",
      type: "BS",
      transfer: true,
      quantity: 70,
    },
    {
      date: "2020-01-02",
      customerName: "Canaux sfax",
      type: "BS",
      quantity: 70,
    },
    {
      date: "2020-01-02",
      customerName: "Canaux sfax",
      type: "BS",
      quantity: 70,
    },
  ];

  const defaultTheme = createTheme();
  return (
    <ThemeProvider theme={defaultTheme}>
      <Paper elevation={3} sx={{ m: "5%", p: "5%" }}>
        <Typography variant="h2" color="initial" gutterBottom>
          Channel {id} history
        </Typography>
        <Table size="large" aria-label="purchases">
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
            {history.map((historyRow, i) => (
              <TableRow key={historyRow.date}>
                <TableCell component="th" scope="row">
                  {historyRow.date}
                </TableCell>
                <TableCell>{historyRow.customerName}</TableCell>
                <TableCell>{historyRow.fournisseurName}</TableCell>
                <TableCell>{historyRow.type}</TableCell>
                <TableCell align="center">
                  {historyRow.transfer ? (
                    <DoneIcon color="success" />
                  ) : (
                    <ClearIcon color="error" />
                  )}
                </TableCell>
                <TableCell>{historyRow.quantity}</TableCell>
                <TableCell>{historyRow.price}</TableCell>
                <TableCell>
                  {(historyRow.price * historyRow.quantity * 100) / 100}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>
    </ThemeProvider>
  );
};

export default ChannelHistoryDetails;
