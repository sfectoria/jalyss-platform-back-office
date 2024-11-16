import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Box, TextField, IconButton, Grid, Paper, Typography, Avatar, Badge, Dialog, DialogTitle, DialogContent, DialogContentText, ThemeProvider, createTheme } from '@mui/material';
import { ip } from '../../../constants/ip';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import DeleteIcon from '@mui/icons-material/Delete';
import { useNavigate } from 'react-router-dom';
import FileUploader from "../../../components/FileUploader";

export default function UpdateFournisseur({ oneFournisseur }) {
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
    nameProvider: "",
    email: "",
    registrationNumber: "",
    adresse: "",
    phoneNumber: "",
    mediaId: oneFournisseur?.mediaId || null,
  });

  const [errors, setErrors] = useState({});
  const [isCancelled, setIsCancelled] = useState(false);
  const [open, setOpen] = useState(false);
  const [uploadedImage, setUploadedImage] = useState(""); 
  const navigate = useNavigate();

  useEffect(() => {
    if (oneFournisseur) {
      setFormData({
        nameProvider: oneFournisseur.nameProvider || "",
        email: oneFournisseur.email || "",
        registrationNumber: oneFournisseur.registrationNumber || "",
        adresse: oneFournisseur.adresse || "",
        phoneNumber: oneFournisseur.phoneNumber || "",
        mediaId: oneFournisseur.Media?.path || "", 
      });
      setUploadedImage(oneFournisseur.Media?.path || ""); 
    }
  }, [oneFournisseur]);

  const handleFileUpload = async (event) => {
    const file = event.target.files[0];
    if (file) {
      const formData = new FormData();
      formData.append('image', file);
      try {
        const response = await axios.post("http://localhost:5000/api/upload/image", formData);
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

  const removeImage = () => {
    setUploadedImage(null);
    setFormData((prevFormData) => ({
      ...prevFormData,
      mediaId: null,
    }));
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.nameProvider) newErrors.nameProvider = "Company's Name is required";
    if (!formData.phoneNumber) newErrors.phoneNumber = "Phone Number is required";
    if (!formData.adresse) newErrors.adresse = "Address is required";
    if (!formData.registrationNumber) newErrors.registrationNumber = "Registration Number is required";
    if (!formData.email) newErrors.email = "Email is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      try {
        const response = await axios.patch(`${ip}/provider/${oneFournisseur.id}`, formData);
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
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Paper elevation={3} sx={{ m: "5%", width: "80%" }}>
        <Box sx={{ padding: 5 }}>
          <Typography variant="h4" gutterBottom sx={{color:"#48184C"}}>
            Update Fournisseur Info
          </Typography>
          <form onSubmit={handleSubmit}>
            <Grid container spacing={2} alignItems="flex-start">
              <Grid item xs={12} sm={4}>
                <Box sx={{ display: "flex", justifyContent: "center", padding: 3 }}>
                  <Badge
                    overlap="circular"
                    anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
                    badgeContent={
                      <IconButton
                        sx={{
                          bgcolor: "red",
                          color: "white",
                          width: "60px",
                          height: "60px",
                          "&:hover": { bgcolor: "red" },
                        }}
                        onClick={removeImage}
                      >
                        <DeleteIcon sx={{height:"30px",width:"30px"}}/>
                      </IconButton>
                    }
                  >
                    <label htmlFor="file-upload" style={{ cursor: "pointer" }}>
                    <Avatar
                      src={uploadedImage}
                      sx={{ width: "200px", height: "200px", bgcolor: "#48184C" }}
                    >
                      <FileUploader setFormData={setFormData} onSelectFile={handleFileUpload} icon={"upload"} />
                    </Avatar>
                    </label>
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
                    <Grid item xs={12} sm={6}>
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
        sx={{
          "& .MuiDialog-paper": {
            backgroundColor: isCancelled ? "#f44336" : "#4caf50",
            color: "white",
          },
        }}
      >
        <DialogTitle>{isCancelled ? "Operation Canceled" : "Update Successful"}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            {isCancelled
              ? "You have canceled the update operation."
              : "The client information has been successfully updated."}
          </DialogContentText>
        </DialogContent>
      </Dialog>
    </ThemeProvider>
  );
}
