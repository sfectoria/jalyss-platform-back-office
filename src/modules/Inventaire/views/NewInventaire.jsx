import { Box, Typography } from '@mui/material'
import React from 'react'
import NewInventaireTable from '../component/NewInventaireTable'

function NewInventaire() {
  return (
    <Box sx={{      
      display: 'flex',
      alignItems:'center',
      flexDirection:'column',
      gap:5
      }}>
      <img src="https://i.imgur.com/oPzHHMB.jpeg" alt="inventaire"  style={{width:'75%',marginTop:25}} />
      <Box sx={{display:'flex',alignContent:'start',width:'75%',pl:10}}>
      <Typography variant='h2' sx={{fontWeight:'bold'}}>
        Inventaire
      </Typography>
      </Box>
      <NewInventaireTable/>
    </Box>
  )
}

export default NewInventaire