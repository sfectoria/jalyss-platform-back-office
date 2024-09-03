import {
  Box,
  Button,
  createTheme,
  Dialog,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Grid,
  Paper,
  TextField,
  ThemeProvider,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import Item from "../../../style/ItemStyle";
import axios from "axios";
import { ip } from "../../../constants/ip";

const AddChannel = () => {
  const defaultTheme = createTheme({
    components: {
      MuiTypography: {
        styleOverrides: {
          root: {
            wordBreak: "break-word",
          },
        },
      },
    },
  });

  const [open, setOpen] = React.useState(false);
  const [isCancelled, setIsCancelled] = React.useState(false);
  const [channelName, setChannelName] = React.useState("");
  const [address, setAddress] = React.useState("");
  const [managerName, setManagerName] = React.useState("");
  const [managerPhoneNumber, setManagerPhoneNumber] = React.useState("");
  const [errors, setErrors] = React.useState({});


  const handleClose = () => {
    setOpen(false);
  };

  const handleCancel = () => {
    setIsCancelled(true);
    setOpen(true);
  };

  // const isVerified = () => {
  //   if (channelNames.includes(channelName)) {
  //     setErrors((prev) => ({
  //       ...prev,
  //       channelName: "Stock's name already exists",
  //     }));
  //     return false;
  //   }

  //   if (addresses.includes(form.address)) {
  //     setErrors((prev) => ({
  //       ...prev,
  //       address: "Address already exists",
  //     }));
  //     return false;
  //   }
  //   return true;
  // };

  const handleChannelNameChange = (event) => {
    setChannelName(event.target.value);
  };

  const handleAddressChange = (event) => {
    setAddress(event.target.value);
  };


  const handleManagerNameChange = (event) => {
    setManagerName(event.target.value);
  };

  const handlemanagerPhoneNumberChange = (event) => {
    setManagerPhoneNumber(event.target.value);
  };


  const handelConfirm = (e) => {
    e.preventDefault();
    const newErrors = {};
   console.log('slm');
   
    if (!channelName) newErrors.channelName = "Stock's Name is required";
    if (!address) newErrors.address = "Address is required";
    if (!managerName) newErrors.managerName = "Manager's name is required";
    if (!managerPhoneNumber)
      newErrors.managerPhoneNumber = "Manager's phone number is required";

    setErrors(newErrors);
   console.log(newErrors);
   
    if (Object.keys(newErrors).length === 0) {
      console.log('hey');
      
      handelAddChannel()
      setIsCancelled(false);
      setOpen(true);
    }
  };

  const handelAddChannel=async()=>{
    let obj ={
      name:channelName,
      type:'local',
      region:address,
      idStock:4
    }
     const newStock=await axios.post(`${ip}/selling/create`,obj)
     console.log('ggg',newStock.data);
     
  }

  return (
    <ThemeProvider theme={defaultTheme}>
      <Paper elevation={3} sx={{ m: "5%" }}>
        <Box sx={{ padding: 5 }}>
          <Typography variant="h2" color="initial" gutterBottom>
            Channel's informations
          </Typography>
         
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Item elevation={0}>
                  <TextField
                    required
                    margin="normal"
                    fullWidth
                    id="channelName"
                    label="Chaannel's Name"
                    name="channelName"
                    onChange={handleChannelNameChange}
                    inputProps={{
                      maxLength: 20,
                    }}
                    value={channelName}
                    error={!!errors.channelName}
                    helperText={errors.channelName}
                  />
                </Item>
              </Grid>
              <Grid item xs={12}>
                <Item elevation={0}>
                  <TextField
                    required
                    margin="normal"
                    fullWidth
                    id="address"
                    label="Address"
                    name="address"
                    onChange={handleAddressChange}
                    value={address}
                    error={!!errors.address}
                    helperText={errors.address}
                  />
                </Item>
              </Grid>
              <Grid item xs={12}>
                <Item elevation={0}>
                  <TextField
                    required
                    margin="normal"
                    fullWidth
                    id="email"
                    label="Manager Name"
                    name="managerName"
                    onChange={handleManagerNameChange}
                    value={managerName}
                    error={!!errors.managerName}
                    helperText={errors.managerName}
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
                    id="managerPhoneNumber"
                    label="Manager Phone Number"
                    name="managerPhoneNumber"
                    onChange={handlemanagerPhoneNumberChange}
                    value={managerPhoneNumber}
                    error={!!errors.managerPhoneNumber}
                    helperText={errors.managerPhoneNumber}
                  />
                </Item>
              </Grid>
            </Grid>
            <Grid container spacing={2}>
              <Grid
                item
                xs={12}
                sx={{
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                <Item elevation={0}>
                  <Box mt mb>
                    <Typography
                      variant="h5"
                      color="initial"
                      sx={{
                        display: "flex",
                        justifyContent: "center",
                      }}
                    >
                      {channelName}
                    </Typography>
                    <Typography
                      variant="h5"
                      color="initial"
                      sx={{
                        display: "flex",
                        justifyContent: "center",
                      }}
                    >
                      {address}
                    </Typography>
                    <Typography
                      variant="h5"
                      color="initial"
                      sx={{
                        display: "flex",
                        justifyContent: "center",
                      }}
                    >
                      {managerName}
                    </Typography>
                    <Typography
                      variant="h5"
                      color="initial"
                      sx={{
                        display: "flex",
                        justifyContent: "center",
                      }}
                    >
                      {managerPhoneNumber}
                    </Typography>
                  </Box>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      gap: "5%",
                    }}
                  >
                    <Button
                      variant="contained"
                      sx={{
                        backgroundColor: (theme) => theme.palette.error.light,
                        "&:hover": {
                          backgroundColor: (theme) => theme.palette.error.main,
                        },
                      }}
                      onClick={handleCancel}
                    >
                      Cancel
                    </Button>
                    <Button
                      type="submit"
                      variant="contained"
                      onClick={(e)=>handelConfirm(e)}
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
                  </Box>
                </Item>
              </Grid>
            </Grid>
        </Box>
      </Paper>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        sx={{
          "& .MuiPaper-root": {
            borderColor: isCancelled ? "error.main" : "success.main",
            borderWidth: 3,
            borderStyle: "solid",
            bgcolor: isCancelled ? "error.light" : "success.light",
          },
        }}
      >
        <DialogTitle
          id="alert-dialog-title"
          color={"white"}
          sx={{ fontWeight: "bold" }}
        >
          {isCancelled ? "Changes cancelled!" : "Submitted successfully!"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description" color={"white"}>
            {isCancelled
              ? "The changes you have made are not saved"
              : "The changes you have made are saved "}
          </DialogContentText>
        </DialogContent>
      </Dialog>
    </ThemeProvider>
  );
};

export default AddChannel;
