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
import FileUploader from "../../../components/FileUploader";
import React, { useState } from "react";
import Item from "../../../style/ItemStyle";
import CheckIcon from "@mui/icons-material/Check";
import DeleteIcon from "@mui/icons-material/Delete";
import CloseIcon from "@mui/icons-material/Close";
import axios from "axios";
import { ip } from "../../../constants/ip";
import { useNavigate } from "react-router-dom";

export default function AddFournisseur() {
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

  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    nameProvider: "",
    email: "",
    registrationNumber: "",
    adresse: "",
    phoneNumber: "",
    mediaId: "",
  });
  const [errors, setErrors] = useState({});
  const [isCancelled, setIsCancelled] = useState(false);
  const [open, setOpen] = useState(false);
  const [uploadedImage, setUploadedImage] = useState("");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const isVerified = () => {
    const { phoneNumber } = formData;
    if (phoneNumber.length !== 8) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        phoneNumber: "Phone number must be 8 digits",
      }));
      return false;
    }
    return true;
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.nameProvider) newErrors.nameProvider = "Company's Name is required";
    if (!formData.phoneNumber) newErrors.phoneNumber = "Phone Number is required";
    if (!formData.adresse) newErrors.adresse = "Address is required";
    if (!formData.registrationNumber) newErrors.registrationNumber = "Registration Number is required";
    if (!formData.email) newErrors.email = "Email is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0 && isVerified();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      try {
        const response = await axios.post(`${ip}/provider`, formData);
        console.log("Response:", response.data);
        setIsCancelled(false);
        setOpen(true);
        setTimeout(() => {
          navigate("/fournisseurs");
        }, 2500);
        resetForm();
      } catch (error) {
        console.error("Error submitting form:", error);
        alert("An error occurred while submitting the form. Please try again.");
      }
    }
  };

  const handleCancel = () => {
    setIsCancelled(true);
    setOpen(true);
    setTimeout(() => {
      navigate("/fournisseurs");
    }, 2500);
    resetForm();
  };

  const resetForm = () => {
    setFormData({
      nameProvider: "",
      email: "",
      registrationNumber: "",
      adresse: "",
      phoneNumber: "",
      mediaId: "",
    });
    setErrors({});
    setUploadedImage(""); 
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleFileUpload = async (event) => {
    const file = event.target.files[0];
    if (file) {
      const formData = new FormData();
      formData.append('image', file);
      try {
        const response = await axios.post(
          "http://localhost:5000/api/upload/image",
          formData
        );
        setUploadedImage(URL.createObjectURL(file));
        setFormData((prevFormData) => ({
          ...prevFormData,
          mediaId: response.data.id,
        }));
      } catch (error) {
        console.error("Error uploading image:", error);
      }
    }
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Paper elevation={3} sx={{ m: "5%" }}>
        <Box sx={{ padding: 5 }}>
          <Typography variant="h4" gutterBottom>
            Add New Fournisseur
          </Typography>
          <form onSubmit={handleSubmit}>
            <Grid container spacing={2} alignItems="flex-start">
              <Grid item xs={12} sm={4}>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    padding: 3,
                  }}
                >
                  <Badge
                    overlap="circular"
                    anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
                    badgeContent={
                      <IconButton
                        id="delete-btn"
                        sx={{ height: "60px", width: "60px" }}
                        onClick={() => setUploadedImage("")} 
                      >
                        <DeleteIcon sx={{ color: "white" }} />
                      </IconButton>
                    }
                  >
                     <Avatar
                        src={uploadedImage}
                        sx={{ width: "200px", height: "200px", bgcolor: "#48184C" }}
                      >
                        <FileUploader setFormData={setFormData} onSelectFile={handleFileUpload} icon={"upload"} />
                      </Avatar>
                  </Badge>
                </Box>
              </Grid>
              <Grid item xs={12} sm={8}>
                <Box sx={{ padding: 3 }}>
                  <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        required
                        fullWidth
                        label="Fournisseur Name"
                        name="nameProvider"
                        onChange={handleInputChange}
                        value={formData.nameProvider}
                        error={!!errors.nameProvider}
                        helperText={errors.nameProvider}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        required
                        fullWidth
                        type="number"
                        label="Phone Number"
                        name="phoneNumber"
                        onChange={handleInputChange}
                        value={formData.phoneNumber}
                        error={!!errors.phoneNumber}
                        helperText={errors.phoneNumber}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        required
                        fullWidth
                        type="email"
                        label="Email"
                        name="email"
                        onChange={handleInputChange}
                        value={formData.email}
                        error={!!errors.email}
                        helperText={errors.email}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        required
                        fullWidth
                        label="Address"
                        name="adresse"
                        onChange={handleInputChange}
                        value={formData.adresse}
                        error={!!errors.adresse}
                        helperText={errors.adresse}
                      />
                    </Grid>
                    <Grid item marginLeft={28} xs={12} sm={6}>
                      <TextField
                        required
                        fullWidth
                        label="Registration Number"
                        name="registrationNumber"
                        onChange={handleInputChange}
                        value={formData.registrationNumber}
                        error={!!errors.registrationNumber}
                        helperText={errors.registrationNumber}
                      />
                    </Grid>
                  </Grid>
                </Box>
              </Grid>
            </Grid>
            <Box mt={4} display="flex" justifyContent="flex-end" gap={2}>
              <IconButton type="submit" color="primary">
                <CheckIcon style={{ color: "#48184C" }} />
              </IconButton>
              <IconButton onClick={handleCancel} style={{ color: "#881337" }}>
                <CloseIcon />
              </IconButton>
            </Box>
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
          <DialogContentText id="alert-dialog-description">
            {isCancelled ? "You have cancelled the action." : "You have added a new Fournisseur successfully."}
          </DialogContentText>
        </DialogContent>
      </Dialog>
    </ThemeProvider>
  );
}
