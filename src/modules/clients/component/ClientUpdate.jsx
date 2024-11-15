import React, { useState, useEffect } from "react";
import {
  Avatar,
  Badge,
  Box,
  Button,
  createTheme,
  Grid,
  IconButton,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  TextField,
  ThemeProvider,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
} from "@mui/material";
import Item from "../../../style/ItemStyle";
import axios from "axios";
import { useParams } from "react-router-dom";
import DeleteIcon from "@mui/icons-material/Delete";
import { ip } from "../../../constants/ip";

const ClientUpdate = ({ setIsEdit, refresh, setRefresh }) => {
  const defaultTheme = createTheme({
    components: {
      MuiTypography: {
        styleOverrides: {
          root: { wordBreak: "break-word" },
        },
      },
    },
  });

  const { id } = useParams();
  const [clientData, setClientData] = useState({
    fullName: "",
    phoneNumber: "",
    address: "",
    email: "",
    idCategoryClient: "",
    mediaId: null,
  });
  const [categories, setCategories] = useState([]);
  const [uploadedImage, setUploadedImage] = useState(null);
  const [open, setOpen] = useState(false);
  const [isCancelled, setIsCancelled] = useState(false);

  useEffect(() => {
    const fetchClientData = async () => {
      try {
        const response = await axios.get(`${ip}/clients/${id}`);
        setClientData(response.data);
        if (response.data.media && response.data.media.path) {
          setUploadedImage(`${response.data.media.path}`);
        }
      } catch (error) {
        alert("There was an error fetching the client data.");
      }
    };

    const fetchCategories = async () => {
      try {
        const response = await axios.get(`${ip}/categoryClients`);
        setCategories(response.data);
      } catch (error) {
        alert("There was an error fetching the categories.");
      }
    };

    fetchClientData();
    fetchCategories();
  }, [id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setClientData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    if (file) {
      const formData = new FormData();
      formData.append("image", file);

      try {
        const response = await axios.post("http://localhost:5000/api/upload/image", formData);
        if (response.data && response.data.path) {
          setUploadedImage(response.data.path);
          setClientData((prevData) => ({
            ...prevData,
            mediaId: response.data.id,
          }));
        } else {
          alert("Failed to retrieve image path from the server.");
        }
      } catch (error) {
        alert("There was an error uploading the file.");
      }
    }
  };

  const handleDeleteImage = () => {
    setUploadedImage(null);
    setClientData((prevData) => ({
      ...prevData,
      mediaId: null,
    }));
  };

  const handleUpdate = async () => {
    try {
      const updatedClientData = {
        fullName: clientData.fullName,
        email: clientData.email,
        phoneNumber: clientData.phoneNumber,
        address: clientData.address,
        idCategoryClient: clientData.idCategoryClient,
        mediaId: clientData.mediaId,
      };
      const response = await axios.patch(`${ip}/clients/${id}`, updatedClientData);

      if (response.status === 200) {
        setRefresh(!refresh);
        setIsEdit(false);
        setIsCancelled(false);
        setOpen(true);
      }
    } catch (error) {
      alert("There was an error updating the client.");
    }
  };

  const handleCancel = () => {
    setIsEdit(false);
    setIsCancelled(true); 
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Paper elevation={3} sx={{ m: "5%", width: "80%" }}>
        <Box sx={{ padding: 5 }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Typography variant="h4" gutterBottom>
                Update Client Info
              </Typography>
            </Grid>
            <Grid item xs={12} md={8}>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    variant="outlined"
                    label="Client Name"
                    name="fullName"
                    value={clientData.fullName}
                    onChange={handleInputChange}
                    size="medium"
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <InputLabel>Category</InputLabel>
                  <Select
                    value={clientData.idCategoryClient}
                    name="idCategoryClient"
                    onChange={handleInputChange}
                    fullWidth
                  >
                    {categories.map((category) => (
                      <MenuItem key={category.id} value={category.id}>
                        {category.name}
                      </MenuItem>
                    ))}
                  </Select>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    variant="outlined"
                    label="Email"
                    name="email"
                    value={clientData.email}
                    onChange={handleInputChange}
                    size="medium"
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    variant="outlined"
                    label="Phone Number"
                    name="phoneNumber"
                    value={clientData.phoneNumber}
                    onChange={handleInputChange}
                    size="medium"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    variant="outlined"
                    label="Address"
                    name="address"
                    value={clientData.address}
                    onChange={handleInputChange}
                    size="medium"
                  />
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={12} md={4}>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  bgcolor: "transparent",
                  borderRadius: 2,
                }}
              >
                <Typography variant="h6" color="#48184C" gutterBottom>
                  Update Author Info
                </Typography>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    position: "relative",
                  }}
                >
                  <Badge
                    overlap="circular"
                    anchorOrigin={{
                      vertical: "bottom",
                      horizontal: "right",
                    }}
                    badgeContent={
                      <IconButton
                        sx={{
                          bgcolor: "#48184C",
                          color: "white",
                          width: "30px",
                          height: "30px",
                          "&:hover": { bgcolor: "#3a143e" },
                        }}
                        onClick={handleDeleteImage}
                      >
                        <DeleteIcon fontSize="small" />
                      </IconButton>
                    }
                  >
                    <label htmlFor="file-upload" style={{ cursor: "pointer" }}>
                      <Avatar
                        src={uploadedImage}
                        sx={{ width: "150px", height: "150px", bgcolor: "#48184C" }}
                      />
                    </label>
                  </Badge>
                </Box>
                <input
                  accept="image/*"
                  style={{ display: "none" }}
                  id="file-upload"
                  type="file"
                  onChange={handleFileUpload}
                />
              </Box>
            </Grid>
            <Grid item xs={12}>
              <Grid container spacing={2} justifyContent="flex-start">
              <Grid item xs={12}>
                <Item
                  elevation={0}
                  sx={{
                    display: "flex",
                    justifyContent: "start",
                    gap: "14px",
                  }}
                >
                  <Button className="confirm-btn" onClick={handleUpdate} variant="contained">
                    Confirm
                  </Button>
                  <Button className="cancel-btn" onClick={handleCancel} variant="contained">
                    Cancel
                  </Button>
                </Item>
              </Grid>
              </Grid>
            </Grid>
          </Grid>
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
};

export default ClientUpdate;
