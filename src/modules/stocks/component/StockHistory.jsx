import * as React from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';

function createData(image, title, quantity, author, publisher, price) {
  return {
    image,
    title,
    quantity,
    author,
    publisher,
    price,
    history: [
      {
        date: '2020-01-05',
        customerName: 'Dar el kiteb',
        type: 'BR',
        quantity: 40,
        price:5.5
      },
      {
        date: '2020-01-02',
        customerName: 'Canaux sfax',
        type: 'BS',
        quantity: 40,
        price:6
      },
      {
        date: '2020-01-02',
        customerName: 'Canaux sfax',
        type: 'BST',
        quantity: 70,
      },
      {
        date: '2020-01-05',
        customerName: 'Dar el kiteb',
        type: 'BR',
        quantity: 40,
        price:5.5
      },
      {
        date: '2020-01-02',
        customerName: 'Canaux sfax',
        type: 'BS',
        quantity: 40,
        price:6
      },
      {
        date: '2020-01-02',
        customerName: 'Canaux sfax',
        type: 'BST',
        quantity: 70,
      },
      {
        date: '2020-01-05',
        customerName: 'Dar el kiteb',
        type: 'BR',
        quantity: 40,
        price:5.5
      },
      {
        date: '2020-01-02',
        customerName: 'Canaux sfax',
        type: 'BS',
        quantity: 40,
        price:6
      },
      {
        date: '2020-01-02',
        customerName: 'Canaux sfax',
        type: 'BST',
        quantity: 70,
      },
    ],
  };
}

function Row(props) {
  const { row } = props;
  const [open, setOpen] = React.useState(false);

  return (
    <React.Fragment>
      <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row">
          {row.image}
        </TableCell>
        <TableCell align="left">{row.title}</TableCell>
        <TableCell align="left">{row.quantity}</TableCell>
        <TableCell align="left">{row.author}</TableCell>
        <TableCell align="left">{row.publisher}</TableCell>
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
                    <TableCell>Type</TableCell>
                    <TableCell >Quantity</TableCell>
                    <TableCell >Price</TableCell>
                    <TableCell >Total price ($)</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {row.history.map((historyRow) => (
                    <TableRow key={historyRow.date}>
                      <TableCell component="th" scope="row">
                        {historyRow.date}
                      </TableCell>
                      <TableCell>{historyRow.customerName}</TableCell>
                      <TableCell >{historyRow.type}</TableCell>
                      <TableCell >{historyRow.quantity}</TableCell>
                      <TableCell >{historyRow.price}</TableCell>
                      <TableCell >
                        {(historyRow.price * historyRow.quantity * 100) / 100}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
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
        customerName: PropTypes.number.isRequired,
        type: PropTypes.number.isRequired,
        quantity: PropTypes.number.isRequired,
        price: PropTypes.number.isRequired,
        date: PropTypes.string.isRequired,
      }),
    ).isRequired,
    auther: PropTypes.string.isRequired,
    publisher: PropTypes.string.isRequired,
  }).isRequired,
};

const rows = [
  createData('image1', 'mawsem el hejra ela e chamal', 24, 'abderra7men mounif', 'dar el kiteb' ),
  createData('image2', 'halima',120, 'mouhamed la3roussi lmetwi', 'dar dra chnouwa'),
  createData('image3', 'el sodd', 160, 'mahmoud l mesa3di','dar el yamama'),
  createData('image4', 'tot l morr', 123, 'mouhamed la3roussi lmetwi', 'dar e takwa'),
  createData('image5', 'e sindibad l ba7ri', 49, 'sindibad','dar l 9alam'),
];

export default function StockHistory() {
  return (
    <TableContainer component={Paper}>
      <Table aria-label="collapsible table">
        <TableHead>
          <TableRow>
            <TableCell />
            <TableCell>Image</TableCell>
            <TableCell align="left">Title</TableCell>
            <TableCell align="left">Quantity</TableCell>
            <TableCell align="left">Author</TableCell>
            <TableCell align="left">Publisher</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <Row key={row.name} row={row} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
