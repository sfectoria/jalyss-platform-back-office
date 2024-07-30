import {
  Avatar,
  Badge,
  Box,
  Button,
  createTheme,
  Divider,
  Grid,
  IconButton,
  InputLabel,
  Paper,
  Stack,
  TextField,
  ThemeProvider,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import Item from "../../../style/ItemStyle";
import Autocomplete from "@mui/material/Autocomplete";
import FileUploader from "../../../component/FileUploader";
import { EditNotifications } from "@mui/icons-material";

export default function AddEmployer() {
  const defaultTheme = createTheme();
  const roleData = ["admin", "manager", "seller"];
  const locationData = ["Sfax", "Tunis", "Sousse"];
  const names = ["iyed", "oussema", "khalil", "meycem", "yassmine"];

  const [firstName, setFirstName] = useState("");
  const handleFirstNameChange = (e) => {
    const newValue = e.target.value;
    setFirstName(newValue);
    console.log(newValue);
  };

  const [lastName, setLastName] = useState("");
  const handleLastNameChange = (e) => {
    const newValue = e.target.value;
    setLastName(newValue);
    console.log(newValue);
  };

  const [phoneNumber, setPhoneNumber] = useState("");
  const handlePhoneNumberChange = (e) => {
    const newValue = e.target.value;
    setPhoneNumber(newValue);
    console.log(newValue);
  };

  const [email, setEmail] = useState("");
  const handleEmailChange = (e) => {
    const newValue = e.target.value;
    setEmail(newValue);
    console.log(newValue);
  };

  const [role, setRole] = useState("");
  const handleRoleChange = (e, newValue) => {
    setRole(newValue);
    console.log(newValue);
  };

  const [location, setLocation] = useState("");
  const handleLocationChange = (e, newValue) => {
    setLocation(newValue);
    console.log(newValue);
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Paper elevation={3} sx={{ m: "5%" }}>
        <Box sx={{ padding: 5 }}>
          <Typography variant="h2" color="initial" gutterBottom>
            Employee's informations
          </Typography>
          <form action="" className="emp-form">
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Item elevation={0}>
                  <TextField
                    required
                    margin="normal"
                    fullWidth
                    id="firstName"
                    label="First Name"
                    name="firstName"
                    autoFocus
                    onChange={handleFirstNameChange}
                    inputProps={{
                      maxLength: 20,
                    }}
                    value={firstName}
                  />
                </Item>
              </Grid>

              <Grid item xs={12}>
                <Item elevation={0}>
                  <TextField
                    required
                    margin="normal"
                    fullWidth
                    id="lastName"
                    label="Last Name"
                    name="lastName"
                    autoFocus
                    onChange={handleLastNameChange}
                    inputProps={{
                      maxLength: 20,
                    }}
                    value={lastName}
                  />
                </Item>
              </Grid>
              <Grid item xs={12}>
                <Item elevation={0}>
                  <TextField
                    required
                    type="number"
                    margin="normal"
                    fullWidth
                    id="phoneNumber"
                    label="Phone Number"
                    name="phoneNumber"
                    autoFocus
                    onChange={handlePhoneNumberChange}
                    value={phoneNumber}
                  />
                </Item>
              </Grid>
              <Grid item xs={12}>
                <Item elevation={0}>
                  <TextField
                    required
                    type="email"
                    margin="normal"
                    fullWidth
                    id="email"
                    label="Email"
                    name="email"
                    autoFocus
                    onChange={handleEmailChange}
                    value={email}
                  />
                </Item>
              </Grid>
              <Grid item xs={12}>
                <Item elevation={0}>
                  <Autocomplete
                    onChange={handleRoleChange}
                    sx={{ mt: "1.5%" }}
                    disablePortal
                    id="role"
                    options={roleData}
                    renderInput={(params) => (
                      <TextField
                        value={role}
                        {...params}
                        label="Role"
                        required
                        fullWidth
                      />
                    )}
                  />
                </Item>
              </Grid>
              <Grid item xs={12}>
                <Item elevation={0}>
                  <Autocomplete
                    onChange={handleLocationChange}
                    sx={{ mt: "2%" }}
                    disablePortal
                    id="role"
                    options={locationData}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="Location"
                        required
                        fullWidth
                        value={location}
                      />
                    )}
                  />
                </Item>
              </Grid>
            </Grid>
            <Grid container spacing={2}>
              <Grid
                item
                xs={12}
                sx={{ display: "flex", justifyContent: "center" }}
              >
                <Item elevation={0}>
                  <Badge
                    overlap="circular"
                    anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                    badgeContent={<FileUploader icon={"upload"} />}
                  >
                    <Avatar sx={{ width: "300px  ", height: "300px" }} />
                  </Badge>
                  <Box mt mb>
                    <Typography
                      variant="h5"
                      color="initial"
                      sx={{
                        display: "flex",
                        justifyContent: "center",
                      }}
                    >
                      {firstName}
                    </Typography>
                    <Typography
                      variant="h5"
                      color="initial"
                      sx={{
                        display: "flex",
                        justifyContent: "center",
                      }}
                    >
                      {lastName}
                    </Typography>
                    <Typography
                      variant="h5"
                      color="initial"
                      sx={{
                        display: "flex",
                        justifyContent: "center",
                      }}
                    >
                      {phoneNumber}
                    </Typography>
                    <Typography
                      variant="h5"
                      color="initial"
                      sx={{
                        display: "flex",
                        justifyContent: "center",
                      }}
                    >
                      {email}
                    </Typography>
                    <Typography
                      variant="h5"
                      color="initial"
                      sx={{
                        display: "flex",
                        justifyContent: "center",
                      }}
                    >
                      {role}
                    </Typography>
                    <Typography
                      variant="h5"
                      color="initial"
                      sx={{
                        display: "flex",
                        justifyContent: "center",
                      }}
                    >
                      {location}
                    </Typography>
                  </Box>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-around",
                    }}
                  >
                    <Button
                      variant="contained"
                      sx={{
                        backgroundColor: (theme) => theme.palette.success.light,
                        "&:hover": {
                          backgroundColor: (theme) =>
                            theme.palette.success.main,
                        },
                      }}
                    >
                      Confirm
                    </Button>
                    <Button
                      variant="contained"
                      sx={{
                        backgroundColor: (theme) => theme.palette.error.light,
                        "&:hover": {
                          backgroundColor: (theme) => theme.palette.error.main,
                        },
                      }}
                    >
                      Cancel
                    </Button>
                  </Box>
                </Item>
              </Grid>
            </Grid>
          </form>
        </Box>
      </Paper>
    </ThemeProvider>
  );
}
