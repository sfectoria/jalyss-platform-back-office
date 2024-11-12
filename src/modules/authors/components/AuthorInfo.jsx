import React, { useEffect, useState } from "react";
import { Box, Typography, Avatar, Tab, Tabs } from "@mui/material";
import LibraryBooksIcon from "@mui/icons-material/LibraryBooks";
import axios from "axios";
import { useParams } from "react-router-dom";
import { ip } from "../../../constants/ip";
import UpdateAuthor from "./UpdateAuthor";

export default function AuthorDetails() {
  const { id } = useParams();
  const [theAuthor, setTheAuthor] = useState({});
  const [isEdit, setIsEdit] = useState(false);
  const [tabIndex, setTabIndex] = useState(0);

  const getOneAuthor = async () => {
    try {
      const response = await axios.get(`${ip}/author/${id}`);
      setTheAuthor(response.data);
      console.log("from one", response.data);
    } catch (error) {
      console.error("Error fetching author data:", error);
    }
  };

  useEffect(() => {
    getOneAuthor();
  }, [id]);

  const handleTabChange = (event, newValue) => {
    setTabIndex(newValue);
  };

  return (
<Box sx={{ mx: 3, my: 6, display: "flex", justifyContent: "center" }}>
  {!isEdit ? (
    <Box
      sx={{
        flex: 1,
        p: 3,
        border: "2px solid #e0e0e0",
        borderRadius: 2,
        maxWidth: "800px",
        height: "21.3cm",
        width: "100%",
      }}
    >
      <Tabs
        value={tabIndex}
        onChange={handleTabChange}
        indicatorColor="primary"
        textColor="primary"
        variant="fullWidth"
        sx={{ marginBottom: "20px" }}
      >
        <Tab label="Overview" />
        <Tab label="Edit Profile" />
      </Tabs>

      {tabIndex === 0 && (
        <>
          <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", mb: 4 }}>
            {theAuthor?.Media?.path ? (
              <Avatar
                alt="author avatar"
                sx={{
                  width: { xs: 40, sm: 60, md: 80, lg: 200 },
                  height: { xs: 40, sm: 60, md: 80, lg: 180 },
                }}
                src={theAuthor?.Media?.path}
              />
            ) : (
              <Avatar
                sx={{
                  bgcolor: "#e6c440",
                  width: 140,
                  height: 140,
                  fontSize: 50,
                }}
              >
                {theAuthor.nameEn
                  ? theAuthor.nameEn
                      .split(" ")
                      .map((namePart) => namePart[0])
                      .join("")
                  : "?"}
              </Avatar>
            )}
            <Typography sx={{ fontSize: 20, fontWeight: "bold", mt: 2 }}>
              {theAuthor.nameEn}
            </Typography>
            <Typography sx={{ fontSize: 26, fontWeight: "bold", mt: 1 }}>
              {theAuthor.nameAr}
            </Typography>
          </Box>
          <Typography
            sx={{
              fontSize: 22,
              fontWeight: "bold",
              mb: 2,
              paddingTop: "0cm",
            }}
          >
            <span>About:</span>
          </Typography>
          <Typography sx={{ fontSize: 21, mb: 4 }}>
            {theAuthor.nameEn} is a well-known author with contributions to both English and Arabic
            literature. With a passion for storytelling, {theAuthor.nameEn} has inspired readers
            through captivating biographies and thoughtful narratives in multiple languages.
          </Typography>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 2 }}>
            <LibraryBooksIcon />
            <Typography sx={{ fontSize: 19, fontWeight: "bold" }}>
              Biography (English):
            </Typography>
          </Box>
          <Typography sx={{ fontSize: 19, mb: 4 }}>
            {theAuthor.biographyEn}
          </Typography>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <LibraryBooksIcon />
            <Typography sx={{ fontSize: 19, fontWeight: "bold" }}>
              السيرة الذاتية (Arabic):
            </Typography>
          </Box>
          <Typography sx={{ fontSize: 19 }}>
            {theAuthor.biographyAr}
          </Typography>
        </>
      )}

      {tabIndex === 1 && (
        <Box sx={{ mt: 3, display: "flex", justifyContent: "center" }}>
          <UpdateAuthor setIsEdit={setIsEdit} />
        </Box>
      )}
    </Box>
  ) : (
    <Box sx={{ mt: 3, display: "flex", justifyContent: "center" }}>
      <UpdateAuthor setIsEdit={setIsEdit} />
    </Box>
  )}
</Box>

  );
}
