import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Item from "../../../style/ItemStyle";
import { useParams } from "react-router-dom";
import axios from "axios";
import { ip } from "../../../constants/ip"; 

export default function PublishingHouseDetails() {
  const [data, setData] = useState(null);
  const [error, setError] = useState(false); 
  const param = useParams();

  useEffect(() => {
  fetchPublishingHouseDetails();
  }, []);

  const fetchPublishingHouseDetails = async () => {
    try {
        console.log(param)
      const response = await axios.get(`${ip}/publishingHouses/${param.id}`);
      console.log(response.data)
      setData(response.data); 
    } catch (error) {
      console.error("Error fetching publishing house details:", error);
      setError(true);
    }
  };


  return (
    <Box sx={{ bgcolor: "background.default", mx: 3, mt: 3 }}>
      <Item sx={{ py: 5, px: 10, borderRadius: 10 }} elevation={5}>
        <h2>
          {data?.nameAr || "No Arabic Name"} / {data?.nameEn || "No English Name"}
        </h2>
        <p>Address: {data?.address || "No Address Available"}</p>
        {data?.logo?.path && <img src={data.logo.path} alt="Logo" />}
      </Item>
    </Box>
  );
}
