import React from 'react';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

export default function AlertAdding({handelShow,showAlert,msg,status}) {
  const [open, setOpen] = React.useState(showAlert);


  const handleClose = () => {
    setOpen(false);
    handelShow()
  };

  return (
    <div>
      <Snackbar open={open} autoHideDuration={6000}  onClose={handleClose}>
        <Alert
          onClose={handleClose}
          severity={status}
          variant="filled"
          sx={{ width: '100%' }}
        >
          {msg}
        </Alert>
      </Snackbar>
    </div>
  );
}