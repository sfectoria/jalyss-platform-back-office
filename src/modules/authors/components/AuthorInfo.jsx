import React, { useEffect, useState } from "react";
import { Box, Button } from "@mui/material";
import Avatar from "@mui/material/Avatar";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import LibraryBooksIcon from '@mui/icons-material/LibraryBooks';
import ModeEditOutlineIcon from "@mui/icons-material/ModeEditOutline";
import axios from "axios";
import { useParams } from "react-router-dom";
import { ip } from "../../../constants/ip";
import UpdateAuthor from "./UpdateAuthor";

export default function AuthorDetails() {
  const { id } = useParams();
  const [theAuthor, setTheAuthor] = useState({});
  const [isEdit, setIsEdit] = useState(false);

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

  const handleEditClick = () => {
    setIsEdit(!isEdit);
  };

  return (
    <Box sx={{ mx: 3, my: 6, display: "flex", justifyContent: "center" }}>
      <Box
        sx={{
          p: 3,
          borderRadius: 2,
          boxShadow: 3,
          bgcolor: "white",
          maxWidth: 1400,
          width: "100%",
          position: "relative",
        }}
      >
        {!isEdit ? (
          <>
            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 4 }}>
              <Stack direction="column" spacing={2} alignItems="center">
                <Avatar
                  sx={{ bgcolor: "#e6c440", width: 140, height: 140, fontSize: 50 }}
                >
                  {theAuthor.nameEn
                    ? theAuthor.nameEn
                        .split(" ")
                        .map((namePart) => namePart[0])
                        .join("")
                    : "?"}
                </Avatar>
                {/* Names placed under the avatar */}
                <Typography sx={{ fontSize: 30, fontWeight: "bold" }}>
                  {theAuthor.nameEn}
                </Typography>
                <Typography sx={{ fontSize: 30, fontWeight: "bold" }}>
                  {theAuthor.nameAr}
                </Typography>
              </Stack>
              <Box>
                <ModeEditOutlineIcon
                  onClick={handleEditClick}
                  sx={{ cursor: "pointer", fontSize: 30 }}
                />
              </Box>
            </Box>

            <Box sx={{ display: "flex", gap: 6, justifyContent: "space-between" }}>
              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <LibraryBooksIcon sx={{ mt: 0.5 }} />
                <Typography sx={{ fontSize: 19, fontWeight: "bold" }}>
                  Biography:
                </Typography>
                <Typography sx={{ fontSize: 19, ml: 1 }}>
                  {theAuthor.biographyEn}
                </Typography>
              </Box>

              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 1,
                  flexDirection: "column",
                  textAlign: "right",
                }}
              >
                <LibraryBooksIcon sx={{ mt: -6 }} />
                <Typography sx={{ fontSize: 19, fontWeight: "bold" }}>
                  السيرة الذاتية:
                </Typography>
                <Typography sx={{ fontSize: 19 }}>
                  {theAuthor.biographyAr}
                </Typography>
              </Box>
            </Box>
          </>
        ) : (
          <Box sx={{ mt: 3, display: "flex", justifyContent: "center" }}>
            <UpdateAuthor setIsEdit={setIsEdit} />
          </Box>
        )}
      </Box>
    </Box>
  );
}
