import React from 'react'
import { useLocation } from 'react-router-dom'
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider, styled } from '@mui/material/styles';

export default function StockDetails() {
    const {state}=useLocation()
    const {id}= state
    const lightTheme = createTheme({ palette: { mode: 'light' } });
    
      const Item = styled(Paper)(({ theme }) => ({
        ...theme.typography.body2,
        color: theme.palette.text.secondary,
        lineHeight: '60px',
      }));
  return (
    <Grid    >
    <Grid item  >
    <ThemeProvider theme={lightTheme}>
      <Box
        sx={{
          pt:7,
          bgcolor: 'background.default',
          display: 'grid',
          marginLeft:'20%',
          marginRight:2
        }}
      >   
          <Item sx={{pt:7,pb:1,px:7,borderRadius:10}} elevation={5}>
          <Typography variant="h5" mb={3} gutterBottom sx={{ fontWeight: 'bold' }}>
         Stock / Sfax 1 
        </Typography>
    </Item>
                
         </Box>
       </ThemeProvider>
     </Grid>
 </Grid>
  )
}
