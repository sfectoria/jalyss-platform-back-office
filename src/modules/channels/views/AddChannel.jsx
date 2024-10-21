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
import { useNavigate } from "react-router-dom";
import Autocomplete from '@mui/material/Autocomplete';


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
  const [selectedStock, setSelectedStock] = useState(null);

  const navigate = useNavigate();
  const [stocks, setStocks]= useState([]);
  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    async function fetchCategories() {
      try {
        const response = await axios.get('http://localhost:3000/stocks/getAll');
        setStocks(response.data);
        console.log("hhhhhhh")
      } catch (error) {
        console.error('Erreur lors de la récupération des stock :', error);
      }
    }

    fetchCategories();
  }, []);

  const handleCancel = () => {
    setIsCancelled(true);
    setOpen(true);
  };

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
    console.log("slm");

    if (!channelName) newErrors.channelName = "Stock's Name is required";
    if (!address) newErrors.address = "Address is required";
    if (!managerName) newErrors.managerName = "Manager's name is required";
    if (!managerPhoneNumber)
      newErrors.managerPhoneNumber = "Manager's phone number is required";
    if (!selectedStock) newErrors.selectedStock = "Stock selection is required";

    setErrors(newErrors);
    console.log(newErrors);

    if (Object.keys(newErrors).length === 0) {
      console.log("hey");

      handelAddChannel();
      setIsCancelled(false);
      setOpen(true);
    }
  };

  const handelAddChannel = async () => {
    let obj = {
      name: channelName,
      type: "local",
      region: address,
      idStock: selectedStock ? selectedStock.id : null,
    };
    const newStock = await axios.post(`${ip}/selling/create`, obj);
    console.log("res", newStock);
    if (newStock && newStock.status === 201) {
      console.log("navigate ");
      setTimeout(() => {
        navigate("/channels");
      }, 800);
    }
  };

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
                <Autocomplete
                  options={stocks}
                  getOptionLabel={(option) => option.name || ""}
                  value={selectedStock}
                  onChange={(event, newValue) => setSelectedStock(newValue)}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Select Stock"
                      required
                      margin="normal"
                      fullWidth
                      error={!!errors.selectedStock}
                      helperText={errors.selectedStock}
                    />
                  )}
                />
              </Item>
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
                    onClick={(e) => handelConfirm(e)}
                    sx={{
                      backgroundColor: (theme) => theme.palette.success.light,
                      "&:hover": {
                        backgroundColor: (theme) => theme.palette.success.main,
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
