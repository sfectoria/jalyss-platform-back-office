import React,{useState} from 'react';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import { green,red } from '@mui/material/colors';
import Button from '@mui/material/Button';
import Fab from '@mui/material/Fab';
import CheckIcon from '@mui/icons-material/Check';
import SaveIcon from '@mui/icons-material/Save';
import { useNavigate } from 'react-router-dom';

export default function SaveOption() {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [draft, setDraft] = useState(false);
  const timer = React.useRef();
  const navigate=useNavigate()

  const buttonSx = {
    ...(success && {
      bgcolor: green[500],
      '&:hover': {
        bgcolor: green[700],
      },
    })    
  };
  const DraftSx = {
    ...(draft ? {
      bgcolor: green[500],
      '&:hover': {
        bgcolor: green[700],
      },
    }:{
      bgcolor: red[500],
      '&:hover': {
        bgcolor: red[700],
    }}),
  }

  React.useEffect(() => {
    return () => {
      clearTimeout(timer.current);
    };
  }, []);

  const handleButtonClick = () => {
    if (!loading) {
      setSuccess(false);
      setLoading(true);
      timer.current = setTimeout(() => {
        setSuccess(true);
        setLoading(false);
      }, 2000);
      timer.current = setTimeout(() => {
        navigate('/stock/1')
      }, 3000);
    }
  };

  const handleButtonClickSave = () => {
    setDraft(true)
      timer.current = setTimeout(() => {
        navigate('/stock/1')
      }, 2000);
    
  };

  return (
    <Box sx={{ display: 'flex', alignItems: 'center',justifyContent:'space-between',px:6 }}>
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
      <Box sx={{ m: 1, position: 'relative' }}>
        <Fab
          aria-label="save"
          color="primary"
          sx={DraftSx}
          onClick={handleButtonClickSave}
        >
          {success ? <SaveIcon /> : <SaveIcon />}
        </Fab>
      </Box>
    </Box>
    <Box sx={{ display: 'flex', alignItems: 'center' }}>
      <Box sx={{ m: 1, position: 'relative' }}>
        <Fab
          aria-label="save"
          color="primary"
          sx={buttonSx}
          onClick={handleButtonClick}
        >
          {success ? <CheckIcon /> : <CheckIcon />}
        </Fab>
        {loading && (
          <CircularProgress
            size={68}
            sx={{
              color: green[500],
              position: 'absolute',
              top: -6,
              left: -6,
              zIndex: 1,
            }}
          />
        )}
      </Box>
      <Box sx={{ m: 1, position: 'relative' }}>
        <Button
          variant="contained"
          sx={buttonSx}
          disabled={loading}
          onClick={handleButtonClick}
        >
          {success ? 'Confirmed': 'Confirm'}
        </Button>
        {loading && (
          <CircularProgress
            size={24}
            sx={{
              color: green[500],
              position: 'absolute',
              top: '50%',
              left: '50%',
              marginTop: '-12px',
              marginLeft: '-12px',
            }}
          />
        )}
      </Box>
    </Box>
    </Box>
  );
}
