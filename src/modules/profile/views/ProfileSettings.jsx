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
import { getMe, updateProfile, verifyPassword } from "../../../store/slices/authSlice.js"; // Assurez-vous d'importer verifyPassword

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
  const [email, setEmail] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [editMode, setEditMode] = useState(false);
  const [open, setOpen] = useState(false);
  const [isCancelled, setIsCancelled] = useState(false);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    dispatch(getMe());
  }, [dispatch]);

  useEffect(() => {
    if (user) {
      setUsername(user.userName || "");
      setEmail(user.email || "");
    }
  }, [user]);

  const handleClose = () => {
    setOpen(false);
  };

  const resetForm = () => {
    setUsername(user?.userName || "");
    setEmail(user?.email || "");
    setCurrentPassword("");
    setNewPassword("");
    setFile(null);
    setErrors({});
    setEditMode(false);
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
  console.log("test", isValidPassword)
      if (isValidPassword.payload === 'valid password') {
        dispatch(
          updateProfile({
            id: userId,
            body: {
              userName: username,
              email,
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
                      <Typography variant="h6" sx={{ mt: 2 }}>
                        Email: {email}
                      </Typography>
                      <Typography variant="h6" sx={{ mt: 2 }}>
                        Current Password: ••••••••
                      </Typography>
                    </>
                  ) : (
                    <>
                      <TextField
                        margin="normal"
                        fullWidth
                        id="username"
                        label="Username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                      />
                      <TextField
                        margin="normal"
                        fullWidth
                        id="email"
                        label="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
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
                          onChange={(event) =>
                            setCurrentPassword(event.target.value)
                          }
                          id="currentPassword"
                          type={showPassword ? "text" : "password"}
                          InputProps={{
                            endAdornment: (
                              <InputAdornment position="end">
                                <IconButton
                                  onClick={() =>
                                    setShowPassword((show) => !show)
                                  }
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
                        />
                        <FormHelperText sx={{ color: "red" }}>
                          {errors.currentPassword}
                        </FormHelperText>
                      </FormControl>
                    </>
                  )}
                </CardContent>
                <CardActions>
                  {!editMode ? (
                    <Button variant="contained" onClick={() => setEditMode(true)}>
                      Modify
                    </Button>
                  ) : (
                    <>
                      <Button variant="contained" type="submit" onClick={handleSubmit}>
                        Save
                      </Button>
                      <Button
                        variant="contained"
                        onClick={handleCancel}
                        color="error"
                      >
                        Cancel
                      </Button>
                    </>
                  )}
                </CardActions>
              </Card>
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
              <Stack spacing={4}>
                <Avatar
                  src={file}
                  sx={{
                    width: "300px",
                    height: "300px",
                    bgcolor: "#48184C",
                  }}
                >
                  <FileUploader
                    onSelectFile={onSelectFileHandler}
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
