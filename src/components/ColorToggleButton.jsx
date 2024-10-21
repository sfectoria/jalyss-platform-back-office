import * as React from "react";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  List,
  ListItemButton,
  ListItemText,
  Slide,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const invoices = [
  "Ticket de caisse",
  "Facture",
  "Bon de livraison",
  "Bon de livraison/facture",
];

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function ColorToggleButton({
  state,
  idPurchaseOrder,
  saleChannelId,
  idClient,
  deliveryDate,
  purchaseOrderLine,
}) {
  
  const navigate = useNavigate();
  const [alignment, setAlignment] = React.useState(state);
  const [open, setOpen] = React.useState(false);
  const [confirmOpen, setConfirmOpen] = React.useState(false);
  const [confirmationType, setConfirmationType] = React.useState(null);

  const handleClose = () => {
    setOpen(false);
  };

  const handleConfirmClose = () => {
    setConfirmOpen(false);
  };

  const handleChange = (event, newAlignment) => {
    if (newAlignment === null) {
      return;
    }
    if (newAlignment === "cancelled" || newAlignment === "pending") {
      setConfirmationType(newAlignment);
      setConfirmOpen(true);
    } else {
    }
  };

  const handleConfirmCancellation = async () => {
    setConfirmOpen(false);
    setAlignment("cancelled");
    console.log("Cancelled");

    try {
      const response = await axios.patch(
        `http://localhost:3000/purchaseOrder/${idPurchaseOrder}`,
        {
          status: "Cancelled",
        }
      );

      console.log("Status updated:", response.data);
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };

  const handleConfirmPending = async () => {
    setConfirmOpen(false);
    setAlignment("pending");
    console.log("Pending");

    try {
      const response = await axios.patch(
        `http://localhost:3000/purchaseOrder/${idPurchaseOrder}`,
        {
          status: "Pending",
        }
      );

      console.log("Status updated:", response.data);
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };

  const handleConfirm = () => {
    setOpen(true);
  };

  const handleInvoiceSelection = async (invoice) => {
   console.log(invoice);
   
 let type;

    switch (invoice) {
        case "Bon de livraison":
  
            type ='BL'
            break;
        case "Facture":
            type ='F'
            break;
        case "Bon de livraison/facture":
            type ='BLF'
            break;
        case "Ticket de caisse":
            type ='Ticket'
            break;
        default:
            break;
    }

    if (type) {
        try {
            navigate(`/invoice/sale/${type}/${saleChannelId}/${idClient}/cnf${idPurchaseOrder}`)
            
        } catch (error) {
            console.error("Error making API request or updating status:", error);
        }
    }

    setOpen(false);
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

      {/* Confirmation Dialog */}
      <Dialog
        open={confirmOpen}
        onClose={handleConfirmClose}
        aria-labelledby="confirm-dialog-title"
        aria-describedby="confirm-dialog-description"
      >
        <DialogTitle id="confirm-dialog-title">Are you sure?</DialogTitle>
        <DialogContent>
          <DialogContentText id="confirm-dialog-description">
            {confirmationType === "cancelled"
              ? "Do you really want to cancel this? This action cannot be undone."
              : "Do you want to mark this as pending?"}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleConfirmClose} color="primary">
            Cancel
          </Button>
          <Button
            onClick={
              confirmationType === "cancelled"
                ? handleConfirmCancellation
                : handleConfirmPending
            }
            color={confirmationType === "cancelled" ? "error" : "warning"}
          >
            Confirm
          </Button>
        </DialogActions>
      </Dialog>

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
                  onClick={() => handleInvoiceSelection(invoice)}
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
