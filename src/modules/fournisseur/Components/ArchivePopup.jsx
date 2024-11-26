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

export default function ArchivePopUp({ FournisseurId, status, setStatus,refresh, setRefresh }) {
  const [open, setOpen] = useState(status);

  const handleClose = () => {
    setOpen(false);
    setStatus(false);
  };

  const handleArchive = async () => {
    try {
      await axios.patch(`${ip}/provider/${FournisseurId}`, {
        archived: true,
      });
      setRefresh(!refresh);
      handleClose();
    } catch (error) {
      console.error('Error archiving article:', error);
    }
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      PaperComponent={PaperComponent}
      aria-labelledby="draggable-dialog-title"
    >
      <DialogTitle style={{ cursor: 'move' }} id="draggable-dialog-title">
        Archive Confirmation
      </DialogTitle>
      <DialogContent>
        <DialogContentText>
          Are you sure you want to archive this fournisseur? This action cannot
          be undone.
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
