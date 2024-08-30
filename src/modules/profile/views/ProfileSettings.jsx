import {
  Box,
  createTheme,
  FormControl,
  InputLabel,
  ThemeProvider,
  Typography,
  TextField,
  OutlinedInput,
  InputAdornment,
  IconButton,
  Stack,
  Button,
  Badge,
  FormHelperText,
} from "@mui/material";

import Divider from "@mui/material/Divider";

import Avatar from "@mui/material/Avatar";

import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import React, { useEffect, useState } from "react";
import Grid from "@mui/material/Unstable_Grid2";
import Item from "../../../style/ItemStyle";
import FileUploader from "../../../components/FileUploader";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

const ProfileSettings = () => {
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

  const [showPassword, setShowPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [file, setFile] = useState(null);
  const [fileName, setFileName] = useState("");
  const [username, setUsername] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const [open, setOpen] = React.useState(false);
  const [isCancelled, setIsCancelled] = useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  const resetForm = () => {
    setUsername("");
    setCurrentPassword("");
    setNewPassword("");
    setFile(null);
    setFileName("");
    setErrors({});
  };

  const [errors, setErrors] = useState({});
  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};

    if (!currentPassword)
      newErrors.currentPassword = "Current password is required";
    setErrors(newErrors);
    if (Object.keys(newErrors).length === 0) {
      console.log(form);
      setIsCancelled(false);
      setOpen(true);
      resetForm();
    }
  };

  const handleCancel = () => {
    setIsCancelled(true);
    setOpen(true);
    resetForm();
  };

  const [form, setForm] = useState({});

  useEffect(() => {
    setForm({
      username: username,
      currentPassword: currentPassword,
      newPassword: newPassword,
      fileName: fileName,
      fileUrl: file,
    });
  }, [username, currentPassword, newPassword, fileName, file]);

  const onSelectFileHandler = (e) => {
    const uploadedFile = e.target.files[0];
    setFileName(uploadedFile?.name);
    if (uploadedFile) {
      setFile(URL.createObjectURL(uploadedFile));
    }
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Box m={10}>
        <Grid container spacing={2}>
          <Grid xs={8}>
            <Item
              sx={{
                padding: 5,
              }}
            >
              <Typography variant="h2" color="initial">
                Settings
              </Typography>
              <Box>
                <form>
                  <TextField
                    margin="normal"
                    fullWidth
                    id="username"
                    label="Username"
                    name="username"
                    autoComplete="username"
                    autoFocus
                    onChange={(e) => {
                      setUsername(e.target.value);
                      // console.log(e.target.value);
                    }}
                    inputProps={{
                      maxLength: 20,
                    }}
                    value={username}
                  />
                  <FormControl
                    margin="normal"
                    fullWidth
                    required
                    error={!!errors.currentPassword}
                    variant="outlined"
                  >
                    <TextField
                      required
                      value={currentPassword}
                      onChange={(event) => {
                        setCurrentPassword(event.target.value);
                      }}
                      id="currentPassword"
                      type={showPassword ? "text" : "password"}
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">
                            <IconButton
                              onClick={() => setShowPassword((show) => !show)}
                              onMouseDown={(event) => {
                                event.preventDefault();
                              }}
                              aria-label="toggle password visibility"
                              edge="end"
                            >
                              {showPassword ? (
                                <VisibilityOff />
                              ) : (
                                <Visibility />
                              )}
                            </IconButton>
                          </InputAdornment>
                        ),
                      }}
                      label="Current Password"
                      name="password"
                    />
                    <FormHelperText>{errors.currentPassword}</FormHelperText>
                  </FormControl>
                  <FormControl margin="normal" fullWidth variant="outlined">
                    <TextField
                      required
                      value={newPassword}
                      onChange={(event) => {
                        setNewPassword(event.target.value);
                      }}
                      id="newPassword"
                      type={showNewPassword ? "text" : "password"}
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">
                            <IconButton
                              onClick={() =>
                                setShowNewPassword((show) => !show)
                              }
                              onMouseDown={(event) => {
                                event.preventDefault();
                              }}
                              aria-label="toggle new password visibility"
                              edge="end"
                            >
                              {showNewPassword ? (
                                <VisibilityOff />
                              ) : (
                                <Visibility />
                              )}
                            </IconButton>
                          </InputAdornment>
                        ),
                      }}
                      label="New Password"
                      name="newPassword"
                    />
                  </FormControl>
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
                        variant="contined"
                      >
                        Cancel
                      </Button>
                    </Item>
                  </Grid>
                </form>
              </Box>
            </Item>
          </Grid>
          <Grid xs={4}>
            <Item
              sx={{
                p: 5,
                height: "100%",
                display: "flex",
                justifyContent: "center",
              }}
            >
              <Stack
                spacing={4}
              >
                <Avatar
                  src={file}
                  sx={{
                    width: "300px  ",
                    height: "300px",
                    bgcolor: "#48184C",
                  }}
                >
                  <FileUploader
                    onSelectFile={onSelectFileHandler}
                    setFile={setFile}
                    icon={"upload"}
                  />
                </Avatar>
                <Item elevation={0}>
                  <Typography
                    variant="h6"
                    color="initial"
                    m={"3px"}
                    sx={{ textAlign: "center" }}
                  >
                    {username}
                  </Typography>
                </Item>
              </Stack>
            </Item>
          </Grid>
        </Grid>
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
};

export default ProfileSettings;
