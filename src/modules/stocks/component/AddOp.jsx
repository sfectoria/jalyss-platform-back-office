import React from 'react';
import Box from '@mui/material/Box';
import SpeedDial from '@mui/material/SpeedDial';
import SpeedDialIcon from '@mui/material/SpeedDialIcon';
import SpeedDialAction from '@mui/material/SpeedDialAction';
import ExitToAppOutlinedIcon from '@mui/icons-material/ExitToAppOutlined';
import ReceiptIcon from '@mui/icons-material/Receipt';
import { useNavigate } from 'react-router-dom';

const actions = [
  { icon: <ExitToAppOutlinedIcon />, name: 'BR' },
  { icon: <ReceiptIcon />, name: 'BS' },
];

export default function AddButton() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const navigate=useNavigate()
  const info={
    name:'Stock Sfax',
    email:'stockSfax@gmail.com',
    address:'sfax , tunisia'
  }

  const handelAction=(type)=>{
    if(type==='BR'){
      navigate('/invoice',{state:{title:'Bon de Reception',sender:{},receiver:{info}}})
 }
    else if (type==='BS'){
      navigate('/invoice',{state:{title:'Bon de Sortie',sender:{info},receiver:{}}})
 }
}

  return (
    <Box sx={{ height: 330, transform: 'translateZ(0px)', flexGrow: 1 , position: 'fixed',bottom: 40, right: 100,}}>
      <SpeedDial
        ariaLabel="SpeedDial tooltip example" 
        sx={{ position: 'absolute', bottom: 11, right: 1 }}
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
            onClick={()=>{handelAction(action.name)}}
          />
        ))}
      </SpeedDial>
    </Box>
  );
}
