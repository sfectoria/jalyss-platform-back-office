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
} from "@mui/material";
import React, { useEffect, useState } from "react";
import Item from "../../../style/ItemStyle";
import Autocomplete from "@mui/material/Autocomplete";
import FileUploader from "../../../components/FileUploader";
import DeleteIcon from "@mui/icons-material/Delete";
import axios from "axios";
import { ip } from "../../../constants/ip";
import { useNavigate } from "react-router-dom";

export default function AddEmployee() {
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

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    phoneNumber: "",
    email: "",
    position: "",
    address: "",
    mediaId: null,
  });

  const navigate = useNavigate();
  const [errors, setErrors] = useState({});
  const [open, setOpen] = useState(false);
  const [isCancelled, setIsCancelled] = useState(false);
  const [uploadedImage, setUploadedImage] = useState(null);

  const positionOptions = ["admin", "manager", "seller"];
  const addressOptions = ["Sfax", "Tunis", "Sousse"];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleDeleteFile = () => {
    setFormData((prevData) => ({
      ...prevData,
      mediaId: null,
    }));
    setUploadedImage(null);
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.firstName) newErrors.firstName = "First Name is required";
    if (!formData.lastName) newErrors.lastName = "Last Name is required";
    if (!formData.phoneNumber) newErrors.phoneNumber = "Phone Number is required";
    if (!formData.email) newErrors.email = "Email is required";
    if (!formData.position) newErrors.position = "Position is required";
    if (!formData.address) newErrors.address = "Address is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    if (file) {
      const imageFormData = new FormData();
      imageFormData.append("image", file);

      try {
        const response = await axios.post("http://localhost:5000/api/upload/image", imageFormData);
        setUploadedImage(URL.createObjectURL(file));
        setFormData((prevData) => ({
          ...prevData,
          mediaId: response.data.id,
        }));
      } catch (error) {
        console.error("Error uploading image:", error);
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      try {
        const response = await axios.post(`${ip}/employees`, formData);
        console.log("Response:", response.data);
        setIsCancelled(false);
        setOpen(true);
        resetForm();
        setTimeout(() => {
          navigate("/employees");
        }, 2000);
      } catch (error) {
        console.error("Error submitting form:", error);
        alert("An error occurred while submitting the form. Please try again.");
      }
    }
  };

  const resetForm = () => {
    setFormData({
      firstName: "",
      lastName: "",
      phoneNumber: "",
      email: "",
      position: "",
      address: "",
      mediaId: null,
    });
    setErrors({});
    setUploadedImage(null); 
  };

  const handleCancel = () => {
    setIsCancelled(true);
    setOpen(true);
    resetForm();
    setTimeout(() => {
      navigate("/employees");
    }, 1000);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Paper elevation={3} sx={{ m: "5%" }}>
        <Box sx={{ padding: 5 }}>
          <Typography variant="h2" color="initial" gutterBottom>
            Employee's Information
          </Typography>
          <form onSubmit={handleSubmit} className="emp-form">
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
                    inputProps={{
                      maxLength: 20,
                    }}
                    value={formData.firstName}
                    onChange={handleInputChange}
                    error={!!errors.firstName}
                    helperText={errors.firstName}
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
                    inputProps={{
                      maxLength: 20,
                    }}
                    value={formData.lastName}
                    onChange={handleInputChange}
                    error={!!errors.lastName}
                    helperText={errors.lastName}
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
                    value={formData.phoneNumber}
                    onChange={handleInputChange}
                    error={!!errors.phoneNumber}
                    helperText={errors.phoneNumber}
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
                    value={formData.email}
                    onChange={handleInputChange}
                    error={!!errors.email}
                    helperText={errors.email}
                  />
                </Item>
              </Grid>
              <Grid item xs={12}>
                <Item elevation={0}>
                  <Autocomplete
                    options={positionOptions}
                    value={formData.position}
                    onChange={(event, newValue) => {
                      setFormData((prev) => ({ ...prev, position: newValue }));
                    }}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="Position"
                        required
                        fullWidth
                        error={!!errors.position}
                        helperText={errors.position}
                      />
                    )}
                  />
                </Item>
              </Grid>
              <Grid item xs={12}>
                <Item elevation={0}>
                  <Autocomplete
                    options={addressOptions}
                    value={formData.address}
                    onChange={(event, newValue) => {
                      setFormData((prev) => ({ ...prev, address: newValue }));
                    }}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="Address"
                        required
                        fullWidth
                        error={!!errors.address}
                        helperText={errors.address}
                      />
                    )}
                  />
                </Item>
              </Grid>
              <Grid item xs={12}>
                <Item elevation={0} sx={{ display: "flex", justifyContent: "start", gap: "14px" }}>
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
              <Grid item xs={12} sx={{ display: "flex", justifyContent: "center" }}>
                <Item elevation={0}>
                  <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                    <Badge
                      overlap="circular"
                      anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
                      badgeContent={
                        <IconButton 
                        onClick={handleDeleteFile} 
                        sx={{ 
                          height: "60px", 
                          width: "60px", 
                          backgroundColor: "red", 
                          "&:hover": {
                            backgroundColor: "red",
                          }
                        }}
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
                        src={uploadedImage}
                      >
                          {!uploadedImage && (
                          <FileUploader onSelectFile={handleFileChange} />
                        )}
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
            bgcolor: isCancelled ? "error.light" : "success.light",
          },
        }}
      >
       <DialogTitle>{isCancelled ? "Cancelled" : "Success"}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            {isCancelled
              ? "The client form has been cancelled."
              : "The client has been successfully added."}
          </DialogContentText>
        </DialogContent>
      </Dialog>
    </ThemeProvider>
  );
}
