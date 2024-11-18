import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Box,
  TextField,
  IconButton,
  Grid,
  Paper,
  Typography,
  Avatar,
  Badge,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  ThemeProvider,
  createTheme,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { ip } from "../../../constants/ip";
import FileUploader from "../../../components/FileUploader";
import DeleteIcon from "@mui/icons-material/Delete";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";

const UpdateArticle = ({ data1, setIsEditMode, isEditMode }) => {

  
  const id = data1.id;
  const [errors, setErrors] = useState({});
  const [isCancelled, setIsCancelled] = useState(false);
  const [open, setOpen] = useState(false);
  const [uploadedImage, setUploadedImage] = useState("");

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
    title: "",
    code: "",
    longDescriptionEn: "",
    articleByAuthor: "",
    articleByPublishingHouse: "",
    coverId: "",
  });

  const navigate = useNavigate();

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
        setUploadedImage(response.data.path); 
        setFormData((prevFormData) => ({
          ...prevFormData,
          coverId: response.data.id, 
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
      coverId: null,
    }));
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.title) newErrors.title = "Title is required";
    if (!formData.articleByAuthor)
      newErrors.articleByAuthor = "Author is required";
    if (!formData.articleByPublishingHouse)
      newErrors.articleByPublishingHouse = "Publishing house is required";
    if (!formData.code) newErrors.code = "Code is required";
    if (!formData.longDescriptionEn)
      newErrors.longDescriptionEn = "Description is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value || "", 
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (validateForm()) {
      try {
        const updatedData = {
          ...formData,
          articleByAuthor: formData.articleByAuthor, 
          articleByPublishingHouse: formData.articleByPublishingHouse,
        };

        console.log("Updated Data:", updatedData); 
        const response = await axios.patch(`${ip}/articles/${id}`, updatedData);
        console.log("Response:", response.data);

        setIsCancelled(false);
        setOpen(true);
        setTimeout(() => {
          navigate("/articles");
        }, 2500);
        resetForm();
      } catch (error) {
        console.error("Error submitting form:", error);
      }
    }
  };
  const handleCancel = () => {
    setIsCancelled(true);
    setOpen(true);
    setTimeout(() => {
      navigate("/articles");
    }, 2500);
    resetForm();
  };

  const resetForm = () => {
    setFormData({
      title: "",
      code: "",
      articleByAuthor: "",
      articleByPublishingHouse: "",
      longDescriptionEn: "",
      cover: null,
    });
    setErrors({});
  };

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    if (data1) {
      setFormData({
        title: data1.title || "",
        code: data1.code || "",
        articleByAuthor:  data1.articleByAuthor.map((e) => e.author.nameAr).join(', '),
        articleByPublishingHouse: data1.articleByPublishingHouse.map((e)=>e.publishingHouse.nameAr).join(', '),
        longDescriptionEn: data1.longDescriptionEn,
        coverId: data1.cover?.path || "",
      });
      setUploadedImage(data1.cover?.path || "");
    }
  }, [data1]);
  
  
  

  return (
    <ThemeProvider theme={defaultTheme}>
      <Paper elevation={3} sx={{ m: "5%", width: "80%" }}>
        <Box sx={{ padding: 5 }}>
          <Typography variant="h4" gutterBottom sx={{ color: "#48184C" }}>
            Update Article Info
          </Typography>
          <form onSubmit={handleSubmit}>
            <Grid container spacing={2} alignItems="flex-start">
              <Grid item xs={12} sm={4}>
                <Box
                  sx={{ display: "flex", justifyContent: "center", padding: 3 }}
                >
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
                        <DeleteIcon sx={{ height: "30px", width: "30px" }} />
                      </IconButton>
                    }
                  >
                    <label htmlFor="file-upload" style={{ cursor: "pointer" }}>
                      <Avatar
                        src={uploadedImage}
                        sx={{
                          width: "200px",
                          height: "200px",
                          bgcolor: "#48184C",
                        }}
                      >
                        <FileUploader
                          setFormData={setFormData}
                          onSelectFile={handleFileUpload}
                          icon={"upload"}
                        />
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
                        label="Title"
                        name="title"
                        onChange={handleInputChange}
                        value={formData.title}
                        error={!!errors.title}
                        helperText={errors.title}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        required
                        fullWidth
                        label="Author"
                        name="articleByAuthor"
                        onChange={handleInputChange}
                        value={formData.articleByAuthor}
                        error={!!errors.articleByAuthor}
                        helperText={errors.articleByAuthor}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        required
                        fullWidth
                        label="Publishing House"
                        name="articleByPublishingHouse"
                        onChange={handleInputChange}
                        value={formData.articleByPublishingHouse}
                        error={!!errors.articleByPublishingHouse}
                        helperText={errors.articleByPublishingHouse}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        required
                        fullWidth
                        label="Code"
                        name="code"
                        onChange={handleInputChange}
                        value={formData.code}
                        error={!!errors.code}
                        helperText={errors.code}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        required
                        fullWidth
                        multiline
                        rows={4}
                        label="Long Description"
                        name="longDescriptionEn"
                        onChange={handleInputChange}
                        value={formData.longDescriptionEn}
                        error={!!errors.longDescriptionEn}
                        helperText={errors.longDescriptionEn}
                      />
                    </Grid>
                  </Grid>
                </Box>
              </Grid>
            </Grid>
            <Box mt={4} display="flex" justifyContent="flex-end" gap={2}>
              <IconButton type="submit" sx={{ bgcolor: "#48184C", color: "white" }}>
                <CheckIcon />
              </IconButton>
              <IconButton onClick={handleCancel} sx={{ bgcolor: "gray", color: "white" }}>
                <CloseIcon />
              </IconButton>
            </Box>
          </form>
        </Box>
      </Paper>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>{isCancelled ? "Cancelled" : "Article Updated"}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            {isCancelled
              ? "The update process has been cancelled."
              : "The article has been successfully updated."}
          </DialogContentText>
        </DialogContent>
      </Dialog>
    </ThemeProvider>
  );
};

export default UpdateArticle;




  // const handleFileUpload = async (event) => {
  //   const file = event.target.files[0];
  //   if (file) {
  //     const formData = new FormData();
  //     formData.append("image", file);
  //     try {
  //       const response = await axios.post("http://localhost:5000/api/upload/image", formData);
  //       setUploadedImage(response.data.path);
  //       setFile(file);
  //     } catch (error) {
  //       console.error("Error uploading image:", error);
  //       setErrorAlert(true);
  //     }
  //   }
  // };

  // const handleUpdate = async () => {
  //   try {
  //     const updatedArticle = {
  //       title,
  //       code: barcode,
  //       longDescriptionEn: description,
  //       articleByAuthor: authorText ? [{ nameAr: authorText }] : [],
  //       articleByPublishingHouse: publisherText ? [{ nameAr: publisherText }] : [],
  //       articleByCategory: selectedCategories,
  //     };

  //     const formData = new FormData();
  //     formData.append("article", JSON.stringify(updatedArticle));
  //     if (file) {
  //       formData.append("avatar", file);
  //     }

  //     const response = await axios.patch(`${ip}/articles/${id}`, formData, {
  //       headers: { "Content-Type": "multipart/form-data" },
  //     });

  //     if (response.status === 200) {
  //       setSuccessAlert(true);
  //       setErrorAlert(false);
  //       setTimeout(() => navigate("/articles"), 2500);
  //     } else {
  //       setErrorAlert(true);
  //       setSuccessAlert(false);
  //     }
  //   } catch (error) {
  //     setErrorAlert(true);
  //     setSuccessAlert(false);
  //     console.error("Error updating article:", error);
  //   }
  // };

  // const removeImage = () => {
  //   setUploadedImage("");
  //   setFile(null);
  // };