import {
  Alert,
  Avatar,
  Badge,
  Box,
  Button,
  createTheme,
  Dialog,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Grid,
  IconButton,
  Paper,
  TextField,
  ThemeProvider,
  Typography,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
} from "@mui/material";
import FileUploader from "../../../components/FileUploader";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Item from "../../../style/ItemStyle";
import DeleteIcon from "@mui/icons-material/Delete";
import { ip } from "../../../constants/ip";
import axios from "axios";

export default function AddClient() {
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
const navigate = useNavigate()
  const [clientData, setClientData] = useState({
    fullName: "",
    phoneNumber: "",
    address: "",
    email: "",
    registrationDate: new Date().toISOString(),
    idCategoryClient: "",
  });

  const [errors, setErrors] = useState({});
  const [open, setOpen] = useState(false);
  const [isCancelled, setIsCancelled] = useState(false);
  const [categories, setCategories] = useState([]);

  const handleFileChange = (e) => {
    const uploadedFile = e.target.files[0];
    setClientData((prevData) => ({
      ...prevData,
      fileName: uploadedFile?.name,
      mediaId: uploadedFile ? URL.createObjectURL(uploadedFile) : null,
    }));
  };

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(`${ip}/categoryClients`);
        setCategories(response.data);
      } catch (error) {
        console.error("Error fetching categories:", error);
        alert("There was an error fetching the categories.");
      }
    };

    fetchCategories();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setClientData({
      ...clientData,
      [name]: value,
    });
  };

  const handleDeleteFile = () => {
    setClientData((prevData) => ({
      ...prevData,
      fileName: "",
      mediaId: null,
    }));
  };

  const validateForm = () => {
    let newErrors = {};
    if (!clientData.fullName) newErrors.fullName = "First Name is required";
    if (!clientData.address) newErrors.address = "Address is required";
    if (!clientData.phoneNumber)
      newErrors.phoneNumber = "Phone Number is required";
    else if (clientData.phoneNumber.length !== 8)
      newErrors.phoneNumber = "Phone number must be 8 digits";
    if (!clientData.email) newErrors.email = "Email is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      try {
        const response = await axios.post(ip + "/clients", clientData);
        console.log("Submitted:", response.data);
        setIsCancelled(false);
        setOpen(true);
        resetForm();
        setTimeout(() => {
          navigate("/clients")
        }, 2000);
      } catch (error) {
        console.error("Error submitting form:", error);
      }
    }
  };

  const resetForm = () => {
    setClientData({
      fullName: "",
      phoneNumber: "",
      address: "",
      email: "",
      registrationDate: new Date().toISOString(),
      idCategoryClient: "",
    });
    setErrors({});
  };

  const handleCancel = () => {
    setIsCancelled(true);
    setOpen(true);
    resetForm();
    setTimeout(() => {
      navigate('/clients')
    }, 1000);
  };

  const handleClose = () => {
    setOpen(false);
  
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Paper elevation={3} sx={{ m: "5%" }}>
        <Box sx={{ padding: 5 }}>
          <Typography variant="h2" gutterBottom>
            Client's informations
          </Typography>
          <form onSubmit={handleSubmit} className="emp-form">
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Item elevation={0}>
                  <TextField
                    required
                    margin="normal"
                    fullWidth
                    id="fullName"
                    label="Full Name"
                    name="fullName"
                    onChange={handleChange}
                    value={clientData.fullName}
                    error={!!errors.fullName}
                    helperText={errors.fullName}
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
                    onChange={handleChange}
                    value={clientData.address}
                    error={!!errors.address}
                    helperText={errors.address}
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
                    onChange={handleChange}
                    value={clientData.phoneNumber}
                    error={!!errors.phoneNumber}
                    helperText={errors.phoneNumber}
                  />
                </Item>
              </Grid>

              <Grid item xs={12} sm={6}>
                <FormControl fullWidth>
                  <InputLabel>Category</InputLabel>
                  <Select
                    value={clientData.idCategoryClient}
                    name="idCategoryClient"
                    onChange={handleChange}
                  >
                    {categories.map((category) => (
                      <MenuItem key={category.id} value={category.id}>
                        {category.name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
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
                    onChange={handleChange}
                    value={clientData.email}
                    error={!!errors.email}
                    helperText={errors.email}
                  />
                </Item>
              </Grid>

              <Grid item xs={12}>
                <Item elevation={0}>
                  <Alert severity="info">
                    Choosing a profile picture is optional.
                  </Alert>
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
                  <Button className="confirm-btn" type="submit" variant="contained">
                    Confirm
                  </Button>
                  <Button className="cancel-btn" onClick={handleCancel} variant="contained">
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
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <Badge
                      overlap="circular"
                      anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
                      badgeContent={
                        <IconButton
                          id="delete-btn"
                          sx={{ height: "60px", width: "60px" }}
                          onClick={handleDeleteFile}
                        >
                          <DeleteIcon sx={{ color: "white" }} />
                        </IconButton>
                      }
                    >
                      <Avatar
                        sx={{
                          width: "300px",
                          height: "300px",
                          bgcolor: "#48184C",
                        }}
                      >
                        <FileUploader
                          onSelectFile={handleFileChange}
                          icon={"upload"}
                        />
                      </Avatar>
                    </Badge>
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
            bgcolor: isCancelled ? "error.main" : "success.main",
          },
        }}
      >
        <DialogTitle id="alert-dialog-title">
          {isCancelled ? "Form Cancelled" : "Form Submitted"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {isCancelled
              ? "The form was cancelled and no data was submitted."
              : "The form was successfully submitted."}
          </DialogContentText>
        </DialogContent>
      </Dialog>
    </ThemeProvider>
  );
}
