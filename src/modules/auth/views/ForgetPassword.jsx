import React, { useState } from 'react'
import TextField from '@mui/material/TextField';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import { createTheme, ThemeProvider,styled } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';

const defaultTheme = createTheme();

const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  textAlign: 'center',
  lineHeight: '60px',
}));

const lightTheme = createTheme({ palette: { mode: 'light' } });
export default function ForgetPassword() {

  const [email,setEmail]=useState("")

  const navigate = useNavigate()

  const cancelClicked = ()=>{
    navigate('/')
  }

  const getCodeClicked = ()=>{
    console.log(email);
    navigate('/confirmation-code')
  }

  const handelChange = (event)=>{
    const emailChange = event.target.value
    setEmail(emailChange)
  }


  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
              <CssBaseline />
       <Grid sx={{
        display:'flex',
        justifyContent:'center',
        alignItems:'center',
        marginTop:10
       }}>

        <Grid item
         xs={6}
        key={1}
        >
        <ThemeProvider theme={lightTheme}>
          <Box
            sx={{
              p: 2,
              borderRadius: 2,
              bgcolor: 'background.default',
              display: 'grid',
              gridTemplateColumns: { md: '1fr 1fr' },
              gap: 2,
            }}
          >
            
              <Item key={2} elevation={2}>
              <Box
        sx={{
          marginTop: 2,
          display: 'flex',
          flexDirection: 'column',
          alignItems:'start',
          px:11,
          py:2,
          width:500
        }}
      >
      
        <Typography variant="h6" color="info.main" mb={3} gutterBottom sx={{ fontWeight: 'bold' }}>
         Step 1 
        </Typography>
        <Typography variant="h4" mb={1} sx={{ fontWeight: 'bold' }}>
          Forget Password ?
        </Typography>
        <Typography variant="h6">
          we'll send you reset instructions
        </Typography>
        <Box component="form" noValidate sx={{ mt: 2 }}>
        <TextField 
        label="Email Address "
        name="email"  
        placeholder='Please Enter Your Email Here '
        focused
        sx={{ width:290 }}
        onChange={(event)=>{handelChange(event)}}
        />
        </Box>
        <Box sx={{
          marginTop: 2,
          display: 'flex',
          gap:2
        }} >
        <Button
                    type="submit"
                    variant="outlined"
                    sx={{ mt: 1, mb: 2, width:80 ,borderRadius:6 }}
                    onClick={()=>{cancelClicked()}}
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    variant="contained"
                    sx={{ mt: 1, mb: 2,width:200 ,borderRadius:6 }}
                    onClick={()=>{getCodeClicked()}}
                  >
                    Get Code
                  </Button>
                  </Box>
      </Box>
              </Item>
          </Box> 
        </ThemeProvider>
      </Grid>

  </Grid>
     </Container>
  </ThemeProvider>
   
  )
}
