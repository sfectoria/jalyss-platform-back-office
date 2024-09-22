import React, { useEffect, useState } from 'react';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import { Stack } from '@mui/material';
import axios from 'axios';
import { ip } from '../constants/ip';

const PersonSearch = ({person,type,setName,setEmail,setAddress,setId}) => {
  const [rows,setRows]=useState([])
  useEffect(()=>{
    fetchData()
  },[])

  const fetchData = async () => {
    if(type==='BR') {
    const response = await axios.get(`${ip}/clients`);
    console.log(response.data);
    setRows(response.data)

  }
  else if (type==='BT'){
     const response = await axios.get(`${ip}/stocks/getAll`)
     console.log(response.data);
     let dataStocks=response.data.map((e)=>{
      let {name,location,...rest}=e
      let fullName=name
      let address=location
      let email='jalyss@gmail.com'
      return {fullName,address,...rest}
     })
     setRows(dataStocks)
     console.log(dataStocks);
     
       }
  else if (type==='BS' || type === "BL" || type === "BLF" || type === "F" || type === "Ticket" || type === "Devis" || type==='BC' || type==='BRe'){
     const response = await axios.get(`${ip}/clients`)
     console.log(response.data);
     setRows(response.data)
       }

  };
    const [options, setOptions] = useState();
    const [searchText, setSearchText] = useState('');
    const [filteredRows, setFilteredRows] = useState(rows);

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
      setId(value.id)
      setName(value.fullName)
      setEmail(value.email)
      setAddress(value.address)
      
    }
  };

  const handleInputChange = (event, value) => {
    setSearchText(value);
  };
 

    return (
        <Stack sx={{my:1}}>
            <Autocomplete
                freeSolo
                id="free-solo-2-demo"
                disableClearable
                options={filteredRows}
                inputValue={searchText}
                onInputChange={handleInputChange}
                getOptionLabel={(option) => `${option.fullName}`}
              filterOptions={(options) => options}
              onChange={handelNormalSearch}
                renderInput={(params) => (
                    <TextField
                        placeholder={type}
                        onChange={(event) => handleSearch(rows, event.target.value)}
                        {...params}
                        InputProps={{
                            ...params.InputProps,
                            type: 'search',
                            sx: {
                                height: '40px',
                                padding: '0 10px', 
                            },
                        }}
                        InputLabelProps={{
                            sx: {
                             
                                top: '-8px', 
                            },
                        }}
                    />
                )}
            />
        </Stack>
    );
};

export default PersonSearch;
