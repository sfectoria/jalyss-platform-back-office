import React, { useEffect, useState } from "react";
import { Box, Button } from "@mui/material";
import Avatar from "@mui/material/Avatar";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import CreditScoreIcon from "@mui/icons-material/CreditScore";
import MoneyIcon from "@mui/icons-material/Money";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import EmailIcon from "@mui/icons-material/Email";
import LocationCityIcon from "@mui/icons-material/LocationCity";
import axios from "axios";
import ModeEditOutlineIcon from "@mui/icons-material/ModeEditOutline";
import { Navigate, useParams } from "react-router-dom";
import { ip } from "../../../constants/ip";
import ClientUpdate from "./ClientUpdate";

export default function ClientInfo() {
  const { id } = useParams();
  const [one, setOne] = useState({});
  const [isEdit, setIsEdit] = useState(false);
  const [refresh, setRefresh] = useState(false);

  const getOne = async () => {
    try {
      const response = await axios.get(`${ip}/clients/${id}`);
      setOne(response.data);
      console.log("from one", response.data);
    } catch (error) {
      console.error("Error fetching client data:", error);
    }
  };

  useEffect(() => {
    getOne();
  }, [refresh]);

  const handleEditClick = () => {
    setIsEdit(!isEdit);
  };

  return (
    <Box sx={{ mx: 3, my: 6, display: "flex", position: "relative" }}>
      <Box>
        <Stack direction="row" spacing={2}>
          <Avatar
            sx={{ bgcolor: "#e6c440", width: 140, height: 140, fontSize: 50 }}
          >
            {one.fullName
              ? one.fullName
                  .split(" ")
                  .map((namePart) => namePart[0])
                  .join("")
              : "?"}
          </Avatar>
        </Stack>
        <Typography sx={{ pt: 4, fontSize: 30, fontWeight: "bold" }}>
          {one.fullName}
        </Typography>
      </Box>

      <Box>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <EmailIcon />
          <Typography sx={{ p: 1, fontSize: 19 }}>{one.email}</Typography>
        </Box>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <LocalPhoneIcon />
          <Typography sx={{ p: 1, fontSize: 19 }}>{one.phoneNumber}</Typography>
        </Box>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <LocationCityIcon />
          <Typography sx={{ p: 1, fontSize: 19 }}>{one.address}</Typography>
        </Box>
      </Box>
      <Box sx={{ mx: 4, position: "relative" }}>
        {!isEdit ? (
          <>
            <Box
              sx={{
                mb: 1,
                display: "flex",
                alignItems: "center",
                color: "#3b70b3",
              }}
            >
              <MoneyIcon sx={{ fontSize: 30 }} />
              <Typography sx={{ p: 1, fontSize: 20, fontWeight: "bold" }}>
                Commercial Transactions: 100144.110
              </Typography>
            </Box>
            <Box
              sx={{
                mb: 1,
                display: "flex",
                alignItems: "center",
                color: "#00c853",
              }}
            >
              <CreditScoreIcon sx={{ fontSize: 30 }} />
              <Typography sx={{ p: 1, fontSize: 20, fontWeight: "bold" }}>
                Received: 99144
              </Typography>
            </Box>
            <Box
              sx={{
                mb: 1,
                display: "flex",
                alignItems: "center",
                color: "#ed2024",
              }}
            >
              <ErrorOutlineIcon sx={{ fontSize: 30 }} />
              <Typography sx={{ p: 1, fontSize: 20, fontWeight: "bold" }}>
                Not Yet: 1000.110
              </Typography>
            </Box>
            <Box
              sx={{
                position: "absolute",
                top: -9,
                right: 0,
                marginRight: "-5cm",
              }}
            >
              <ModeEditOutlineIcon
                onClick={handleEditClick}
                sx={{ cursor: "pointer" }}
              />
            </Box>
          </>
        ) : (
          <Box sx={{ mt: 3, display: "flex", justifyContent: "center" }}>
            <ClientUpdate setIsEdit={setIsEdit} refresh={refresh} setRefresh={setRefresh}/>
          </Box>
        )}
      </Box>
    </Box>
  );
}

{
  /*
    <EmailIcon/>
    <Typography sx={{ p: 1, fontSize:15}}>ousseemachetrif@gmail.com</Typography>
</Box> */
}
