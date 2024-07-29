import { Box } from '@mui/material';
import React from 'react';
import Item from '../../../style/ItemStyle';
import SearchBar from '../component/SearchBar';
import BarcodeSearch from '../component/BarcodeSearch';

export default function NewSale() {

  return (
       <Box sx={{display:'flex',m:3,width:'100%'}}>
        <Box>
        <Item sx={{p:4,borderRadius:2,width:'100%'}} elevation={5}>
        <Box sx={{display:'flex',m:3,gap:2,flexWrap: 'wrap',width:'100%'}}>
            <BarcodeSearch />
            <SearchBar/>
            </Box>
        </Item>
        </Box>
        <Box>
        
       </Box>
       </Box>
  );
}
