import * as React from 'react';
import PropTypes from 'prop-types';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import PersonIcon from '@mui/icons-material/Person';
import AddIcon from '@mui/icons-material/Add';
import Typography from '@mui/material/Typography';
import StoreIcon from '@mui/icons-material/Store';
import { blue } from '@mui/material/colors';
import { useNavigate } from 'react-router-dom';

const els = ['username@gmail.com', 'user02@gmail.com'];

export default function SimpleDialog(props) {
  const { onClose, selectedValue, open,info } = props;
 const navigate= useNavigate()
  const handleClose = () => {
    onClose(selectedValue);
  };

  const handleListItemClick = (value) => {
    navigate(`/channels/channel-details/${value?.id}`)
    onClose(value);
  };

  return (
    <Dialog onClose={handleClose} open={open}>
      <DialogTitle>Channels List</DialogTitle>
      <List sx={{ pt: 0 }}>
        {info?.map((el) => (
          <ListItem disableGutters key={el?.name}>
            <ListItemButton onClick={() => handleListItemClick(el)}>
              <ListItemAvatar>
                <Avatar sx={{ bgcolor: blue[100], color: blue[600] }}>
                  <StoreIcon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText primary={el?.name} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Dialog>
  );
}

SimpleDialog.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  selectedValue: PropTypes.string.isRequired,
};

// export default function ChannelsListOfStock() {
//   const [open, setOpen] = React.useState(false);
//   const [selectedValue, setSelectedValue] = React.useState(els[1]);

 
//   return (
    
//       <SimpleDialog
//         selectedValue={selectedValue}
//         open={open}
//         onClose={handleClose}
//       />
//   );
// }