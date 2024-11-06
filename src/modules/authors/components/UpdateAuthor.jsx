import {
  Alert,
  Avatar,
  Badge,
  Box,
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
import DeleteIcon from "@mui/icons-material/Delete";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";
import React, { useEffect, useState } from "react";
import Item from "../../../style/ItemStyle";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { ip } from "../../../constants/ip";

export default function UpdateAuthor({ setIsEdit }) {
  const navigate = useNavigate();
  const { id } = useParams();

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
    biographyAr: "",
    biographyEn: "",
    mediaId: "",
  });

  const [uploadedImage, setUploadedImage] = useState(null);
  const [errors, setErrors] = useState({});
  const [open, setOpen] = useState(false);
  const [isCancelled, setIsCancelled] = useState(false);

  useEffect(() => {
    const fetchAuthorData = async () => {
      try {
        const response = await axios.get(`${ip}/author/${id}`);
        const authorData = response.data;
        setFormData({
          nameAr: authorData.nameAr || "",
          nameEn: authorData.nameEn || "",
          biographyAr: authorData.biographyAr || "",
          biographyEn: authorData.biographyEn || "",
          mediaId: "",
        });
      } catch (error) {
        console.error("Error fetching author data:", error);
      }
    };
    fetchAuthorData();
  }, [id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.nameAr) newErrors.nameAr = "Name in Arabic is required";
    if (!formData.nameEn) newErrors.nameEn = "Name in English is required";
    if (!formData.biographyAr)
      newErrors.biographyAr = "Biography in Arabic is required";
    if (!formData.biographyEn)
      newErrors.biographyEn = "Biography in English is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      try {
        const response = await axios.patch(`${ip}/author/${id}`, formData);
        console.log("Response:", response.data);
        setIsCancelled(false);
        setOpen(true);
        setTimeout(() => {
          navigate("/articles/authors");
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
      biographyAr: "",
      biographyEn: "",
      mediaId: "",
    });
    setUploadedImage(null);
    setErrors({});
  };

  const handleCancel = () => {
    setIsCancelled(true);
    setOpen(true);
    resetForm();
    setIsEdit(false);
    navigate("/articles/authors"); 
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleFileUpload = async (event) => {
    const file = event.target.files[0];
    if (file) {
      const formData = new FormData();
      formData.append("image", file);
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
        console.error("Error uploading file:", error);
      }
    }
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Paper
        elevation={3}
        sx={{
          backgroundColor: "transparent",
          border: "1px solid transparent",
          borderRadius: 2,
          padding: 5,
          width: "1200px",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            bgcolor: "transparent",
            borderRadius: 2,
          }}
        >
          <Typography variant="h2" color="#48184C" gutterBottom>
            Author Information
          </Typography>

          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              marginBottom: 3,
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
                  id="delete-btn"
                  sx={{ height: "60px", width: "60px", bgcolor: "#48184C" }}
                >
                  <DeleteIcon sx={{ color: "white" }} />
                </IconButton>
              }
            >
              <label htmlFor="file-upload" style={{ cursor: "pointer" }}>
                <Avatar
                  src={uploadedImage}
                  sx={{
                    width: "100px",
                    height: "100px",
                    bgcolor: "#48184C",
                  }}
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

          <form
            onSubmit={handleSubmit}
            className="emp-form"
            style={{ backgroundColor: "transparent", width: "100%" }}
          >
            <Grid container spacing={2}>
              {["nameAr", "nameEn", "biographyAr", "biographyEn"].map(
                (field, index) => (
                  <Grid
                    item
                    xs={12}
                    key={index}
                    sx={{ display: "flex", alignItems: "center" }}
                  >
                    <Typography
                      variant="body1"
                      sx={{
                        flex: "0 0 150px",
                        color: "#48184C",
                        marginRight: 2,
                      }}
                    >
                      {field.charAt(0).toUpperCase() + field.slice(1)}:
                    </Typography>
                    <Item elevation={0} sx={{ flexGrow: 1 }}>
                      <TextField
                        required
                        margin="normal"
                        fullWidth
                        id={field}
                        name={field}
                        inputProps={{
                          maxLength: 20,
                        }}
                        value={formData[field]}
                        onChange={handleInputChange}
                        error={!!errors[field]}
                        helperText={errors[field]}
                      />
                    </Item>
                  </Grid>
                )
              )}
              <Grid item xs={12}>
                <Item
                  elevation={0}
                  sx={{
                    display: "flex",
                    justifyContent: "start",
                    gap: "14px",
                  }}
                >
                  <IconButton
                    onClick={handleSubmit}
                    type="submit"
                    sx={{
                      bgcolor: "#48184C",
                      color: "white",
                      "&:hover": {
                        bgcolor: "#48184C",
                      },
                    }}
                  >
                    <CheckIcon />
                  </IconButton>
                  <IconButton
                    onClick={handleCancel}
                    sx={{
                      bgcolor: "error.main",
                      color: "white",
                      "&:hover": {
                        bgcolor: "error.main",
                      },
                    }}
                  >
                    <CloseIcon />
                  </IconButton>
                </Item>
              </Grid>
            </Grid>
          </form>
        </Box>

        <Dialog open={open} onClose={handleClose}>
  <DialogTitle
    sx={{
      bgcolor:["#15803d"], 
      color: "black",
    }}
  >
    {isCancelled ? "Cancelled" : "Update Successful"}
  </DialogTitle>
  <DialogContent>
    <DialogContentText>
      {isCancelled
        ? "The author information update was cancelled."
        : "The author information has been successfully updated."}
    </DialogContentText>
  </DialogContent>
</Dialog>
      </Paper>
    </ThemeProvider>
  );
}