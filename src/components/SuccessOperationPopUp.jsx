import React, { useState } from 'react';
import { Popover, Box } from '@mui/material';
import Success from './Success';
import PartyAnimationLeft from './PartyAnimationLeft';
import PartyAnimationRight from './PartyAnimationRight';

function SuccessOperationPopUp() {
  const [anchorEl, setAnchorEl] = useState(true);

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;
   const handleClose = () => {
    setAnchorEl(null);
  };
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
      PaperProps={{
        sx: {
          backgroundColor: 'transparent',
          boxShadow: 'none',
          width: '100vw',
          height: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'fixed',
          top: 0,
          left: 0,
        },
      }}
    >
      <Box sx={{ position: 'relative', width: '100%', height: '100%' }}>
        <Box sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}>
          <Success />
        </Box>
        <Box sx={{display:'flex'}}>
        <Box sx={{ position: 'absolute', bottom: 0, left: 0, transform: 'translateY(0)' }}>
          <PartyAnimationLeft />
        </Box>
        <Box sx={{ position: 'absolute', bottom: 0, right: 0, transform: 'translateY(0)' }}>
          <PartyAnimationRight />
        </Box>
        </Box>
      </Box>
    </Popover>
  );
}

export default SuccessOperationPopUp;
