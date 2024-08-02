import React from 'react';
import ClientInfo from '../component/ClientInfo';
import ClientHistory from '../component/ClientHistory';
import { Box } from '@mui/material';
import Item from '../../../style/ItemStyle';


export default function ClientDetails() {

  return (
    <Box
    sx={{
      bgcolor: 'background.default',
      mx:3,
      mt:3
    }}
  >   
      <Item sx={{pt:7,pb:1,px:7,borderRadius:10}} elevation={5}>
        <ClientInfo/>
        <ClientHistory/>
        </Item>          
         </Box>
  );
}
