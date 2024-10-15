import React, { useEffect, useState } from "react";
import { Box, Button } from "@mui/material";
import Avatar from "@mui/material/Avatar";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import LibraryBooksIcon from '@mui/icons-material/LibraryBooks';
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import PermIdentityIcon from '@mui/icons-material/PermIdentity';
import LocationCityIcon from "@mui/icons-material/LocationCity";
import axios from "axios";
import ModeEditOutlineIcon from "@mui/icons-material/ModeEditOutline";
import { useNavigate, useParams } from "react-router-dom";
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
      console.error("Error fetching client data:", error);
    }
  };

  useEffect(() => {
    getOneAuthor();
  }, [id]);

  const handleEditClick = () => {
    setIsEdit(!isEdit);
  };

  return (
    <Box sx={{ mx: 3, my: 6, display: "flex", position: "relative" }}>
      {!isEdit ? (
        <>
          <Box>
            <Stack direction="row" spacing={2}>
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
            </Stack>
            <Typography sx={{ pt: 4, fontSize: 30, fontWeight: "bold" }}>
              {theAuthor.nameEn}
            </Typography>
          </Box>

          <Box>
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <PermIdentityIcon />
              <Typography sx={{ p: 1, fontSize: 19 }}>{theAuthor.nameAr}</Typography>
            </Box>
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <LibraryBooksIcon />
              <Typography sx={{ p: 1, fontSize: 19 }}>{theAuthor.biographyEn}</Typography>
            </Box>
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <LibraryBooksIcon />
              <Typography sx={{ p: 1, fontSize: 19 }}>{theAuthor.biographyAr}</Typography>
            </Box>
          </Box>

          <Box sx={{ mx: 4, position: "relative" }}>
            <Box
              sx={{
                position: "absolute",
                top: -9,
                right: 0,
                marginRight: "-1cm",
              }}
            >
              <ModeEditOutlineIcon
                onClick={handleEditClick}
                sx={{ cursor: "pointer" }}
              />
            </Box>
          </Box>
        </>
      )
       : (
        <Box sx={{ mt: 3, display: "flex", justifyContent: "center" }}>
          <UpdateAuthor setIsEdit={setIsEdit} />
        </Box>
      )}
    </Box>
  );
}


