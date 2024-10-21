import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { ip } from "../../../constants/ip";

function AddInventaire() {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const navigate = useNavigate();
  const param = useParams();
  const handelNavigate = async (name) => {
    const obj = {
      name: name,
      status: "draft",
      date: new Date(),
      stockId: +param.id,
      inventoryLine: [],
    };
    const createInv = await axios.post(`${ip}/inventory/create`, obj);
    if (createInv.data) {
      navigate(`/stock/${param.id}/inv/${createInv.data.id}`);
    }
  };
  return (
    <Box sx={{ height: 70, position: "fixed", bottom: 40, right: 100 }}>
      <Fab color="secondary" aria-label="edit" onClick={handleClickOpen}>
        <AddIcon />
      </Fab>
      <Dialog
        open={open}
        onClose={handleClose}
        PaperProps={{
          component: "form",
          onSubmit: async (event) => {
            event.preventDefault();
            const formData = new FormData(event.currentTarget);
            const formJson = Object.fromEntries(formData.entries());
            handelNavigate(formJson.invName);
            handleClose();
          },
        }}
      >
        <DialogTitle>Inventaire</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Please enter a name to your new inventory
          </DialogContentText>
          <TextField
            autoFocus
            required
            margin="dense"
            id="name"
            name="invName"
            label="Inventaire Name"
            type="text"
            fullWidth
            variant="standard"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button type="submit">Subscribe</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

export default AddInventaire;
