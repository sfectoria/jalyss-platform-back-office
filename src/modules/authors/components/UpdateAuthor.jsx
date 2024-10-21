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
  import { useNavigate, useParams } from "react-router-dom";
  import FileUploader from "../../../components/FileUploader";
  import DeleteIcon from "@mui/icons-material/Delete";
  import axios from "axios";
  import { ip } from "../../../constants/ip";
  
  export default function UpdateAuthor({ setIsEdit }) {
    const navigate = useNavigate();
    const { id } = useParams();
    console.log("from author", id);
  
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
    });
  
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
      if (!formData.nameAr) newErrors.nameAr = "nameAr is required";
      if (!formData.nameEn) newErrors.nameEn = "nameEn is required";
      if (!formData.biographyAr) newErrors.biographyAr = "biographyAr is required";
      if (!formData.biographyEn) newErrors.biographyEn = "biographyEn is required";
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
            navigate("/author");
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
      });
      setErrors({});
    };
  
    const handleCancel = () => {
      setIsCancelled(true);
      setOpen(true);
      resetForm();
      setIsEdit(false);
    };
  
    const handleClose = () => {
      setOpen(false);
    };
  
    return (
      <ThemeProvider theme={defaultTheme}>
        <Paper elevation={3} sx={{ m: "5%" }}>
          <Box sx={{ padding: 5 }}>
            <Typography variant="h2" color="initial" gutterBottom>
              Author informations
            </Typography>
            <form onSubmit={handleSubmit} className="emp-form">
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <Item elevation={0}>
                    <TextField
                      required
                      margin="normal"
                      fullWidth
                      id="nameAr"
                      label="NameAr"
                      name="nameAr"
                      inputProps={{
                        maxLength: 20,
                      }}
                      value={formData.nameAr}
                      onChange={handleInputChange}
                      error={!!errors.nameAr}
                      helperText={errors.nameAr}
                    />
                  </Item>
                </Grid>
                <Grid item xs={12}>
                  <Item elevation={0}>
                    <TextField
                      required
                      margin="normal"
                      fullWidth
                      id="nameEn"
                      label="NameEn"
                      name="nameEn"
                      inputProps={{
                        maxLength: 20,
                      }}
                      value={formData.nameEn}
                      onChange={handleInputChange}
                      error={!!errors.nameEn}
                      helperText={errors.nameEn}
                    />
                  </Item>
                </Grid>
                <Grid item xs={12}>
                  <Item elevation={0}>
                    <TextField
                      required
                      type="text"
                      margin="normal"
                      fullWidth
                      id="biographyAr"
                      label="BiographyAr"
                      name="biographyAr"
                      value={formData.biographyAr}
                      onChange={handleInputChange}
                      error={!!errors.biographyAr}
                      helperText={errors.biographyAr}
                    />
                  </Item>
                </Grid>
                <Grid item xs={12}>
                  <Item elevation={0}>
                    <TextField
                      required
                      type="text"
                      margin="normal"
                      fullWidth
                      id="biographyEn"
                      label="BiographyEn"
                      name="biographyEn"
                      value={formData.biographyEn}
                      onChange={handleInputChange}
                      error={!!errors.biographyEn}
                      helperText={errors.biographyEn}
                    />
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
                        anchorOrigin={{
                          vertical: "bottom",
                          horizontal: "left",
                        }}
                        badgeContent={
                          <IconButton
                            id="delete-btn"
                            sx={{ height: "60px", width: "60px" }}
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
                          <FileUploader />
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
  