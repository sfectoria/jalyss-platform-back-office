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
  Tab,
  Stack,
  Tabs,
  TextField,
  ThemeProvider,
  Typography,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";
import React, { useEffect, useState } from "react";
import Item from "../../../style/ItemStyle";
import { TbArrowBackUp } from "react-icons/tb";
import Tooltip from "@mui/material/Tooltip";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { ip } from "../../../constants/ip";

export default function PublishingHouseDetails() {
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

  const [tabValue, setTabValue] = useState(0);
  const [successAlert, setSuccessAlert] = useState(false);
  const [errorAlert, setErrorAlert] = useState(false);
  const [uploadedImage, setUploadedImage] = useState(null);
  const [errors, setErrors] = useState({});
  const [open, setOpen] = useState(false);
  const [isCancelled, setIsCancelled] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [logoPath, setLogoPath] = useState("");

  const [formData, setFormData] = useState({
    nameAr: "",
    nameEn: "",
    address: "",
    email: "",
    phone_number: null,
    logoId: null,
  });

  useEffect(() => {
    fetchPublishingHouseDetails();
  }, [id]);

  const fetchPublishingHouseDetails = async () => {
    try {
      const response = await axios.get(`${ip}/publishingHouses/${id}`);
      const data = response.data;
      console.log("hna ya mrabet", data);

      setFormData({
        nameAr: data.nameAr || "No Arabic Name",
        nameEn: data.nameEn || "No English Name",
        address: data.address || "No Address Available",
        email: data.email || "No Email Available",
        phone_number: data.phone_number || null,
        logoId: data.logo?.id || null,
      });

      setLogoPath(data.logo?.path || "");
    } catch (error) {
      console.error("Error fetching publishing house details:", error);
      setErrorAlert(true);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: name === "phone_number" ? Number(value) : value,
    }));
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.nameEn) {
      newErrors.nameEn = "Name in English is required";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.phone_number) {
      formData.phone_number = null;
    }
    if (validateForm()) {
      try {
        const response = await axios.patch(`${ip}/publishingHouses/${id}`, {
          ...formData,
          logoId: formData.logoId,
        });
        console.log("Response:", response.data);

        setIsCancelled(false);
        setOpen(true);
        resetForm();
        setTimeout(() => {
          navigate("/articles/publishingHouses");
        }, 2000);

        setSuccessAlert(true);
      } catch (error) {
        console.error("Error saving changes:", error);
        setErrorAlert(true);
      }
    }
  };

  const resetForm = () => {
    setFormData({
      nameAr: "",
      nameEn: "",
      address: "",
      email: "",
      phone_number: null,
      logoId: null,
    });
    setUploadedImage(null);
    setErrors({});
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleEdit = () => {
    setIsEdit(true);
    setTabValue(1);
  };
  const handleDeleteImage = () => {
    setUploadedImage(null);
    setLogoPath("")
    setFormData((prevFormData) => ({
      ...prevFormData,
      logoId: null,
    }));
  };

  const handleCancel = () => {
    setIsEdit(false);
    fetchPublishingHouseDetails();
    setTabValue(0);
    setIsCancelled(true);
    setOpen(true);
    navigate("/articles/publishingHouses");
  };

  const handleFileUpload = async (event) => {
    const file = event.target.files[0];
    if (file) {
      const uploadData = new FormData();
      uploadData.append("image", file);
      try {
        const response = await axios.post(
          "http://localhost:5000/api/upload/image",
          uploadData
        );
        console.log("line181", response.data);
        setUploadedImage(URL.createObjectURL(file));
        setFormData((prevFormData) => ({
          ...prevFormData,
          logoId: response.data.id,
        }));
        console.log("Uploaded image data:", response.data);
      } catch (error) {
        console.error("Error uploading file:", error);
      }
    }
  };

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const retour = () => {
    navigate("/articles/publishingHouses");
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Paper elevation={3} sx={{ m: 2, p: 2 }}>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <Tabs
            value={tabValue}
            onChange={handleTabChange}
            aria-label="publishing house tabs"
          >
            <Tab label="Overview" />
            <Tab label="Edit Profile" />
          </Tabs>
        </Box>

        <TabPanel value={tabValue} index={0}>
  <Box sx={{ display: "flex", justifyContent: "flex-end", mb: 1 }}>
    <Tooltip title="Go Back">
      <Box
        onClick={retour}
        sx={{ cursor: "pointer", display: "inline-flex", alignItems: "center" }}
      >
        <TbArrowBackUp size={40} color="grey" />
      </Box>
    </Tooltip>
  </Box>
  <Box
    sx={{
      display: "flex",
      flexDirection: "row",
      justifyContent: "center",
      alignItems: "center",
      gap: 2,
      mt: "-0.5cm", 
    }}
  >
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 1,
      }}
    >
      <Badge
        overlap="circular"
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      >
        <Avatar
          src={uploadedImage || logoPath}
          sx={{
            width: 100, 
            height: 100,
            bgcolor: "#48184C",
            fontSize: "36px",
          }}
        >
          {!uploadedImage && !logoPath && formData.nameEn?.charAt(0)}
        </Avatar>
      </Badge>
      <Typography variant="h5">{formData.nameEn}</Typography>
      <Typography variant="body1">{formData.nameAr}</Typography>
    </Box>
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 1, 
        textAlign: "center",
      }}
    >
      <Grid container spacing={1}>
        {["address", "email", "phone_number"].map((field) => (
          <Grid item xs={12} key={field}>
            <Typography variant="body2"> 
              <strong>
                {field.charAt(0).toUpperCase() + field.slice(1)}:
              </strong>{" "}
              {formData[field]}
            </Typography>
          </Grid>
        ))}
      </Grid>
    </Box>
  </Box>
</TabPanel>

        <TabPanel value={tabValue} index={1}>
          <form onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={12}>

              <Badge
  overlap="circular"
  anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
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
  <IconButton
    component="label"
    sx={{
      borderRadius: "50%",
      padding: 0,
      width: 100,
      height: 100,
    }}
  >
    <input
      hidden
      accept="image/*"
      type="file"
      onChange={handleFileUpload}
    />
    <Avatar
      src={uploadedImage || logoPath}
      sx={{
        width: 100,
        height: 100,
        bgcolor: "#48184C",
        fontSize: "40px",
        objectFit : "cover"
      }}
    >
      {!uploadedImage && !logoPath && formData.nameEn?.charAt(0)}
    </Avatar>
  </IconButton>
</Badge>



              </Grid>
              {["nameAr", "nameEn", "address", "email", "phone_number"].map(
                (field) => (
                  <Grid item xs={12} key={field}>
                    <TextField
                      fullWidth
                      label={field.charAt(0).toUpperCase() + field.slice(1)}
                      name={field}
                      value={formData[field]}
                      onChange={handleInputChange}
                      error={!!errors[field]}
                      helperText={errors[field]}
                    />
                  </Grid>
                )
              )}
              <Grid item xs={12} display="flex" justifyContent="space-between">
                <Button variant="outlined" onClick={handleCancel}>
                  Cancel
                </Button>
                <Button variant="contained" type="submit" color="primary">
                  Save Changes
                </Button>
              </Grid>
            </Grid>
          </form>
        </TabPanel>
      </Paper>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>
          {isCancelled ? "Changes Canceled" : "Success"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            {isCancelled
              ? "You have canceled the changes."
              : "Publishing House details updated successfully!"}
          </DialogContentText>
        </DialogContent>
      </Dialog>
      <Stack sx={{ width: "100%" }} spacing={2}>
        {successAlert && (
          <Alert severity="success" onClose={() => setSuccessAlert(false)}>
            Publishing House updated successfully!
          </Alert>
        )}
        {errorAlert && (
          <Alert severity="error" onClose={() => setErrorAlert(false)}>
            There was an error updating the Publishing House.
          </Alert>
        )}
      </Stack>
    </ThemeProvider>
  );
}

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}
