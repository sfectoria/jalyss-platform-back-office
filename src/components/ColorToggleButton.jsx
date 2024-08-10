import * as React from "react";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Divider,
  List,
  ListItemButton,
  ListItemText,
  Slide,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

const invoices = [
  "Ticket de caisse",
  "Bon de retour",
  "Bon de commande",
  "Devis",
  "Facture",
  "Bon de transfert",
  "Bon de sortie",
  "Bon de réception",
  "Bon de livraison",
  "Bon de livraison/facture",
];

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function ColorToggleButton({ state }) {

  const navigate = useNavigate();
  const [alignment, setAlignment] = React.useState(state);
  const [open, setOpen] = React.useState(false);
  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = (event, newAlignment) => {
    if (newAlignment === null) {
      return;
    }
    setAlignment(newAlignment);
    console.log(newAlignment);
  };

  const handleConfirm = () => {
    setOpen(true);
    console.log("aaaa");
  };

    const info = {
      name: "Stock Sfax",
      email: "stockSfax@gmail.com",
      address: "sfax , tunisia",
    };


  return (
    <ToggleButtonGroup
      color="primary"
      value={alignment}
      exclusive
      onChange={handleChange}
      aria-label="Platform"
    >
      <ToggleButton value="confirmed" color="success" onClick={handleConfirm}>
        Confirmed
      </ToggleButton>
      <ToggleButton value="pending" color="warning">
        Pending
      </ToggleButton>
      <ToggleButton value="cancelled" color="error">
        Cancelled
      </ToggleButton>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>{"Choose one option"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            <List>
              {invoices.map((invoice) => (
                <ListItemButton
                  key={invoice}
                  onClick={() => {
                    navigate("/invoice", {
                      state: {
                        title: invoice,
                        sender: {},
                        receiver: { info },
                      },
                    });
                  }}
                >
                  <ListItemText primary={invoice} />
                </ListItemButton>
              ))}
            </List>
          </DialogContentText>
        </DialogContent>
      </Dialog>
    </ToggleButtonGroup>
  );
}