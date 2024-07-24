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
} from "@mui/material";

import Divider from "@mui/material/Divider";

import Avatar from "@mui/material/Avatar";

import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import React, { useState } from "react";
import Grid from "@mui/material/Unstable_Grid2";
import Item from "../../../style/ItemStyle";
import FileUploader from "../../../component/FileUploader";

const defaultTheme = createTheme();

const ProfileView = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [file, setFile] = useState(null);
  const [fileName, setFileName] = useState("");
  const [username, setUsername] = useState("");

  const onSelectFileHandler = (e) => {
    const uploadedFile = e.target.files[0];
    setFileName(uploadedFile?.name);
    if (uploadedFile) {
      setFile(URL.createObjectURL(uploadedFile));
    }
  };

  const onDeleteFileHandler = () => {};
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
                      console.log(e.target.value);
                    }}
                    inputProps={{
                      maxLength: 20,
                    }}
                  />
                  <FormControl margin="normal" fullWidth variant="outlined">
                    <InputLabel htmlFor="currentPassword" variant="outlined">
                      Current Password
                    </InputLabel>
                    <OutlinedInput
                      onChange={(event) => {
                        console.log(event.target.value);
                      }}
                      id="currentPassword"
                      type={showPassword ? "text" : "password"}
                      endAdornment={
                        <InputAdornment position="end">
                          <IconButton
                            onClick={() => setShowPassword((show) => !show)}
                            onMouseDown={(event) => {
                              event.preventDefault();
                            }}
                            aria-label="toggle password visibility"
                            edge="end"
                          >
                            {showPassword ? <VisibilityOff /> : <Visibility />}
                          </IconButton>
                        </InputAdornment>
                      }
                      label="Current Password"
                      name="password"
                    />
                  </FormControl>
                  <FormControl margin="normal" fullWidth variant="outlined">
                    <InputLabel htmlFor="newPassword" variant="outlined">
                      New Password
                    </InputLabel>
                    <OutlinedInput
                      onChange={(event) => {
                        console.log(event.target.value); // Handle new password change
                      }}
                      id="newPassword"
                      type={showNewPassword ? "text" : "password"} // Use a separate state variable for the new password visibility
                      endAdornment={
                        <InputAdornment position="end">
                          <IconButton
                            onClick={() => setShowNewPassword((show) => !show)} // Adjust the state function for new password visibility
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
                      }
                      label="New Password"
                      name="newPassword"
                    />
                  </FormControl>

                  <InputLabel htmlFor="imgUploader">Profile Picture</InputLabel>
                  <FileUploader
                    onSelectFile={onSelectFileHandler}
                    onDeleteFile={onDeleteFileHandler}
                    file={file}
                    setFile={setFile}
                    fileName={fileName}
                  />
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
                divider={
                  <Divider
                    orientation="horizontal"
                    flexItem
                    variant="middle"
                    sx={{ backgroundColor: "black", height: "2px" }}
                  />
                }
                spacing={2}
              >
                <>
                  <Avatar
                    src={file}
                    sx={{ width: "200px  ", height: "200px" }}
                  />
                </>
                <Item>
                  <Typography variant="h6" color="initial" m={"3px"}>
                    {username}
                  </Typography>
                </Item>
                <Button variant="contained" color="primary">
                  Confirm
                </Button>
                <Button variant="contained" color="error">
                  Cancel
                </Button>
              </Stack>
            </Item>
          </Grid>
        </Grid>
      </Box>
    </ThemeProvider>
    // username password pfp
  );
};

export default ProfileView;
