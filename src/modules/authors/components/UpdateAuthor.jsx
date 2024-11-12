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
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { ip } from "../../../constants/ip";

export default function UpdateAuthor({ setIsEdit, setIsEditMode }) {
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
    mediaId: null,
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
          mediaId: authorData.mediaId || null,
        });

        if (authorData.Media?.path) {
          setUploadedImage(authorData.Media.path);
        }
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
        const updatedData = { ...formData };
        if (!uploadedImage) {
          updatedData.mediaId = null;
        }
        await axios.patch(`${ip}/author/${id}`, updatedData);
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
      mediaId: null,
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
        setUploadedImage(URL.createObjectURL(file)); // Update state with the selected file URL
        setFormData((prevFormData) => ({
          ...prevFormData,
          mediaId: response.data.id,
        }));
      } catch (error) {
        console.error("Error uploading file:", error);
      }
    }
  };

  const handleDeleteImage = () => {
    setUploadedImage(null);
    setFormData((prevFormData) => ({
      ...prevFormData,
      mediaId: null,
    }));
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Paper
        elevation={3}
        sx={{
          backgroundColor: "transparent",
          border: "1px solid #ddd",
          borderRadius: 2,
          padding: { xs: 3, sm: 5 },
          maxWidth: "800px",
          margin: "0 auto",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            bgcolor: "transparent",
            borderRadius: 2,
          }}
        >
          <Typography variant="h4" color="#48184C" gutterBottom>
            Author Information
          </Typography>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              marginBottom: 3,
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
                  src={uploadedImage} // Show existing image
                  sx={{
                    width: 80,
                    height: 80,
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

          <form onSubmit={handleSubmit} style={{ width: "100%" }}>
            <Grid container spacing={2}>
              {["nameAr", "nameEn", "biographyAr", "biographyEn"].map(
                (field, index) => (
                  <Grid item xs={12} key={index}>
                    <Typography
                      variant="body2"
                      sx={{
                        color: "#48184C",
                        fontWeight: "bold",
                        marginBottom: 0.5,
                      }}
                    >
                      {field.charAt(0).toUpperCase() + field.slice(1)}:
                    </Typography>
                    <TextField
                      fullWidth
                      id={field}
                      name={field}
                      inputProps={{ maxLength: 50 }}
                      value={formData[field]}
                      onChange={handleInputChange}
                      error={!!errors[field]}
                      helperText={errors[field]}
                      sx={{
                        "& .MuiOutlinedInput-root": {
                          borderRadius: 2,
                          bgcolor: "white",
                        },
                      }}
                    />
                  </Grid>
                )
              )}
              <Grid item xs={12}>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "flex-end",
                    gap: 2,
                    marginTop: 2,
                  }}
                >
                  <IconButton
                    onClick={handleSubmit}
                    type="submit"
                    sx={{
                      bgcolor: "#48184C",
                      color: "white",
                      "&:hover": { bgcolor: "#3a143e" },
                    }}
                  >
                    <CheckIcon />
                  </IconButton>
                  <IconButton
                    onClick={handleCancel}
                    sx={{
                      bgcolor: "error.main",
                      color: "white",
                      "&:hover": { bgcolor: "error.dark" },
                    }}
                  >
                    <CloseIcon />
                  </IconButton>
                </Box>
              </Grid>
            </Grid>
          </form>
        </Box>

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
          {isCancelled ? "Changes cancelled!" : "Updated successfully!"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description" color={"white"}>
            {isCancelled
              ? "The changes you have made are not saved"
              : "The changes you have made are saved "}
          </DialogContentText>
        </DialogContent>
      </Dialog>
      </Paper>
    </ThemeProvider>
  );
}