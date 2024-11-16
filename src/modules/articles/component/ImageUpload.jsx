import React ,{useState}from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import AddIcon from '@mui/icons-material/Add';

const VisuallyHiddenInput = styled('input')({
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: 1,
  overflow: 'hidden',
  position: 'absolute',
  bottom: 0,
  left: 0,
  whiteSpace: 'nowrap',
  width: 1,
});

export default function InputFileUpload({handleFileChange}) {
  return (
    <Box 
      sx={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        border: '2px dashed', 
        cursor: 'pointer',
        width:100,
        height:100,
        position: 'absolute',  
        right: 1, 
        top: '60%', 
        transform: 'translateX(-150%)', 
          }} 
      component="label"
    >
      <AddIcon sx={{ fontSize: 45 }} />
      <VisuallyHiddenInput type="file" accept="image/*" onChange={handleFileChange} />
    </Box>
  );
}
