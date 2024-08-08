import React from 'react'
import Box from '@mui/material/Box';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import { useNavigate } from 'react-router-dom';

function AddInventaire() {
    
    const navigate=useNavigate()
    const handelNavigate=()=>{
        navigate('/inventaire')
    }
  return (
    <Box sx={{height:70, position: 'fixed',bottom: 40, right: 100,}}>
            <Fab color="secondary" aria-label="edit" onClick={handelNavigate}>
        <AddIcon />
      </Fab>
      </Box>

  )
}

export default AddInventaire