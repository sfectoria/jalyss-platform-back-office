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
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import DeleteIcon from "@mui/icons-material/Delete";
import axios from "axios";
import { ip } from "../../../constants/ip";
import FileUploader from "../../../components/FileUploader";

export default function AddPublishingHouse() {
  const navigate = useNavigate();

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
    nameAr: "",
    nameEn: "",
    address: "",
    email: "",
    phone_number: "",
    logoId: null,
  });

  const [errors, setErrors] = useState({});
  const [open, setOpen] = useState(false);
  const [isCancelled, setIsCancelled] = useState(false);
  const [uploadedImage, setUploadedImage] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "phone_number" ? value : value, 
    }));
  };

  const isVerified = () => {
    const { phone_number } = formData;
    if (phone_number && phone_number.length !== 8) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        phone_number: "Phone number must be 8 digits",
      }));
      return false;
    }
    return true;
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.nameEn) newErrors.nameEn = "English Name is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0 && isVerified();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      const submissionData = {
        ...formData,
        phone_number: formData.phone_number
          ? String(formData.phone_number)
          : null,
      };
      try {
        const response = await axios.post(
          `${ip}/publishingHouses/create`,
          submissionData
        );
        console.log("Response:", response.data);
        setIsCancelled(false);
        setOpen(true);
        setTimeout(() => {
          navigate("/articles/publishingHouses");
        }, 2000);
        resetForm();
      } catch (error) {
        console.error("Error submitting form:", error);
        alert("An error occurred while submitting the form. Please try again.");
      }
    }
  };

  const resetForm = () => {
    setFormData({
      nameAr: "",
      nameEn: "",
      address: "",
      phone_number: null,
      email: "",
      logoId: null,
    });
    setUploadedImage(null);
    setErrors({});
  };

  const handleCancel = () => {
    setIsCancelled(true);
    setOpen(true);
    resetForm();
    setTimeout(() => {
      navigate("/articles/publishingHouses");
    }, 100);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleFileUpload = async (event) => {
    const file = event.target.files[0];
    if (file) {
      const formData = new FormData();
      formData.append("image", file);
      const response = await axios.post(
        "http://localhost:5000/api/upload/image",
        formData
      );
      setUploadedImage(URL.createObjectURL(file));
      setFormData((prevFormData) => ({
        ...prevFormData,
        logoId: response.data.id,
      }));
    } else {
      // If no file is selected, reset logoId to null
      setUploadedImage(null);
      setFormData((prevFormData) => ({
        ...prevFormData,
        logoId: null,
      }));
    }
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Paper elevation={3} sx={{ m: "5%" }}>
        <Box sx={{ padding: 5 }}>
          <Typography variant="h3" color="initial" gutterBottom>
            Publishing House Information
          </Typography>
          <form onSubmit={handleSubmit}>
            <Grid item xs={12}>
              <Box sx={{ alignItems: "center", justifyContent: "center" }}>
                <Badge
                  overlap="circular"
                  anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
                  badgeContent={
                    <IconButton
                      sx={{ height: "48px", width: "48px", bgcolor:"red" , "&:hover": { bgcolor: "red" }}}
                      onClick={() => setUploadedImage(null)}
                    >
                      <DeleteIcon sx={{ color: "white"}} />
                    </IconButton>
                  }
                >
                  <Avatar
                    src={uploadedImage}
                    sx={{ width: "150px", height: "150px", bgcolor: "#48184C" }}
                  >
                    <FileUploader
                      setFormData={setFormData}
                      onSelectFile={handleFileUpload}
                      icon={"upload"}
                    />
                  </Avatar>
                </Badge>
              </Box>
            </Grid>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  margin="normal"
                  fullWidth
                  id="nameAr"
                  label="Arabic Name"
                  name="nameAr"
                  value={formData.nameAr}
                  onChange={handleInputChange}
                  error={!!errors.nameAr}
                  helperText={errors.nameAr}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  margin="normal"
                  fullWidth
                  id="nameEn"
                  label="English Name"
                  name="nameEn"
                  value={formData.nameEn}
                  onChange={handleInputChange}
                  error={!!errors.nameEn}
                  helperText={errors.nameEn}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  margin="normal"
                  fullWidth
                  id="address"
                  label="Address"
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  error={!!errors.address}
                  helperText={errors.address}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  margin="normal"
                  fullWidth
                  id="phone_number"
                  label="Phone Number"
                  name="phone_number"
                  type="number"
                  value={formData.phone_number}
                  onChange={handleInputChange}
                  error={!!errors.phone_number}
                  helperText={errors.phone_number}
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
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
              </Grid>

              <Grid
                item
                xs={12}
                sx={{
                  display: "flex",
                  justifyContent: "flex-end",
                  gap: "14px",
                }}
              >
                <Button type="submit" variant="contained">
                  Confirm
                </Button>
                <Button onClick={handleCancel} variant="outlined">
                  Cancel
                </Button>
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
}
