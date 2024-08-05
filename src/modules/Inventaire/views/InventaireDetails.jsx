import React from 'react';
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
import Link from '@mui/material/Link';
import DoneIcon from '@mui/icons-material/Done';
import ClearIcon from '@mui/icons-material/Clear';
import ImagePopUp from '../../../component/ImagePopUp';



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
        customerName: null,
        fournisseurName:'Dar el kiteb',
        type: 'BR',
        transfer:false,
        quantity: 40,
        price:5.5
      },
      {
        date: '2020-01-02',
        customerName: 'Canaux sfax',
        fournisseurName:null,
        type: 'BS',
        transfer:false,
        quantity: 40,
        price:6
      },
      {
        date: '2020-01-02',
        customerName: 'Canaux sfax',
        type: 'BS',
        transfer:true,
        quantity: 70,
      },
      {
        date: '2020-01-05',
        customerName: 'canaux gafsa',
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
        type: 'BR',
        transfer:true,
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
        type: 'BS',
        transfer:true,
        quantity: 70,
      },
      {
        date: '2020-01-02',
        customerName: 'Canaux sfax',
        type: 'BS',
        quantity: 70,
      },
      {
        date: '2020-01-02',
        customerName: 'Canaux sfax',
        type: 'BS',
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
        <TableCell component="th" scope="row" >
        <ImagePopUp image={row.image} />
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
                    <TableCell>Fournisseur</TableCell>
                    <TableCell>Type</TableCell>
                    <TableCell align='center'>Transfer</TableCell>
                    <TableCell >Quantity</TableCell>
                    <TableCell >Price</TableCell>
                    <TableCell >Total price ($)</TableCell>
                  </TableRow>
                </TableHead>
                {(row.history.length>10)?
                <TableBody>
                  {row.history.map((historyRow,i) => {
                    if (i<10) {return<TableRow key={historyRow.date}>
                        <TableCell component="th" scope="row">
                          {historyRow.date}
                        </TableCell>
                        <TableCell>{historyRow.customerName}</TableCell>
                        <TableCell>{historyRow.fournisseurName}</TableCell>
                        <TableCell >{historyRow.type}</TableCell>
                        <TableCell align='center' >{historyRow.transfer?<DoneIcon color='success'/>:<ClearIcon color='error'/>}</TableCell>
                        <TableCell >{historyRow.quantity}</TableCell>
                        <TableCell >{historyRow.price}</TableCell>
                        <TableCell >
                          {(historyRow.price * historyRow.quantity * 100) / 100}
                        </TableCell>
                      </TableRow>}
                      else return '';
                        
                    }
                    

                  )}
                  <Link href="#" sx={{}} underline="hover">
  {'...    see more'}
</Link>
                </TableBody>: <TableBody>
                  {row.history.map((historyRow,i) => (
                    <TableRow key={historyRow.date}>
                        <TableCell component="th" scope="row">
                          {historyRow.date}
                        </TableCell>
                        <TableCell>{historyRow.customerName}</TableCell>
                        <TableCell>{historyRow.fournisseurName}</TableCell>
                        <TableCell >{historyRow.type}</TableCell>
                        <TableCell >{historyRow.quantity}</TableCell>
                        <TableCell >{historyRow.price}</TableCell>
                        <TableCell >
                          {(historyRow.price * historyRow.quantity * 100) / 100}
                        </TableCell>
                      </TableRow>
                        
                  )
                    

                  )}
                </TableBody>}
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
      }),
    ).isRequired,
    auther: PropTypes.string.isRequired,
    publisher: PropTypes.string.isRequired,
  }).isRequired,
};

const rows = [
  createData('https://jalyss.com/520-large_default/alabe-alghani-alabe-alfaker.jpg', 'الرجل الغني و الرجل الفقير', 24, 'robert ti kyosaki', 'maktabat jarir' ),
  createData('https://jalyss.com/899-large_default/The-Subtle-Art-of-Not-Giving.jpg', 'فن اللامبالات',120, 'mark manson', 'attanwir'),
  createData('https://jalyss.com/1064-home_default/-kon-ant.jpg', 'كن انت', 160, 'iheb hamarna','molhimon'),
  createData('https://jalyss.com/2759-large_default/-.jpg', 'خلق الكون في القران الكريم', 123, 'walid mohyi e din al asghar', 'dar e salam'),
  createData('https://jalyss.com/423-home_default/min-ajl-annajah.jpg', 'من أجل النجاح', 49, 'abd el karim bakkar','dar e salam'),
  createData('https://jalyss.com/1170-large_default/-.jpg', 'اولاد حارتنا', 49, 'najib mahfoudh','dar e chourouk'),
];

export default function InventaireDetails() {
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
          {rows.map((row,i) => (
            <Row key={i} row={row} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

