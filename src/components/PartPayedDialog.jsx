import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { ip } from "../constants/ip";

function PartPayedDialog({
  setPartAmount,
  openPartPayed = false,
  setOpenPartPayed,
  setRefresh,
  refresh,
  rowInfo = {},
  setEditingRowId,
}) {
  const [open, setOpen] = useState(openPartPayed);

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = async (amount) => {
    console.log(amount,rowInfo);
    let { totalAmount, id } = rowInfo;
    let obj = {
      modified: true,
      payedAmount: parseFloat(amount),
      restedAmount: totalAmount - amount,
    };
    if (parseFloat(amount) === totalAmount) {
      obj["paymentStatus"] = "Payed";
    } else if (parseFloat(amount) === 0) {
      obj["paymentStatus"] = "NotPayed";
    } else if (amount < totalAmount) {
      obj["paymentStatus"] = "PartiallyPayed";
    }
    try {
      await axios.patch(`${ip}/exitNote/${id}`,obj);
      if(rowInfo.type.includes('BL')){
        let salesId=rowInfo.salesDeliveryNote[0].id
      await axios.patch(`${ip}/salesDeliveryNote/${salesId}`,obj);
     }
      else if(rowInfo.type.includes('BLF')){
        let salesId=rowInfo.salesDeliveryInvoice[0].id
      await axios.patch(`${ip}/salesDeliveryInvoice/${salesId}`,obj);
     }
      else if(rowInfo.type.includes('F')){
        let salesId=rowInfo.salesInvoice[0].id
      await axios.patch(`${ip}/sales-invoices/${salesId}`,obj);
     }
      else if(rowInfo.type.includes('Ticket')){
        let salesId=rowInfo.salesReceipt[0].id
      await axios.patch(`${ip}/sales-receipt/${salesId}`,obj);
     }
      setRefresh(!refresh)
      setEditingRowId(null); 
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };

  return (
    <Dialog
      open={open}
      PaperProps={{
        component: "form",
        onSubmit: async (event) => {
          event.preventDefault();
          const formData = new FormData(event.currentTarget);
          const formJson = Object.fromEntries(formData.entries());
          handleSubmit(formJson.payedAmount);
          handleClose();
        },
      }}
    >
      <DialogTitle>ALERT</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Please enter the payed amount , the Total Amount :{" "}
          {rowInfo?.totalAmount}
        </DialogContentText>
        {(rowInfo?.payedAmount !== rowInfo?.totalAmount && rowInfo?.payedAmount !==0 ) && (
          <DialogContentText>
            And the Payed Amount is : {rowInfo?.payedAmount}
          </DialogContentText>
        )}
        <TextField
          autoFocus
          required
          margin="dense"
          id="payedAmount"
          name="payedAmount"
          label="Payed Amount"
          type="number"
          fullWidth
          inputProps={{ min: 0, max: rowInfo?.totalAmount }}
          variant="standard"
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button type="submit">confirm</Button>
      </DialogActions>
    </Dialog>
  );
}

export default PartPayedDialog;
