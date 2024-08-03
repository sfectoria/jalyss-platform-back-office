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

export default function AddEmployee() {
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

  const roleData = ["admin", "manager", "seller"];
  const locationData = ["Sfax", "Tunis", "Sousse"];
  const names = ["iyed", "oussema", "khalil", "meycem", "yassmine"];
  const emails = [
    "iyediyedammari@gmail.com",
    "khalil@gmail.com",
    "oussema@gmail.com",
    "yassmine@gmail.com",
    "meycem@gmail.com",
  ];
  const phoneNumbers = ["12345678", "50712106", "28283596", "87654321"];

  const [firstName, setFirstName] = useState("");
  const handleFirstNameChange = (e) => {
    const newValue = e.target.value;
    setFirstName(newValue);
    console.log(newValue);
  };

  const [lastName, setLastName] = useState("");
  const handleLastNameChange = (e) => {
    const newValue = e.target.value;
    setLastName(newValue);
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

  const [role, setRole] = useState("");
  const handleRoleChange = (e, newValue) => {
    setRole(newValue);
    console.log(newValue);
  };

  const [location, setLocation] = useState("");
  const handleLocationChange = (e, newValue) => {
    setLocation(newValue);
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
    setFirstName("");
    setLastName("");
    setPhoneNumber("");
    setEmail("");
    setRole("");
    setLocation("");
    setFile(null);
    setFileName("");
    setErrors({});
    console.log(form);
  };

  const [errors, setErrors] = useState({});

  const isVerified = (form) => {
    if (names.includes(form.firstName.toLowerCase())) {
      setErrors({ firstName: "First Name already exists" });
      return false;
    }

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

    return true;
  };

  const [form, setForm] = useState({});
  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};

    if (!firstName) newErrors.firstName = "First Name is required";
    if (!lastName) newErrors.lastName = "Last Name is required";
    if (!phoneNumber) newErrors.phoneNumber = "Phone Number is required";
    if (!email) newErrors.email = "Email is required";
    if (!role) newErrors.role = "Role is required";
    if (!location) newErrors.location = "Location is required";

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
      firstName: firstName,
      lastName: lastName,
      phoneNumber: phoneNumber,
      email: email,
      role: role,
      location: location,
      fileName: fileName,
      fileUrl: file,
    });
  }, [firstName, lastName, phoneNumber, email, role, location, fileName, file]);

  const [open, setOpen] = useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Paper elevation={3} sx={{ m: "5%" }}>
        <Box sx={{ padding: 5 }}>
          <Typography variant="h2" color="initial" gutterBottom>
            Employee's informations
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
                    label="First Name"
                    name="firstName"
                    onChange={handleFirstNameChange}
                    inputProps={{
                      maxLength: 20,
                    }}
                    value={firstName}
                    error={!!errors.firstName}
                    helperText={errors.firstName}
                  />
                </Item>
              </Grid>

              <Grid item xs={12}>
                <Item elevation={0}>
                  <TextField
                    required
                    margin="normal"
                    fullWidth
                    id="lastName"
                    label="Last Name"
                    name="lastName"
                    onChange={handleLastNameChange}
                    inputProps={{
                      maxLength: 20,
                    }}
                    value={lastName}
                    error={!!errors.lastName}
                    helperText={errors.lastName}
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
                  <Autocomplete
                    onInputChange={handleRoleChange}
                    inputValue={role}
                    value={role}
                    sx={{ mt: "1.5%" }}
                    disablePortal
                    id="role"
                    options={roleData}
                    isOptionEqualToValue={(option, value) => option === value}
                    // getOptionDisabled={(option) => option === roleData[0]}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="Role"
                        required
                        fullWidth
                        error={!!errors.role}
                        helperText={errors.role}
                      />
                    )}
                  />
                </Item>
              </Grid>
              <Grid item xs={12}>
                <Item elevation={0}>
                  <Autocomplete
                    onInputChange={handleLocationChange}
                    value={location}
                    inputValue={location}
                    sx={{ mt: "2%" }}
                    disablePortal
                    id="role"
                    options={locationData}
                    isOptionEqualToValue={(option, value) => option === value}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="Location"
                        required
                        fullWidth
                        error={!!errors.location}
                        helperText={errors.location}
                      />
                    )}
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
                    <Typography
                      variant="h5"
                      color="initial"
                      sx={{
                        display: "flex",
                        justifyContent: "center",
                      }}
                    >
                      {role}
                    </Typography>
                    <Typography
                      variant="h5"
                      color="initial"
                      sx={{
                        display: "flex",
                        justifyContent: "center",
                      }}
                    >
                      {location}
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
