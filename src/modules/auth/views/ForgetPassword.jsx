import React from 'react'
import TextField from '@mui/material/TextField';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const defaultTheme = createTheme();

export default function ForgetPassword() {
  const handleSubmit = (event) => {
    event.preventDefault();
    const info = new FormData(event.currentTarget);
    console.log({
      email: info.get('email'),
      password: info.get('password'),
    });
  };

  return (
    <ThemeProvider theme={defaultTheme}>
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Typography component="h1" variant="h5">
          we will send you the code in this email ouss***********14@gmail.com
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 5 }}>
        <TextField 
        label="Code "
        name="code"  
        placeholder='XXXX'
       focused
                   
        />
        </Box>
      </Box>
    </Container>
  </ThemeProvider>
   
  )
}
