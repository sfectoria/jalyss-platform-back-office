import React, { useEffect, useState } from 'react';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import { Stack } from '@mui/material';
import axios from 'axios';
import { ip } from '../constants/ip';

const rows = [
    { id: 1, name: 'Sfax1', address: 'Sfax1/Sfax', email: "salim.sfexi@example.com", phone: "123-456-7890", details: "fff" },
    { id: 2, name: 'Stock l mida', address: 'Mida/menzel tmim/Nabeul', email: "hamida.midawi@example.com", phone: "28527345" },
    { id: 3, name: 'Stock sahlin', address: 'Sahlin/Sousse', email: "wael.sahloul@example.com", phone: "345-678-9012" },
    { id: 4, name: 'Stock alia', address: 'Alia/bizerte', email: "mohamed.amin@example.com", phone: "456-789-0123" },
    { id: 5, name: 'Targaryen', address: 'Daenerys', email: "houssem.ammar@example.com", phone: "567-890-1234" },
    { id: 6, name: 'Melisandre', address: 'bizerte', email: "melisandre@example.com", phone: "678-901-2345" },
    { id: 7, name: 'Clifford', address: 'Ferrara', email: "clifford.ferrara@example.com", phone: "789-012-3456" },
    { id: 8, name: 'Frances', address: 'Rossini', email: "frances.rossini@example.com", phone: "890-123-4567" },
    { id: 9, name: 'Roxie', address: 'Harvey', email: "roxie.harvey@example.com", phone: "901-234-5678" },
];

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
     setRows(response.data)

       }
  else if (type === "BL" || type === "BLF" || type === "F" || type === "Ticket" || type === "Devis" || type==='BC'){
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
