import React, { useState } from "react";
import Button from "@mui/material/Button";
import Snackbar from "@mui/material/Snackbar";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";

export default function UnarchiveStockSnackBar({ openSnack, setOpenSnack }) {
  const [open, setOpen] = useState(openSnack);

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenSnack(false);
    setOpen(false);
  };

  const action = (
    <>
      {/* <Button color="secondary" size="small" onClick={handleClose}>
        UNDO
      </Button> */}
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={handleClose}
      >
        <CloseIcon fontSize="small" />
      </IconButton>
    </>
  );

  return (
    <Snackbar
      open={open}
      autoHideDuration={6000}
      onClose={handleClose}
      message="Stock unarchived"
      action={action}
    />
  );
}
