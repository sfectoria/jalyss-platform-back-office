import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Avatar from "@mui/material/Avatar";
import { useParams } from "react-router-dom";
import axios from "axios";
import { ip } from "../../../constants/ip"; 
import Stack from "@mui/material/Stack";
import Alert from "@mui/material/Alert";

export default function PublishingHouseDetails() {
  const [data, setData] = useState(null);
  const [error, setError] = useState(false);
  const [successAlert, setSuccessAlert] = useState(false);
  const [errorAlert, setErrorAlert] = useState(false);
  const { id } = useParams();

  useEffect(() => {
    fetchPublishingHouseDetails();
  }, [id]);

  const fetchPublishingHouseDetails = async () => {
    try {
      const response = await axios.get(`${ip}/publishingHouses/${id}`);
      setData(response.data); 
      setSuccessAlert(true);
    } catch (error) {
      console.error("Error fetching publishing house details:", error);
      setErrorAlert(true);
      setError(true);
    }
  };

  const getLogoPath = () => {
    return data?.logo?.path ? `${ip}${data.logo.path}` : <p>no logo</p>;
  };

  return (
    <Box sx={{pt:7,pb:1,px:7,borderRadius:10, gap: 2, mb: 4 }}>
      <Box sx={{ display: "flex", alignItems: "center", gap: 4, mb: 4 }}>
  {getLogoPath() && (
    <Avatar
      alt="Logo"
      src={getLogoPath()}
      sx={{ width: 100, height: 90, marginRight: 2, boxShadow: 3 }} 
    />
  )}
  <TextField
    id="outlined-required"
    label="Arabic Name"
    sx={{ flexGrow: 1 }} 
    value={data?.nameAr || "No Arabic Name"}
    InputProps={{
      readOnly: true,
    }}
  />
</Box>

<Box sx={{ display: "flex", alignItems: "center", gap: 4, mb: 4 }}>
  <TextField
    id="outlined-required"
    label="English Name"
    sx={{ flexGrow: 1 }} 
    value={data?.nameEn || "No English Name"}
    InputProps={{
      readOnly: true,
    }}
  />
</Box>


      
      <Box sx={{ display: "flex", gap: 2, mb: 4 }}>
        <TextField
          id="outlined-required"
          label="English Name"
          sx={{ width: "100%" }}
          value={data?.nameEn || "No English Name"}
          InputProps={{
            readOnly: true,
          }}
        />
      </Box>

     
      <Box sx={{ display: "flex", gap: 2, mb: 4 }}>
        <TextField
          id="outlined-required"
          label="Address"
          sx={{ width: "100%" }}
          value={data?.address || "No Address Available"}
          InputProps={{
            readOnly: true,
          }}
        />
      </Box>

      <Stack sx={{ width: '100%' }} spacing={2}>
        {successAlert && (
          <Alert severity="success" onClose={() => setSuccessAlert(false)}>
            Publishing House details loaded successfully!
          </Alert>
        )}
        {errorAlert && (
          <Alert severity="error" onClose={() => setErrorAlert(false)}>
            Error loading publishing house details. Please try again.
          </Alert>
        )}
      </Stack>
    </Box>
  );
}
