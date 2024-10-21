import React, { useState } from "react";
import PropTypes from "prop-types";
import Box from "@mui/material/Box";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import Link from "@mui/material/Link";
import DoneIcon from "@mui/icons-material/Done";
import ClearIcon from "@mui/icons-material/Clear";
import { Link as RouterLink, useParams } from "react-router-dom";


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

function Row(props) {
  const { row } = props;
  const [open, setOpen] = useState(false);
  const params=useParams()
  console.log(params.id,"params")

  return (
    <React.Fragment>
      <TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
        <TableCell>
          {open ? (
            <IconButton
              aria-label="expand row"
              size="small"
              onClick={() => setOpen(false)}
            >
              <KeyboardArrowUpIcon />
            </IconButton>
          ) : (
            <IconButton
              aria-label="expand row"
              size="small"
              onClick={() => {
                setOpen(true);
              }}
            >
              <KeyboardArrowDownIcon />
            </IconButton>
          )}
        </TableCell>

        <TableCell align="left">{row?.stock?.name}</TableCell>
        <TableCell align="left">{row?.stock?.location}</TableCell>
        <TableCell align="left">{row?.quantity}</TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Typography variant="h6" gutterBottom component="div">
                History
              </Typography>
              <Table size="small" aria-label="purchases">
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
                {history.length > 10 ? (
                  <TableBody>
                    {history.map((historyRow, i) => {
                      if (i < 10) {
                        return (
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
                              {(historyRow.price * historyRow.quantity * 100) /
                                100}
                            </TableCell>
                          </TableRow>
                        );
                      } else return "";
                    })}
                    <Link href={`${params.id}/stocks/${row.stock.id}/full-history`} underline="hover">
                      {"...    see more"}
                    </Link>
                  </TableBody>
                ) : (
                  <TableBody>
                    {row.history.map((historyRow, i) => (
                      <TableRow key={historyRow.date}>
                        <TableCell component="th" scope="row">
                          {historyRow.date}
                        </TableCell>
                        <TableCell>{historyRow.customerName}</TableCell>
                        <TableCell>{historyRow.fournisseurName}</TableCell>
                        <TableCell>{historyRow.type}</TableCell>
                        <TableCell>{historyRow.quantity}</TableCell>
                        <TableCell>{historyRow.price}</TableCell>
                        <TableCell>
                          {(historyRow.price * historyRow.quantity * 100) / 100}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                )}
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

Row.propTypes = {
  row: PropTypes.shape({
    image: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    quantity: PropTypes.number.isRequired,
    history: PropTypes.arrayOf(
      PropTypes.shape({
        type: PropTypes.number.isRequired,
        quantity: PropTypes.number.isRequired,
        price: PropTypes.number.isRequired,
        date: PropTypes.string.isRequired,
      })
    ).isRequired,
    auther: PropTypes.string.isRequired,
    publisher: PropTypes.string.isRequired,
  }).isRequired,
};

export default function ArticleInStocks({ data }) {
  console.log(data);

  return (
    <TableContainer sx={{ mt: 5 }} component={Paper}>
      <Table aria-label="collapsible table">
        <TableHead>
          <TableRow>
            <TableCell />
            <TableCell>Stock Name</TableCell>
            <TableCell align="left">Stock Address</TableCell>
            <TableCell align="left">Quantity</TableCell>
            {/* <TableCell align="left">Author</TableCell>
            <TableCell align="left">Publisher</TableCell> */}
          </TableRow>
        </TableHead>
        <TableBody>
          {data && data.map((row, i) => <Row key={i} row={row} />)}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
