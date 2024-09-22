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
import { ip } from "../../../constants/ip";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AddStock = () => {
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

  const stockNames = ["tunis", "sfax", "sousse", "mahdia"];

  const addresses = ["marsa", "sfax", "bou ficha", "mahdia"];

  //handleClose
  const handleClose = () => {
    setOpen(false);
  };

  //handleCancel
  const handleCancel = () => {
    setIsCancelled(true);
    setOpen(true);
  };
  const navigate = useNavigate();

  // // isVerified
  // const isVerified = (form) => {
  //   if (stockNames.includes(form.stockName)) {
  //     setErrors((prev) => ({
  //       ...prev,
  //       stockName: "Stock's name already exists",
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

  // handleStockNameChange
  const [stockName, setStockName] = React.useState("");
  const handleStockNameChange = (event) => {
    setStockName(event.target.value);
  };

  // handleAddressChange
  const [address, setAddress] = React.useState("");
  const handleAddressChange = (event) => {
    setAddress(event.target.value);
  };

  // handleManagerNameChange
  const [managerName, setManagerName] = React.useState("");
  const handleManagerNameChange = (event) => {
    setManagerName(event.target.value);
  };

  // handlemanagerPhoneNumberChange
  const [managerPhoneNumber, setManagerPhoneNumber] = React.useState("");
  const handlemanagerPhoneNumberChange = (event) => {
    setManagerPhoneNumber(event.target.value);
  };

  // errors
  const [errors, setErrors] = React.useState({});

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};

    if (!stockName) newErrors.stockName = "Stock's Name is required";
    if (!address) newErrors.address = "Address is required";
    if (!managerName) newErrors.managerName = "Manager's name is required";
    if (!managerPhoneNumber)
      newErrors.managerPhoneNumber = "Manager's phone number is required";

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      handelAddStock();
      setIsCancelled(false);
      setOpen(true);
    }
  };
  const handelAddStock = async () => {
    let obj = {
      name: stockName,
      location: address,
      capacity: 200,
    };
    const newStock = await axios.post(`${ip}/stocks/createStock`, obj);
    console.log("ggg", newStock.data);

    if (newStock && newStock.status === 201) {
      console.log("navigate ");
      setTimeout(() => {
        navigate("/stock");
      }, 800);
    }
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Paper elevation={3} sx={{ m: "5%" }}>
        <Box sx={{ padding: 5 }}>
          <Typography variant="h2" color="initial" gutterBottom>
            Stock's informations
          </Typography>
          <form onSubmit={handleSubmit} className="emp-form">
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Item elevation={0}>
                  <TextField
                    required
                    margin="normal"
                    fullWidth
                    id="stockName"
                    label="Stock's Name"
                    name="stockName"
                    onChange={handleStockNameChange}
                    inputProps={{
                      maxLength: 20,
                    }}
                    value={stockName}
                    error={!!errors.stockName}
                    helperText={errors.stockName}
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
              <Grid item xs={12}>
                <Item
                  elevation={0}
                  sx={{
                    display: "flex",
                    justifyContent: "start",
                    gap: "14px",
                  }}
                >
                  <Button
                    className="confirm-btn"
                    type="submit"
                    variant="contained"
                  >
                    Confirm
                  </Button>
                  <Button
                    className="cancel-btn"
                    onClick={handleCancel}
                    variant="contined"
                  >
                    Cancel
                  </Button>
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
                      {stockName}
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
                </Item>
              </Grid>
            </Grid>
          </form>
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

export default AddStock;
