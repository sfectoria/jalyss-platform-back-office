import React, { useState } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Paper from "@mui/material/Paper";
import Draggable from "react-draggable";
import axios from "axios";
import { ip } from "../../../constants/ip";

function PaperComponent(props) {
  return (
    <Draggable
      handle="#draggable-dialog-title"
      cancel={'[class*="MuiDialogContent-root"]'}
    >
      <Paper {...props} />
    </Draggable>
  );
}

export default function UnarchiveChannels({
  refresh,
  setRefresh,
  setOpenSnack,
  channelId,
  status,
  setStatus,
}) {
  const [open, setOpen] = useState(status);
  const handleClose = () => {
    setOpen(false);
    setStatus(false);
  };

  const handleArchive = async () => {
    try {
      const response = await axios.patch(`${ip}/selling/${channelId}`, {
        archived: false,
      });
      handleClose();
      setOpenSnack(true);
      setRefresh(!refresh);
    } catch (error) {}
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      PaperComponent={PaperComponent}
      aria-labelledby="draggable-dialog-title"
    >
      <DialogTitle style={{ cursor: "move" }} id="draggable-dialog-title">
        Archive Confirmation
      </DialogTitle>
      <DialogContent>
        <DialogContentText>
          Are you sure you want to Unarchive this channel? This action will move
          the channel to the Unarchived section.
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button autoFocus onClick={handleClose}>
          Cancel
        </Button>
        <Button onClick={handleArchive}>Confirm</Button>
      </DialogActions>
    </Dialog>
  );
}