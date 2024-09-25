import React, { useState } from 'react';
import { Button, Popover, Typography,Box } from '@mui/material';
import sale from '../assets/sale.gif'

function SuccessOperationPopUp({}) {
    const [anchorEl, setAnchorEl] = useState(true);


  
    const handleClose = () => {
      setAnchorEl(null);
    };
  
     const open = Boolean(anchorEl);
    console.log(anchorEl);
    const id = open ? 'simple-popover' : undefined;
  return (
    <Popover
    id={id}
    open={open}
    anchorEl={anchorEl}
    onClose={handleClose}
    anchorOrigin={{
      vertical: 'center',
      horizontal: 'center',
    }}
    transformOrigin={{
      vertical: 'center',
      horizontal: 'center',
    }}
  >
     <Box 
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            padding: 2,
            minWidth: 200, // Adjust this to your needs
          }}
        >
          <img
            src={sale}
            alt="Placeholder"
            style={{ marginTop: '2px' ,width:300}} // Add margin for spacing
          />
        </Box>
  </Popover>
  )
}

export default SuccessOperationPopUp