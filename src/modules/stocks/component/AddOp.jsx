import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import SpeedDial from "@mui/material/SpeedDial";
import SpeedDialIcon from "@mui/material/SpeedDialIcon";
import SpeedDialAction from "@mui/material/SpeedDialAction";
import ExitToAppOutlinedIcon from "@mui/icons-material/ExitToAppOutlined";
import ReceiptIcon from "@mui/icons-material/Receipt";
import { useNavigate } from "react-router-dom";

export default function AddButton(props) {
  const { type } = props;
  const [actions, setActions] = useState([]);

  useEffect(() => {
    if (type === "vente") {
      setActions([
        { icon: <ExitToAppOutlinedIcon />, name: "BL" },
        { icon: <ReceiptIcon />, name: "BL/F" },
        { icon: <ReceiptIcon />, name: "F" },
        { icon: <ReceiptIcon />, name: "Ticket" },
      ]);
    } else if (type === "retour") {
      setActions([{ icon: <ExitToAppOutlinedIcon />, name: "BR" }]);
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
  const info = {
    name: "Stock Sfax",
    email: "stockSfax@gmail.com",
    address: "sfax , tunisia",
  };

  const handleAction = (type) => {
    if (type === "BR") {
      navigate("/invoice", {
        state: { title: "Bon de Reception", sender: {}, receiver: { info } },
      });
    } else if (type === "BS") {
      navigate("/invoice", {
        state: { title: "Bon de Sortie", sender: { info }, receiver: {} },
      });
    } else if (type === 'BT') {
      navigate("/invoice", {
        state: { title: "Bon de Transfert", sender: { info }, receiver: {} },
      });
    } else if (type === 'BL') {
      navigate("/invoice", {
        state: { title: "Bon de Livraison", sender: { info }, receiver: {} },
      });
    }
    else if (type === 'BL/F') {
      navigate("/invoice", {
        state: { title: "Bon de Livraison/Facture", sender: { info }, receiver: {} },
      });
    }
    else if (type === 'F') {
      navigate("/invoice", {
        state: { title: "Facture", sender: { info }, receiver: {} },
      });
    }
    else if (type === 'Ticket') {
      navigate("/invoice", {
        state: { title: "Ticket de Caisse", sender: { info }, receiver: {} },
      });
    }
    else if (type === 'BC') {
      navigate("/invoice", {
        state: { title: "Bon de Commande", sender: { info }, receiver: {} },
      });
    }
    else if (type === 'Devis') {
      navigate("/invoice", {
        state: { title: "Devis", sender: { info }, receiver: {} },
      });
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
