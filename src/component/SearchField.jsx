import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { TextField, Autocomplete, MenuItem, Typography } from '@mui/material';
import ImagePopUp from './ImagePopUp';
import SearchTableRes from './SearchTableRes';

function createData(id,image, title, quantity, author, publisher, barcode,price) {
    return {
      id,
      image,
      title,
      quantity,
      author,
      publisher,
      barcode,
      price
    };
  }
  
  
  const rows = [
    createData(1,'https://jalyss.com/520-large_default/alabe-alghani-alabe-alfaker.jpg', 'الرجل الغني و الرجل الفقير', 24, 'robert ti kyosaki', 'maktabat jarir' ,'104725'),
    createData(2,'https://jalyss.com/899-large_default/The-Subtle-Art-of-Not-Giving.jpg', 'فن اللامبالات',120, 'mark manson', 'attanwir','104727'),
    createData(3,'https://jalyss.com/1064-home_default/-kon-ant.jpg', 'كن انت', 160, 'iheb hamarna','molhimon','104720',100),
    createData(4,'https://jalyss.com/2759-large_default/-.jpg', 'خلق الكون في القران الكريم', 123, 'walid mohyi e din al asghar', 'dar e salam','104728'),
    createData(5,'https://jalyss.com/423-home_default/min-ajl-annajah.jpg', 'من أجل النجاح', 49, 'abd el karim bakkar','dar e salam','1047254'),
    createData(6,'https://jalyss.com/1170-large_default/-.jpg', 'اولاد حارتنا', 49, 'najib mahfoudh','dar e chourouk','104729'),
  ];


const SearchField = ({handelRef,handelBarcode,val,handelAddItem}) => {
  const [searchText, setSearchText] = useState('');
  const [filteredRows,setFilteredRows] =useState(rows)
  
  const handleInputChange = (event, value) => {
    setSearchText(value);
  };
  function includesAll(arr, values) {
    return values.every(value => arr.some(element => element.includes(value)));
  }
  
  const handleSearch=(rows,event )=>{
    console.log(rows);
    const values = event.toLowerCase().split(' ');
    
     setFilteredRows(rows.filter(row => {
      const rowValues = Object.values(row).join(' ').toLowerCase().split(/\s+/);
      return includesAll(rowValues, values);
    }))
  }
  

  return (
    <div>
    <div className="d-flex gap-4 container mt-5">
      <div className="input-group" style={{ width: '30%' }}>
        <input type="text" className="form-control" placeholder="Bar Code" onChange={(event)=>{
          handelBarcode(event,rows)
        }
        } 
          />
        <button className="btn btn-outline-secondary" type="button">
          <i className="bi bi-upc-scan"></i>
        </button>
      </div>
      <div className="input-group" style={{ width: '65%' }}>
        <Autocomplete
        sx={{width:'100%'}}
          freeSolo
          inputValue={searchText}
          onInputChange={handleInputChange}
          options={filteredRows}
          getOptionLabel={(option) => `${option.col1} ${option.col2}`}
          filterOptions={(options, params) => {
            if (params.inputValue.length > 10) {
              return options;
            }
            return [];
          }}
          renderInput={(params) => (
            <TextField
            placeholder='Search ...'
              {...params}
              variant="outlined"
              fullWidth
              onChange={(event)=>{handleSearch(rows,event.target.value)}}
            />
          )}
          renderOption={(props, option) => (
            <MenuItem {...props}  key={option.id}>
              <div style={{display:'flex'}}>
              <ImagePopUp image={'https://daroueya.com/wp-content/uploads/2023/05/%D8%A7%D9%84%D8%A3%D8%A8-%D8%A7%D9%84%D8%BA%D9%86%D9%8A-%D8%A7%D9%84%D8%A3%D8%A8-%D8%A7%D9%84%D9%81%D9%82%D9%8A%D8%B1-1.jpg'} />

                <Typography variant="body1">{`ID: ${option.id}`}</Typography>
                <Typography variant="body1">{`Column 1: ${option.col1}`}</Typography>
                <Typography variant="body1">{`Column 2: ${option.col2}`}</Typography>
              </div>
            </MenuItem>
          )}
          

          
        />
      </div>
    </div>
    <SearchTableRes handelRef={handelRef} handelAddItem={handelAddItem} rows={filteredRows}/>
    </div>
  );
};

export default SearchField;