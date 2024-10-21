import React, { useState, useEffect } from "react";
import { Button, TextField, Grid, Box, MenuItem, Select, InputLabel, FormControl } from "@mui/material";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { ip } from "../../../constants/ip";

const ClientUpdate = ({ setIsEdit,refresh,setRefresh }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [clientData, setClientData] = useState({
    fullName: "",
    phoneNumber: "",
    address: "",
    email: "",
    idCategoryClient: "",
  });
  const [categories, setCategories] = useState([]);

  // Fetch client and category data
  useEffect(() => {
    const fetchClientData = async () => {
      try {
        const response = await axios.get(`${ip}/clients/${id}`);
        setClientData(response.data);
      } catch (error) {
        console.error("Error fetching client data:", error);
        alert("There was an error fetching the client data.");
      }
    };

    const fetchCategories = async () => {
      try {
        const response = await axios.get(`${ip}/categoryClients`);
        setCategories(response.data); 
      } catch (error) {
        console.error("Error fetching categories:", error);
        alert("There was an error fetching the categories.");
      }
    };

    fetchClientData();
    fetchCategories();
  }, [id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setClientData({
      ...clientData,
      [name]: value,
    });
  };

  const handleUpdate = async () => {
    try {
      const updatedClientData = {
        fullName: clientData.fullName,
        email: clientData.email,
        phoneNumber: clientData.phoneNumber,
        address: clientData.address,
        idCategoryClient: clientData.idCategoryClient,
      };
      const response = await axios.patch(`${ip}/clients/${id}`, updatedClientData);

      if (response.status === 200) {
        alert("Client updated successfully!");
        setRefresh(!refresh) 
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
          p: 3,
          border: "1px solid #ccc",
          borderRadius: 2,
          boxShadow: 1,
          maxWidth: 1200,
          margin: "auto",
          mt: 3,
        }}
      >
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <h3 style={{ textAlign: "center" }}>Update Client Info</h3>
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              variant="outlined"
              label="Client Name"
              name="fullName"
              value={clientData.fullName}
              onChange={handleInputChange}
              size="medium"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth>
              <InputLabel>Category</InputLabel>
              <Select
                value={clientData.idCategoryClient}
                name="idCategoryClient"
                onChange={handleInputChange}
              >
                {categories.map((category) => (
                  <MenuItem key={category.id} value={category.id}>
                    {category.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              variant="outlined"
              label="Email"
              name="email"
              value={clientData.email}
              onChange={handleInputChange}
              size="medium"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              variant="outlined"
              label="Phone Number"
              name="phoneNumber"
              value={clientData.phoneNumber}
              onChange={handleInputChange}
              size="medium"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              variant="outlined"
              label="Address"
              name="address"
              value={clientData.address}
              onChange={handleInputChange}
              size="medium"
            />
          </Grid>
        </Grid>

        <Box textAlign="center" mt={3}>
          <Button
            variant="contained"
            size="large"
            sx={{ backgroundColor: "#48184c", color: "#fff", mr: 2 }}
            onClick={handleUpdate}
          >
            Update
          </Button>
          <Button
            variant="outlined"
            size="large"
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
