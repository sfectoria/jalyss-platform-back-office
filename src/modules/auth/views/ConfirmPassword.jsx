import React, { useState } from 'react'
import TextField from '@mui/material/TextField';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import Alert from '@mui/material/Alert';
import { createTheme, ThemeProvider,styled } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';

const defaultTheme = createTheme();

const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  textAlign: 'center',
  lineHeight: '60px',
}));

const possibelErrors= ['Please confirm your password',"Passwords do not match","Please enter your new password",""]

const lightTheme = createTheme({ palette: { mode: 'light' } });
export default function ConfirmPassword() {

  const [email,setEmail]=useState("")
  const [step,setStep]=useState(1)
  const [pass,setPass]=useState("")
  const [coPass,setCoPass]=useState("")
  const [showPassword, setShowPassword] = useState(false);
  const [errorMsg,setErrorMessage] = useState('')


  const navigate = useNavigate()

  const getClicked = ()=>{
    console.log(pass);
    if (pass===""){
      setErrorMessage(possibelErrors[2])
    }
    else if (coPass===""){
      setErrorMessage(possibelErrors[0])
    }
    else if (pass!==coPass){
      setErrorMessage(possibelErrors[1])
    }
    else {
      navigate('/')
    }
  
  }


  const handleClickShowPassword = () => setShowPassword((show) =>
  !show);

 const handleMouseDownPassword = (event) => {
   event.preventDefault();
 };

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
         Step 3
        </Typography>
        <Typography variant="h4" mb={1} sx={{ fontWeight: 'bold' }}>
          Password reset 
        </Typography>
        <Typography variant="h6">
        Create and confirm your password .
        </Typography>
        {errorMsg&&<Alert severity="error" sx={{ mt:1 ,width:325 }} >{errorMsg}</Alert>}
        <Box component="form"  noValidate sx={{ mt: 1,width:325 }}>
        {errorMsg!==possibelErrors[0]?<FormControl
                  margin="normal"
                  required
                  fullWidth
                  type="password"
                  id="password"
                  autoComplete="current-password"
                  variant="outlined"
                     >
                      <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
                      <OutlinedInput 
                      defaultValue={pass}
                      onChange={(event)=>{setPass(event.target.value)}}
                      id="outlined-adornment-password"
                      type={showPassword ? 'text' : 'password'}
                      endAdornment={
                      <InputAdornment position="end">
                      <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                  edge="end"
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
            label="Password"
            name="password"
          />
        </FormControl>:<FormControl
                error
                  margin="normal"
                  required
                  fullWidth
                  type="password"
                  id="password"
                  autoComplete="current-password"
                  variant="outlined"
                  
                     >
                      <InputLabel  htmlFor="outlined-adornment-password">Password</InputLabel>
                      <OutlinedInput
                      defaultValue={pass}
                      onChange={(event)=>{setPass(event.target.value)}}
                      id="outlined-adornment-password"
                      type={showPassword ? 'text' : 'password'}
                      endAdornment={
                      <InputAdornment position="end">
                      <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                  edge="end"
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
            label="Password"
            name="password"
          />
        </FormControl>}
        {errorMsg!==possibelErrors[1]?<FormControl
                  margin="normal"
                  required
                  fullWidth
                  type="password"
                  id="password"
                  autoComplete="current-password"
                  variant="outlined"
                     >
                      <InputLabel htmlFor="outlined-adornment-password">Confirmation</InputLabel>
                      <OutlinedInput 
                     defaultValue={coPass}
                     onChange={(event)=>{setCoPass(event.target.value)}}
                      id="outlined-adornment-password"
                      type={showPassword ? 'text' : 'password'}
                      endAdornment={
                      <InputAdornment position="end">
                      <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                  edge="end"
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
            label="Password"
            name="password"
          />
        </FormControl>:<FormControl
                error
                  margin="normal"
                  required
                  fullWidth
                  type="password"
                  id="password"
                  autoComplete="current-password"
                  variant="outlined"
                  
                     >
                      <InputLabel  htmlFor="outlined-adornment-password">Confirmation</InputLabel>
                      <OutlinedInput
                      defaultValue={coPass}
                      onChange={(event)=>{setCoPass(event.target.value)}}
                      id="outlined-adornment-password"
                      type={showPassword ? 'text' : 'password'}
                      endAdornment={
                      <InputAdornment position="end">
                      <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                  edge="end"
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
            label="Password"
            name="password"
          />
        </FormControl>}
        </Box>
        <Box sx={{
          marginTop: 2,
          display: 'flex',
          justifyContent:"center",
          width:310
        }} >
                  <Button
                    type="submit"
                    variant="contained"
                    sx={{ mt: 1, mb: 2,width:200 ,borderRadius:6 }}
                    onClick={()=>getClicked()}
                  >
                    bla bla
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
