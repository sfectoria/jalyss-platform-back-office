import React, { useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import IconButton from '@mui/material/IconButton';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import OutlinedInput from '@mui/material/OutlinedInput';
import FormControl from '@mui/material/FormControl';



import ImagePopUp from '../../../component/ImagePopUp';

function createData(image,title, subTotal, fat, carbs, protein) {
  return {image, title, subTotal, fat, carbs, protein };
}

const rows = [
  createData('https://jalyss.com/2759-large_default/-.jpg','Frozen yoghurt', 159, 6.0, 24, 4.0),
  createData('https://jalyss.com/1064-home_default/-kon-ant.jpg','Ice cream sandwich', 237, 9.0, 37, 4.3),
  createData('https://jalyss.com/899-large_default/The-Subtle-Art-of-Not-Giving.jpg','Eclair', 262, 16.0, 24, 6.0),
  createData('','Cupcake', 305, 3.7, 67, 4.3),
  createData('','Gingerbread', 356, 16.0, 49, 3.9),
];

export default function BasicTable() {
    const [open,setOpen]=useState(true)
    const [rowss, setRows] = useState(rows);
    const handleDelete = (title) => {
        setRows(rowss.filter((row) => row.title !== title));
      };
      const handleInputChange = (e, index, field) => {
        const newRows = [...rows];
        newRows[index][field] = e.target.value;
        setRows(newRows);
      };
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
          <TableCell width={10}>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
          </TableCell>
            <TableCell>Item</TableCell>
            <TableCell align="center">Price</TableCell>
            <TableCell align="center">Quantity</TableCell>
            <TableCell align="center">Discount</TableCell>
            <TableCell align="center">SubTotal</TableCell>
            <TableCell align="center">Actions</TableCell>
          </TableRow>
        </TableHead>
        {open&&
        <TableBody>
          {rowss.map((row,i) => (
            <TableRow
              key={i}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
                <TableCell align="right">
                    <ImagePopUp image={row.image}/>
                </TableCell>
              <TableCell component="th" scope="row">
                {row.title}
              </TableCell>
              <TableCell align="center">
              <OutlinedInput
              sx={{width:120,height:56}}
            endAdornment={<InputAdornment position="end">DT</InputAdornment>}
            
          />
          </TableCell>
              <TableCell align="center">  <OutlinedInput
          type="number"
          value={row.fat}
          sx={{width:70,height:56}}
          onChange={(e) => handleInputChange(e, i, 'fat')}
        /></TableCell>
              <TableCell align="center">    <OutlinedInput
              sx={{width:80,height:56}}
            endAdornment={<InputAdornment position="end">%</InputAdornment>}
            
          /></TableCell>
         <TableCell align="center">{row.subTotal}</TableCell>
              <TableCell align="right">
                  <IconButton
                    aria-label="delete"
                    size="small"
                    onClick={() => handleDelete(row.title)}
                  >
                    <DeleteOutlinedIcon color='error' />
                  </IconButton>
                </TableCell>
            </TableRow>
          ))}
        </TableBody>}
      </Table>
    </TableContainer>
  );
}
