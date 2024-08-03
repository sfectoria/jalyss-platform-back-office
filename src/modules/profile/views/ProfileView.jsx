import {
  Avatar,
  Box,
  createTheme,
  Grid,
  Paper,
  ThemeProvider,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import Item from "../../../style/ItemStyle";

const ProfileView = () => {
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

  const [username, setUsername] = useState("username");
  const [email, setEmail] = useState("email");
  const [phoneNumber, setPhoneNumber] = useState("12345677");
  const [address, setAddress] = useState("address");
  const [city, setCity] = useState("city");
  const [postalCode, setPostalCode] = useState("postal code");
  const [bio, setBio] = useState("bio");
  const [profilePicture, setProfilePicture] = useState("profile picture");

  return (
    <ThemeProvider theme={defaultTheme}>
      <Paper elevation={3} sx={{ m: "5%" }}>
        <Box sx={{ padding: 5 }}>
          <Typography variant="h2" color="initial">
            User's informations
          </Typography>
          <Grid container spacing={2} p={"3%"}>
            <Grid container spacing={2} xs={6}>
              <Grid item xs={5}>
                <Item elevation={0}>
                  <Typography gutterBottom variant="h5" color="initial">
                    Bio :
                  </Typography>
                </Item>
              </Grid>
              <Grid item xs={7}>
                <Item elevation={0}>
                  <Typography
                    variant="h5"
                    color="initial"
                    sx={{ wordBreak: "break-word" }}
                  >
                    {bio}
                  </Typography>
                </Item>
              </Grid>
              <Grid item xs={5}>
                <Item elevation={0}>
                  <Typography gutterBottom variant="h5" color="initial">
                    Username :
                  </Typography>
                </Item>
              </Grid>
              <Grid item xs={7}>
                <Item elevation={0}>
                  <Typography gutterBottom variant="h5" color="initial">
                    {username}
                  </Typography>
                </Item>
              </Grid>
              <Grid item xs={5}>
                <Item elevation={0}>
                  <Typography gutterBottom variant="h5" color="initial">
                    Email :
                  </Typography>
                </Item>
              </Grid>
              <Grid item xs={7}>
                <Item elevation={0}>
                  <Typography gutterBottom variant="h5" color="initial">
                    {email}
                  </Typography>
                </Item>
              </Grid>
              <Grid item xs={5}>
                <Item elevation={0}>
                  <Typography gutterBottom variant="h5" color="initial">
                    Phone Number :
                  </Typography>
                </Item>
              </Grid>
              <Grid item xs={7}>
                <Item elevation={0}>
                  <Typography gutterBottom variant="h5" color="initial">
                    {phoneNumber}
                  </Typography>
                </Item>
              </Grid>
              <Grid item xs={5}>
                <Item elevation={0}>
                  <Typography gutterBottom variant="h5" color="initial">
                    Addres :
                  </Typography>
                </Item>
              </Grid>
              <Grid item xs={7}>
                <Item elevation={0}>
                  <Typography gutterBottom variant="h5" color="initial">
                    {address}
                  </Typography>
                </Item>
              </Grid>
              <Grid item xs={5}>
                <Item elevation={0}>
                  <Typography gutterBottom variant="h5" color="initial">
                    City :
                  </Typography>
                </Item>
              </Grid>
              <Grid item xs={7}>
                <Item elevation={0}>
                  <Typography gutterBottom variant="h5" color="initial">
                    {city}
                  </Typography>
                </Item>
              </Grid>
              <Grid item xs={5}>
                <Item elevation={0}>
                  <Typography gutterBottom variant="h5" color="initial">
                    Postal Code :
                  </Typography>
                </Item>
              </Grid>
              <Grid item xs={7}>
                <Item elevation={0}>
                  <Typography gutterBottom variant="h5" color="initial">
                    {postalCode}
                  </Typography>
                </Item>
              </Grid>
            </Grid>
            <Grid
              container
              spacing={2}
              xs={6}
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Avatar
                src={profilePicture}
                sx={{ width: "300px  ", height: "300px" }}
              />
            </Grid>
          </Grid>
        </Box>
      </Paper>
    </ThemeProvider>
  );
};

export default ProfileView;
