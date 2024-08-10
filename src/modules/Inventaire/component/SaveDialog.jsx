import React,{useState} from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import SaveOption from './SaveOption';

export default function SaveDialog({show,setShow}) {
  const [open, setOpen] = useState(show);

  const handleClose = () => {
    setOpen(false);
    setShow(false)
  };

  return (
    <React.Fragment>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Did You Finish ?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
          Please Choose an option Confirm or Save as draft
          </DialogContentText>
        </DialogContent>
            <SaveOption/>
      </Dialog>
    </React.Fragment>
  );
}
