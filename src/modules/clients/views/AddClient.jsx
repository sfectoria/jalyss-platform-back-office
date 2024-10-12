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

  const [formData, setFormData] = useState({
    fullName: "",
    phoneNumber: "",
    address: "",
    email: "",
    registrationDate: new Date().toISOString(),
    idCategoryClient: 1,
  });

  const [errors, setErrors] = useState({});
  const [open, setOpen] = useState(false);
  const [isCancelled, setIsCancelled] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    const uploadedFile = e.target.files[0];
    setFormData((prevData) => ({
      ...prevData,
      fileName: uploadedFile?.name,
      mediaId: uploadedFile ? URL.createObjectURL(uploadedFile) : null,
    }));
  };

  const handleDeleteFile = () => {
    setFormData((prevData) => ({
      ...prevData,
      fileName: "",
      fileUrl: null,
    }));
  };

  const validateForm = () => {
    let newErrors = {};
    if (!formData.fullName) newErrors.fullName = "First Name is required";
    if (!formData.address) newErrors.address = "Address is required";
    if (!formData.phoneNumber)
      newErrors.phoneNumber = "Phone Number is required";
    else if (formData.phoneNumber.length !== 8)
      newErrors.phoneNumber = "Phone number must be 8 digits";
    if (!formData.email) newErrors.email = "Email is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      try {
        const response = await axios.post(ip + "/clients", formData);
        console.log("Submitted:", response.data);
        setIsCancelled(false);
        setOpen(true);
        resetForm();
      } catch (error) {
        console.error("Error submitting form:", error);
      }
    }
  };

  const resetForm = () => {
    setFormData({
      fullName: "",
      phoneNumber: "",
      address: "",
      email: "",
      registrationDate: new Date().toISOString(),
      idCategoryClient: 1,
    });
    setErrors({});
  };

  const handleCancel = () => {
    setIsCancelled(true);
    setOpen(true);
    resetForm();
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
                    id="firstName"
                    label="Full Name"
                    name="fullName"
                    onChange={handleChange}
                    value={formData.fullName}
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
                    value={formData.address}
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
                    value={formData.phoneNumber}
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
                    onChange={handleChange}
                    value={formData.email}
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
                    variant="contained"
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
                        // src={file}
                        sx={{
                          width: "300px  ",
                          height: "300px",
                          bgcolor: "#48184C",
                        }}
                      >
                        <FileUploader
                          // onSelectFile={handleFileChange}
                          // setFile={setFile}
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
              : "The changes you have made are saved"}
          </DialogContentText>
        </DialogContent>
      </Dialog>
    </ThemeProvider>
  );
}

{
  /* <Grid item xs={12}>
                <Item elevation={0}>
                <TextField
                    required
                    margin="normal"
                    fullWidth
                    id="companyName"
                    label="Company's Name"
                    name="companyName"
                    onChange={handleChange}
                    value={formData.companyName}
                    error={!!errors.companyName}
                    helperText={errors.companyName}
                  />
                </Item>
              </Grid> */
}

{
  /* <Typography
                      variant="h5"
                      color="initial"
                      textAlign={"center"}
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
                      {phoneNumbers}
                    </Typography>
                    <Typography
                      variant="h5"
                      color="initial"
                      sx={{
                        display: "flex",
                        justifyContent: "center",
                      }}
                    >
                      {emails}
                    </Typography> */
}
