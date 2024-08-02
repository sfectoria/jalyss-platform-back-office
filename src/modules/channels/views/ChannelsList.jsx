import React, { useState } from 'react';
import { TextField, Autocomplete, MenuItem, Typography } from '@mui/material';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';

const rows = [
  { id: 1, col1: 'Hello', col2: 'World' },
  { id: 2, col1: 'DataGrid', col2: 'is Awesome' },
  { id: 3, col1: 'Material-UI', col2: 'is Cool' },
];

const SearchWithDropdown = () => {
  const [searchText, setSearchText] = useState('');

  const handleInputChange = (event, value) => {
    setSearchText(value);
  };

  const filteredRows = rows.filter((row) =>
    Object.values(row).some((field) =>
      String(field).toLowerCase().includes(searchText.toLowerCase())
    )
  );

  return (
    <div className="container mt-5">
      <div className="input-group" style={{ width: '30%' }}>
        <input type="text" className="form-control" placeholder="Search" />
        <button className="btn btn-outline-secondary" type="button">
        <i class="bi bi-upc-scan"></i>
        </button>
      </div>
      <Autocomplete
        freeSolo
        inputValue={searchText}
        onInputChange={handleInputChange}
        options={filteredRows}
        getOptionLabel={(option) => `${option.col1} ${option.col2}`}
        renderInput={(params) => (
          <TextField
            {...params}
            label="Search"
            variant="outlined"
            fullWidth
          />
        )}
        renderOption={(props, option) => (
          <MenuItem {...props} key={option.id}>
            <div>
              <Typography variant="body1">{`ID: ${option.id}`}</Typography>
              <Typography variant="body1">{`Column 1: ${option.col1}`}</Typography>
              <Typography variant="body1">{`Column 2: ${option.col2}`}</Typography>
            </div>
          </MenuItem>
        )}
      />
    </div>
  );
};

export default SearchWithDropdown;
