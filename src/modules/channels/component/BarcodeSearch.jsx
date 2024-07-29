import React from 'react';
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';


export default function BarcodeSearch() {
  return (
    <Paper
      component="form"
      sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width:'35%' }}
    >
      <InputBase
        sx={{ ml: 1, flex: 1 }}
        placeholder="Barcode"
        inputProps={{ 'aria-label': 'search google maps' }}
      />
  
    </Paper>
  );
}
