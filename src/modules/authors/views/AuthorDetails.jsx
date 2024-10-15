import React from 'react';
import { Box } from '@mui/material';
import Item from '../../../style/ItemStyle';
import AuthorInfo from '../components/AuthorInfo';


export default function AuthorDetails() {

  return (
    <Box
    sx={{
      bgcolor: 'background.default',
      mx:3,
      mt:3
    }}
  >   
      <Item sx={{pt:7,pb:1,px:7,borderRadius:10}} elevation={5}>
        <AuthorInfo/>
        </Item>          
         </Box>
  );
}
