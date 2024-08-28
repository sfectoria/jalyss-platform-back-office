import React, { useState,useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { TextField, Autocomplete, MenuItem, Typography } from '@mui/material';
import axios from 'axios';

// function createData(id, image, title, quantity, author, publisher, barcode, price) {
//   return {
//     id,
//     image,
//     title,
//     quantity,
//     author,
//     publisher,
//     barcode,
//     price,
//   };
// }

// const rows = [
//   createData(1, 'https://jalyss.com/520-large_default/alabe-alghani-alabe-alfaker.jpg', 'الرجل الغني و الرجل الفقير', 24, 'robert ti kyosaki', 'maktabat jarir', '104725',10),
//   createData(2, 'https://jalyss.com/899-large_default/The-Subtle-Art-of-Not-Giving.jpg', 'فن اللامبالات', 120, 'mark manson', 'attanwir', '104727',47),
//   createData(3, 'https://jalyss.com/1064-home_default/-kon-ant.jpg', 'كن انت', 160, 'iheb hamarna', 'molhimon', '104720', 100),
//   createData(4, 'https://jalyss.com/2759-large_default/-.jpg', 'خلق الكون في القران الكريم', 123, 'walid mohyi e din al asghar', 'dar e salam', '104728',147),
//   createData(5, 'https://jalyss.com/423-home_default/min-ajl-annajah.jpg', 'من أجل النجاح', 49, 'abd el karim bakkar', 'dar e salam', '1047254',14),
//   createData(6, 'https://jalyss.com/1170-large_default/-.jpg', 'اولاد حارتنا', 49, 'najib mahfoudh', 'dar e chourouk', '104729',47),
// ];

const SearchField = ({ handelBarcode, handelNSearch }) => {
  const [searchText, setSearchText] = useState('');
  const [rows,setRows]=useState([])
  const [error,setError]=useState(false)
  const [loading,setLoading]=useState(true)
  const [filteredRows, setFilteredRows] = useState(rows);
  const [hoveredImage, setHoveredImage] = useState(null);
  useEffect(()=>{
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:3000/articles/getAll');
        setRows(response.data)
       const test=response.data.map((e)=>{
        console.log(e.articalByPublishingHouse.length);
        if(e.cover!==null){
          e.image=e.cover.path
        }
        if(e.articalByPublishingHouse.length){
          e.publisher=e.articalByPublishingHouse[0].publishingHouse.nameAr
        }
        if(e.articalByAuthor.length)
          e.author=e.articalByAuthor[0].author.nameAr
        return e
        })
     
        console.log(response.data,'and',test);
        
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  },[])
  const handleInputChange = (event, value) => {
    setSearchText(value);
  };

  function includesAll(arr, values) {
    return values.every(value => arr.some(element => element.includes(value)));
  }

  const handleSearch = (rows, event) => {
    const values = event.toLowerCase().split(' ');
    setFilteredRows(rows.filter(row => {
      const rowValues = Object.values(row).join(' ').toLowerCase().split(/\s+/);
      return includesAll(rowValues, values);
    }));
  };
 
  const handelNormalSearch = (event, value) => {
    if (value) {
      event.target.value=''  
      handelNSearch(event, value);  
    }
  };

  const handleMouseEnter = (image) => {
    setHoveredImage(image);
  };

  const handleMouseLeave = () => {
    setHoveredImage(null);
  };

  return (
    <tr style={{ width: '100%' }}>
      <td colSpan={6}>
        <div className="d-flex gap-3 align-items-center" style={{ width: '100%' }}>
          <div style={{ width: '25%' }}>
            <div className="input-group">
              <input
                type="text"
                className="form-control"
                placeholder="Bar Code"
                onChange={(event) => handelBarcode(event, rows)}
              />
              <button className="btn btn-outline-secondary" type="button">
                <i className="bi bi-upc-scan"></i>
              </button>
            </div>
          </div>
          <div style={{ width: '70%' }}>
            <Autocomplete
              sx={{ width: '100%' }}
              freeSolo
              inputValue={searchText}
              onInputChange={handleInputChange}
              options={filteredRows}
              onChange={handelNormalSearch}
              getOptionLabel={(option) => `${option.title}`}
              filterOptions={(options) => options}
              renderInput={(params) => (
                <TextField
                  {...params}
                  variant="outlined"
                  fullWidth
                  placeholder="Search ..."
                  onChange={(event) => handleSearch(rows, event.target.value)}
                />
              )}
              renderOption={(props, option) => (
                <MenuItem {...props} key={option.id}>
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    <img 
                      src={option.image} 
                      alt={option.title} 
                      style={{ width: 50, cursor: 'pointer' }}
                      onMouseEnter={() => handleMouseEnter(option.image)}
                      onMouseLeave={handleMouseLeave}
                    />
                    <div className="ms-2">
                      <Typography variant="body1">{`${option.title}`}</Typography>
                    </div>
                    <div className="ms-2">
                      <Typography variant="body1">{` | ${option.author}`}</Typography>
                    </div>
                    <div className="ms-2">
                      <Typography variant="body1">{` | ${option.publisher}`}</Typography>
                    </div>
                  </div>
                </MenuItem>
              )}
            />
          </div>
        </div>
        {hoveredImage && (
          <div 
            style={{
              position: 'fixed',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              padding: '20px',
              borderRadius: '10px',
              zIndex: 1500,
            }}
            onMouseLeave={handleMouseLeave}
          >
            <img src={hoveredImage} alt="Hover Preview" style={{ width: '300px', height: 'auto' }} />
          </div>
        )}
      </td>
    </tr>
  );
};

export default SearchField;
