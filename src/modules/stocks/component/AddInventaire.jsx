import React, { useEffect } from "react";
import Box from "@mui/material/Box";
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { ip } from "../../../constants/ip";

function AddInventaire() {
  const navigate = useNavigate();
  const param = useParams();
  const handelNavigate = async () => {
    const obj = {
      name: "inv",
      status: "draft",
      date: new Date(),
      stockId: +param.id,
      inventoryLine: [
      ],
    };
    const createInv = await axios.post(`${ip}/inventory/create`, obj);
    if (createInv.data) {
      navigate(`/stock/${param.id}/inv/${createInv.data.id}`);
    }
  };
  return (
    <Box sx={{ height: 70, position: "fixed", bottom: 40, right: 100 }}>
      <Fab color="secondary" aria-label="edit" onClick={handelNavigate}>
        <AddIcon />
      </Fab>
    </Box>
  );
}

export default AddInventaire;
