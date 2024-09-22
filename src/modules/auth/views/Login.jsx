import React, { useState, useEffect } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import IconButton from '@mui/material/IconButton';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Alert from '@mui/material/Alert';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../../../store/slices/authSlice'; 

const defaultTheme = createTheme();

const possibleErrors = [
  "Please enter your email address and your password",
  "OOPS, you forgot to enter your Email",
  "OOPS, you forgot to enter your Password",
];

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [errorMsg, setErrorMessage] = useState("");

  const dispatch = useDispatch();
  const error = useSelector((state) => state.auth.error); 

  useEffect(() => {
    if (error) {
      setErrorMessage(error);
    }
  }, [error]);
console.log("error", error)
  const handleSubmit = async (event) => {
    event.preventDefault();
    const info = new FormData(event.currentTarget);
    const email = info.get("email");
    const password = info.get("password");

    if (!email && !password) {
      setErrorMessage(possibleErrors[0]);
    } else if (!email) {
      setErrorMessage(possibleErrors[1]);
    } else if (!password) {
      setErrorMessage(possibleErrors[2]);
    } else {
      await dispatch(login({ email, password }))
      .then((res) => {
        console.log("payload",res.payload);
        if (res.payload === "invalid email" || res.payload === "invalid password") {
          setErrorMessage(res.payload);
        }
      })
    }
  };

  console.log("error",errorMsg)
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (event) => event.preventDefault();

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}></Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            {errorMsg && (
              <Alert severity="error" sx={{ mt: 3, mb: 2 }}>
                {errorMsg}
              </Alert>
            )}
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              error={errorMsg === possibleErrors[1]}
            />
            <FormControl
              margin="normal"
              required
              fullWidth
              variant="outlined"
              error={errorMsg === possibleErrors[2]}
            >
              <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
              <OutlinedInput
                id="outlined-adornment-password"
                type={showPassword ? "text" : "password"}
                name="password"
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
              />
            </FormControl>
            <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
              Sign In
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="/forget-password" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
