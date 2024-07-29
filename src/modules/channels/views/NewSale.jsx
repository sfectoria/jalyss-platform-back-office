import { Box } from '@mui/material';
import React from 'react';
import Item from '../../../style/ItemStyle';
import SearchBar from '../component/SearchBar';
import BarcodeSearch from '../component/BarcodeSearch';
import ItemsList from '../component/ItemsList';

export default function NewSale() {

  return (
       <Box sx={{display:'flex',m:3,width:'100%',gap:3}}>
        <Box sx={{width:'65%'}}>
        <Item sx={{p:4,borderRadius:2,width:'100%'}} elevation={5}>
        <Box sx={{display:'flex',mx:2,gap:2,flexWrap: 'wrap',}}>
            <BarcodeSearch />
            <SearchBar/>
            </Box>
        </Item>
        <Item sx={{p:4,borderRadius:2,width:'100%',mt:4}} elevation={5}>
        <ItemsList/>
        </Item>
        </Box>
        <Box sx={{width:'29%'}}>
        <Item sx={{p:4,borderRadius:2,width:'100%'}} elevation={5}></Item>
       </Box>
       </Box>
  );
}
