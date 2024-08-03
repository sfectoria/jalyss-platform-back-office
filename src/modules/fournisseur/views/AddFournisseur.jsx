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
  Divider,
  Grid,
  IconButton,
  InputLabel,
  Paper,
  Stack,
  TextField,
  ThemeProvider,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import Item from "../../../style/ItemStyle";
import Autocomplete from "@mui/material/Autocomplete";
import FileUploader from "../../../component/FileUploader";
import { EditNotifications } from "@mui/icons-material";
import DeleteIcon from "@mui/icons-material/Delete";

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
  const emails = [
    "iyediyedammari@gmail.com",
    "khalil@gmail.com",
    "oussema@gmail.com",
    "yassmine@gmail.com",
    "meycem@gmail.com",
  ];
  const phoneNumbers = ["12345678", "50712106", "28283596", "87654321"];
  const comapanies = ["maktabat jarir", "attanwir", "molhimon", "dar e salam"];


  const [companyName, setCompanyName] = useState("");
  const handleCompanyNameChange = (e) => {
    const newValue = e.target.value;
    setCompanyName(newValue);
    console.log(newValue);
  };

  const [phoneNumber, setPhoneNumber] = useState("");
  const handlePhoneNumberChange = (e) => {
    const newValue = e.target.value;
    setPhoneNumber(newValue);
    console.log(newValue);
  };

  const [email, setEmail] = useState("");
  const handleEmailChange = (e) => {
    const newValue = e.target.value;
    setEmail(newValue);
    console.log(newValue);
  };

  const [file, setFile] = useState(null);
  const [fileName, setFileName] = useState("");
  const onSelectFileHandler = (e) => {
    const uploadedFile = e.target.files[0];
    setFileName(uploadedFile?.name);
    if (uploadedFile) {
      setFile(URL.createObjectURL(uploadedFile));
    }
  };

  const onDeleteFileHandler = () => {
    setFile(null);
    setFileName("");
  };

  const resetForm = () => {
    
    setCompanyName("");
    setPhoneNumber("");
    setEmail("");
    setFile(null);
    setFileName("");
    setErrors({});
    console.log(form);
  };

  const [errors, setErrors] = useState({});

  const isVerified = (form) => {

    if (phoneNumber.toString().length != 8) {
      setErrors({
        phoneNumber: "Phone number must be 8 digits",
      });
      return false;
    } else if (phoneNumbers.includes(form.phoneNumber)) {
      setErrors({ phoneNumber: "Phone number already exists" });
      return false;
    }

    if (emails.includes(form.email)) {
      setErrors({ email: "Email already exists" });
      return false;
    }

    if (comapanies.includes(form.companyName)) {
      setErrors({ companyName: "Company's Name already exists" });
      return false;
    }

    return true;
  };

  const [form, setForm] = useState({});
  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};

    if (!companyName) newErrors.companyName = "Company's Name is required";
    if (!phoneNumber) newErrors.phoneNumber = "Phone Number is required";
    if (!email) newErrors.email = "Email is required";

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0 && isVerified(form)) {
      console.log(form);
      setIsCancelled(false);
      setOpen(true);
      resetForm();
    }
  };

  const [isCancelled, setIsCancelled] = useState(false);
  const handleCancel = () => {
    setIsCancelled(true);
    setOpen(true);
    resetForm();
  };

  useEffect(() => {
    setForm({
      companyName: companyName,
      phoneNumber: phoneNumber,
      email: email,
      fileName: fileName,
      fileUrl: file,
    });
  }, [ phoneNumber, companyName, email, fileName, file]);

  const [open, setOpen] = useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Paper elevation={3} sx={{ m: "5%" }}>
        <Box sx={{ padding: 5 }}>
          <Typography variant="h2" color="initial" gutterBottom>
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
                    id="companyName"
                    label="Company's Name"
                    name="companyName"
                    onChange={handleCompanyNameChange}
                    inputProps={{
                      maxLength: 20,
                    }}
                    value={companyName}
                    error={!!errors.companyName}
                    helperText={errors.companyName}
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
                    onChange={handlePhoneNumberChange}
                    value={phoneNumber}
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
                    onChange={handleEmailChange}
                    value={email}
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
                          onClick={onDeleteFileHandler}
                        >
                          <DeleteIcon sx={{ color: "white" }} />
                        </IconButton>
                      }
                    >
                      <Badge
                        overlap="circular"
                        anchorOrigin={{
                          vertical: "bottom",
                          horizontal: "right",
                        }}
                        badgeContent={
                          <FileUploader
                            onSelectFile={onSelectFileHandler}
                            setFile={setFile}
                            icon={"upload"}
                          />
                        }
                      >
                        <Avatar
                          src={file}
                          sx={{ width: "300px  ", height: "300px" }}
                        />
                      </Badge>
                    </Badge>
                  </Box>
                  <Box mt mb>
                    <Typography
                      variant="h5"
                      color="initial"
                      sx={{
                        display: "flex",
                        justifyContent: "center",
                      }}
                    >
                      {phoneNumber}
                    </Typography>
                    <Typography
                      variant="h5"
                      color="initial"
                      sx={{
                        display: "flex",
                        justifyContent: "center",
                      }}
                    >
                      {email}
                    </Typography>
                  </Box>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-around",
                    }}
                  >
                    <Button
                      onClick={handleCancel}
                      variant="contained"
                      sx={{
                        backgroundColor: (theme) => theme.palette.error.light,
                        "&:hover": {
                          backgroundColor: (theme) => theme.palette.error.main,
                        },
                      }}
                    >
                      Cancel
                    </Button>
                    <Button
                      type="submit"
                      variant="contained"
                      sx={{
                        backgroundColor: (theme) => theme.palette.success.light,
                        "&:hover": {
                          backgroundColor: (theme) =>
                            theme.palette.success.main,
                        },
                      }}
                    >
                      Confirm
                    </Button>
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
              : "The changes you have made are saved "}
          </DialogContentText>
        </DialogContent>
      </Dialog>
    </ThemeProvider>
  );
}
