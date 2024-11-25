import React, { useEffect, useState } from "react";
import Snackbar from "@mui/material/Snackbar";


export const SnackBar = ({ open, setOpen, message }) => {
    useEffect(() => {
      if (open) {
        const timer = setTimeout(() => {
          setOpen(false); 
        }, 1000); 
        return () => clearTimeout(timer);
      }
    }, [open, setOpen]);
  
    return (
      <Snackbar
        open={open}
        autoHideDuration={1000}
        onClose={() => setOpen(false)}
        message={message}
      />
    );
  };
  