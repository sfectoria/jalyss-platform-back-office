import React, { useState } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Paper from '@mui/material/Paper';
import Draggable from 'react-draggable';
import axios from 'axios';
import { ip } from '../../../constants/ip';

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

const UnarchivePopUp = ({ FournisseurId, isOpen, setIsOpen, refresh, setRefresh }) => {
  const handleClose = () => {
    setIsOpen(false);
  };

  const handleUnarchive = async () => {
    try {
      await axios.patch(`${ip}/provider/${FournisseurId}`, {
        archived: false,
      });
      setRefresh(!refresh);
      handleClose();
    } catch (error) {
      console.error('Error unarchiving fournisseur:', error);
    }
  };

  return (
    <Dialog
      open={isOpen}
      onClose={handleClose}
      PaperComponent={PaperComponent}
      aria-labelledby="draggable-dialog-title"
    >
      <DialogTitle style={{ cursor: 'move' }} id="draggable-dialog-title">
        Unarchive Confirmation
      </DialogTitle>
      <DialogContent>
        <DialogContentText>
          Are you sure you want to unarchive this fournisseur? This action will restore the fournisseur to the active list.
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button autoFocus onClick={handleClose}>
          Cancel
        </Button>
        <Button onClick={handleUnarchive}>Confirm</Button>
      </DialogActions>
    </Dialog>
  );
};

export default UnarchivePopUp;
