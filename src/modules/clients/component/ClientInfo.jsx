import React from 'react';
import { Box } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import CreditScoreIcon from '@mui/icons-material/CreditScore';
import MoneyIcon from '@mui/icons-material/Money';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import EmailIcon from '@mui/icons-material/Email';
import LocationCityIcon from '@mui/icons-material/LocationCity';

export default function ClientInfo() {

  return (
    <Box sx={{mx:3,my:6, display:'flex'}}>
    <Box>
       <Stack direction="row" spacing={2}>
  <Avatar sx={{ bgcolor: '#e6c440 ', width: 140, height: 140,fontSize:50}}>OC</Avatar>
</Stack>
    <Typography sx={{ pt:4, fontSize:30,fontWeight:'bold' }}>{'Oussema Cherif'}</Typography>
</Box>
<Box >
<Box sx={{ display:'flex',alignItems:'center'}}>
    <EmailIcon/>
    <Typography sx={{ p: 1, fontSize:19}}>ousseemachetrif@gmail.com</Typography>
</Box>
<Box sx={{display:'flex',alignItems:'center'}}>
    <LocalPhoneIcon/>
<Typography sx={{ p: 1, fontSize:19}}>+216 98 567 565</Typography>
</Box>
<Box sx={{display:'flex',alignItems:'center'}}>
    <LocationCityIcon/>
<Typography sx={{ p: 1, fontSize:19}}>rue 420 rtiba takelsa nabeul</Typography>
</Box>
</Box>
<Box sx={{mx:4}}>
<Box sx={{mb:1, display:'flex',alignItems:'center',color:'#3b70b3'}}>
    <MoneyIcon sx={{fontSize:30}}/>
<Typography sx={{ p: 1, fontSize:20,fontWeight:'bold'}}>Commercial Transactions : 100144.110</Typography>
</Box>
<Box sx={{mb:1, display:'flex',alignItems:'center',color:'#00c853'}}>
    <CreditScoreIcon sx={{fontSize:30}}/>
    <Typography sx={{ p: 1, fontSize:20,fontWeight:'bold'}}>Received : 99144</Typography>
    </Box>
    <Box sx={{mb:1, display:'flex',alignItems:'center',color:"#ed2024"}}>
    <ErrorOutlineIcon sx={{fontSize:30}}/>
    <Typography sx={{ p: 1, fontSize:20,fontWeight:'bold'}}>Not Yet : 1000.110</Typography>
    </Box>

{/*
    <EmailIcon/>
    <Typography sx={{ p: 1, fontSize:15}}>ousseemachetrif@gmail.com</Typography>
</Box> */}

</Box>
</Box>
  );
}
