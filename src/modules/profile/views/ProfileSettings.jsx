import {
  Box,
  createTheme,
  FormControl,
  ThemeProvider,
  Typography,
  TextField,
  InputAdornment,
  IconButton,
  Stack,
  Button,
  FormHelperText,
  Card,
  CardContent,
  CardActions,
  Chip,
} from "@mui/material";
import Avatar from "@mui/material/Avatar";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import React, { useState, useEffect } from "react";
import Grid from "@mui/material/Unstable_Grid2";
import Item from "../../../style/ItemStyle";
import FileUploader from "../../../components/FileUploader";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { useDispatch, useSelector } from "react-redux";
import { getMe, updateProfile, verifyPassword } from "../../../store/slices/authSlice.js";

const ProfileSettings = () => {
  const dispatch = useDispatch();
  const user = useSelector((store) => store.auth.me);

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
  const [file, setFile] = useState(null);
  const [fileName, setFileName] = useState("");
  const [username, setUsername] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [editMode, setEditMode] = useState(false);
  const [editPasswordMode, setEditPasswordMode] = useState(false); // New state for password edit mode
  const [open, setOpen] = useState(false);
  const [isCancelled, setIsCancelled] = useState(false);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    dispatch(getMe());
  }, [dispatch]);

  useEffect(() => {
    if (user) {
      setUsername(user.userName || "");
    }
  }, [user]);

  const handleClose = () => {
    setOpen(false);
  };

  const resetForm = () => {
    setUsername(user?.userName || "");
    setCurrentPassword("");
    setNewPassword("");
    setConfirmPassword("");
    setFile(null);
    setErrors({});
    setEditMode(false);
    setEditPasswordMode(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = {};
  
    if (!currentPassword) {
      newErrors.currentPassword = "Current password is required";
    }
    setErrors(newErrors);
  
    if (Object.keys(newErrors).length === 0) {
      const userId = user?.id;
  
      const isValidPassword = await dispatch(verifyPassword({ id: userId, password: currentPassword }));
      if (isValidPassword.payload === 'valid password') {
        dispatch(
          updateProfile({
            id: userId,
            body: {
              userName: username,
            },
          })
        )
        .then(() => {
          setIsCancelled(false);
          setOpen(true);
          resetForm();
        })
        .catch((err) => {
          console.error("Error updating profile:", err);
        });
      } else {
        setErrors({ currentPassword: "Invalid password" });
      }
    }
  };

  const handlePasswordSubmit = async (e) => {
    e.preventDefault();
    const newErrors = {};

    if (!currentPassword) {
      newErrors.currentPassword = "Current password is required";
    }
    if (newPassword !== confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }
    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      const userId = user?.id;

      const isValidPassword = await dispatch(verifyPassword({ id: userId, password: currentPassword }));
      if (isValidPassword.payload === 'valid password') {
        dispatch(
          updateProfile({
            id: userId,
            body: {
              password: newPassword,
            },
          })
        )
        .then(() => {
          setIsCancelled(false);
          setOpen(true);
          resetForm();
        })
        .catch((err) => {
          console.error("Error updating password:", err);
        });
      } else {
        setErrors({ currentPassword: "Invalid password" });
      }
    }
  };

  const handleCancel = () => {
    setIsCancelled(true);
    setOpen(true);
    resetForm();
  };

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
            {/* Username Card */}
            <Item sx={{ padding: 5 }}>
              <Typography variant="h2" gutterBottom>
                My Profile
              </Typography>

              <Card variant="outlined">
                <CardContent>
                  {!editMode ? (
                    <>
                      <Stack direction="row" spacing={1} alignItems="center">
                        <Typography variant="h6">Username:</Typography>
                        <Chip label={username} color="primary" />
                      </Stack>
                    </>
                  ) : (
                    <TextField
                      margin="normal"
                      fullWidth
                      id="username"
                      label="Username"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                    />
                  )}
                </CardContent>
                <CardActions>
                  {!editMode ? (
                    <Button variant="contained" onClick={() => setEditMode(true)}>
                      Modify
                    </Button>
                  ) : (
                    <>
                      <Button variant="contained" onClick={handleSubmit}>
                        Save
                      </Button>
                      <Button variant="contained" color="error" onClick={handleCancel}>
                        Cancel
                      </Button>
                    </>
                  )}
                </CardActions>
              </Card>
            </Item>

            {/* Password Card */}
            <Item sx={{ padding: 5, mt: 4 }}>
              <Card variant="outlined">
                <CardContent>
                  {!editPasswordMode ? (
                    <>
                      <Typography variant="h6">Change Password</Typography>
                      <Typography variant="body1">••••••••</Typography>
                    </>
                  ) : (
                    <>
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
                          onChange={(event) => setCurrentPassword(event.target.value)}
                          id="currentPassword"
                          type={showPassword ? "text" : "password"}
                          label="Current Password"
                          InputProps={{
                            endAdornment: (
                              <InputAdornment position="end">
                                <IconButton onClick={() => setShowPassword((show) => !show)}>
                                  {showPassword ? <VisibilityOff /> : <Visibility />}
                                </IconButton>
                              </InputAdornment>
                            ),
                          }}
                        />
                        <FormHelperText sx={{ color: "red" }}>
                          {errors.currentPassword}
                        </FormHelperText>
                      </FormControl>
                      <TextField
                        margin="normal"
                        fullWidth
                        required
                        type="password"
                        label="New Password"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                      />
                      <TextField
                        margin="normal"
                        fullWidth
                        required
                        type="password"
                        label="Confirm New Password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                      />
                      <FormHelperText sx={{ color: "red" }}>
                        {errors.confirmPassword}
                      </FormHelperText>
                    </>
                  )}
                </CardContent>
                <CardActions>
                  {!editPasswordMode ? (
                    <Button variant="contained" onClick={() => setEditPasswordMode(true)}>
                      Change Password
                    </Button>
                  ) : (
                    <>
                      <Button variant="contained" onClick={handlePasswordSubmit}>
                        Save Password
                      </Button>
                      <Button variant="contained" color="error" onClick={handleCancel}>
                        Cancel
                      </Button>
                    </>
                  )}
                </CardActions>
              </Card>
            </Item>
          </Grid>
          <Grid xs={4}>
            <Item sx={{ p: 5, height: "100%", display: "flex", justifyContent: "center" }}>
              <Stack spacing={4}>
                <Avatar
                  src={file}
                  sx={{ width: "300px", height: "300px", bgcolor: "#48184C" }}
                >
                  <FileUploader onSelectFile={onSelectFileHandler} icon={"upload"} />
                </Avatar>
                <Item elevation={0}>
                  <Typography variant="h6" sx={{ textAlign: "center" }}>
                    {username}
                  </Typography>
                </Item>
              </Stack>
            </Item>
          </Grid>
        </Grid>
      </Box>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle sx={{ color: isCancelled ? "red" : "green" }}>
          {isCancelled ? "Changes cancelled!" : "Submitted successfully!"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            {isCancelled
              ? "The changes you have made are not saved"
              : "The changes you have made are saved."}
          </DialogContentText>
        </DialogContent>
      </Dialog>
    </ThemeProvider>
  );
};

export default ProfileSettings;
