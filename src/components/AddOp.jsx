import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import SpeedDial from "@mui/material/SpeedDial";
import SpeedDialIcon from "@mui/material/SpeedDialIcon";
import SpeedDialAction from "@mui/material/SpeedDialAction";
import ExitToAppOutlinedIcon from "@mui/icons-material/ExitToAppOutlined";
import ReceiptIcon from "@mui/icons-material/Receipt";
import { useNavigate } from "react-router-dom";

export default function AddButton({type,info}) {
  const [actions, setActions] = useState([]);

  useEffect(() => {
    if (type === "vente") {
      setActions([
        { icon: <ExitToAppOutlinedIcon />, name: "BL" },
        { icon: <ReceiptIcon />, name: "BLF" },
        { icon: <ReceiptIcon />, name: "F" },
        { icon: <ReceiptIcon />, name: "Ticket" },
      ]);
    } 
    else if (type === "achat") {
      setActions([
        { icon: <ExitToAppOutlinedIcon />, name: "Bl" },
        { icon: <ReceiptIcon />, name: "Blf" },
        { icon: <ReceiptIcon />, name: "f" },
        { icon: <ReceiptIcon />, name: "ticket" },
      ]);
    } else if (type === "retour") {
      setActions([{ icon: <ExitToAppOutlinedIcon />, name: "BRe" }]);
    } else if (type === "commande") {
      setActions([{ icon: <ExitToAppOutlinedIcon />, name: "BC" }]);
    } else if(type === 'devis'){
      setActions([{ icon: <ExitToAppOutlinedIcon />, name: "Devis" }]);
    } else if (type === 'histStock') {
      setActions([
        { icon: <ExitToAppOutlinedIcon />, name: "BR" },
        { icon: <ReceiptIcon />, name: "BS" },
        { icon: <ReceiptIcon />, name: "BT" },
      ]);
    }
  }, [type]);

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const navigate = useNavigate();


  const handleAction = (type) => {
    if (type === "BR" || type ==='Bl'|| type ==='Blf' || type ==='f' || type ==='ticket') {
      navigate(`/invoice/purchase/${type}/0/${info.id}`);
    } else if (type === "BS" || type ==='BL' || type ==='BLF' || type ==='F' || type ==='Ticket' || type ==='BC' || type ==='Devis' ) {
      navigate(`/invoice/sale/${type}/${info.id}/0`);
    } else if (type==='BRe') {
      navigate(`/invoice/return/${type}/0/${info.id}`);
    } else if (type==='BT') {
      navigate(`/invoice/transfer/${type}/${info.id}/0`);
    }

  };

  return (
    <Box
      sx={{
        height: 330,
        transform: "translateZ(0px)",
        flexGrow: 1,
        position: "fixed",
        bottom: 40,
        right: 100,
      }}
    >
      <SpeedDial
        ariaLabel="SpeedDial tooltip example"
        sx={{ position: "absolute", bottom: 11, right: 1 }}
        icon={<SpeedDialIcon />}
        onClose={handleClose}
        onOpen={handleOpen}
        open={open}
      >
        {actions.map((action) => (
          <SpeedDialAction
            key={action.name}
            icon={action.icon}
            tooltipTitle={action.name}
            tooltipOpen
            onClick={() => {
              handleAction(action.name);
            }}
          />
        ))}
      </SpeedDial>
    </Box>
  );
}
