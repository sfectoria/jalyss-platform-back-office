import React, { useState } from "react";
import { Button, TextField, Grid, Box } from "@mui/material";
import axios from "axios";
import { useParams } from "react-router-dom";

const ClientUpdate = ({ setIsEdit }) => {
  const { id } = useParams();
  const [clientData, setClientData] = useState({
    fullName: "",
    phoneNumber: "",
    address: "",
    email: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setClientData({
      ...clientData,
      [name]: value,
    });
  };

  const handleUpdate = async () => {
    try {
      const response = await axios.patch(
        `http://localhost:3000/clients/${id}`,
        clientData
      );

      if (response.status === 200) {
        alert("Client updated successfully!");
        setIsEdit(false); 
      }
    } catch (error) {
      console.error("Error updating client:", error);
      alert("There was an error updating the client.");
    }
  };

  const handleCancel = () => {
    setIsEdit(false);
  };

  return (
    <div style={{ padding: "10px" }}>
      <Box
        sx={{
          p: 2, 
          border: "1px solid #ccc",
          borderRadius: 2,
          boxShadow: 1, 
          maxWidth: 400,
          margin: "auto",
          mt: 3, 
        }}
      >
        <Grid container spacing={1}>
          <Grid item xs={12}>
            <h3 style={{ textAlign: "center" }}>Update Client Info</h3>{" "}
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              variant="outlined"
              placeholder="Client Name"
              name="fullName"
              value={clientData.fullName}
              onChange={handleInputChange}
              size="small" 
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              variant="outlined"
              placeholder="Company Name"
              name="companyName"
              value={clientData.companyName}
              onChange={handleInputChange}
              size="small"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              variant="outlined"
              placeholder="Email"
              name="email"
              value={clientData.email}
              onChange={handleInputChange}
              size="small"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              variant="outlined"
              placeholder="Phone Number"
              name="phoneNumber"
              value={clientData.phoneNumber}
              onChange={handleInputChange}
              size="small"
            />
          </Grid>
          <Grid item xs={12} sm={12}>
            <TextField
              fullWidth
              variant="outlined"
              placeholder="Address"
              name="address"
              value={clientData.address}
              onChange={handleInputChange}
              size="small"
            />
          </Grid>
        </Grid>

        <Box textAlign="center" mt={2}>
          <Button
            variant="contained"
            size="medium"
            sx={{ backgroundColor: "#48184c", color: "#fff", mr: 2 }}
            onClick={handleUpdate}
          >
            Update
          </Button>
          <Button
            variant="outlined"
            size="medium"
            sx={{ color: "#48184c", borderColor: "#48184c" }}
            onClick={handleCancel}
          >
            Cancel
          </Button>
        </Box>
      </Box>
    </div>
  );
};

export default ClientUpdate;
