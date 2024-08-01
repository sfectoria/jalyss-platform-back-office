import { Box } from '@mui/material';
import React from 'react';
import Item from '../../../style/ItemStyle';
import ItemsList from '../component/ItemsList';
import SearchArticle from '../component/SearchArticle';

export default function NewSale() {

  return (
       <Box sx={{display:'flex',m:3,width:'100%',gap:3}}>
        <Box sx={{width:'65%'}}>
        <Item sx={{p:4,borderRadius:2,width:'100%'}} elevation={5}>
        <SearchArticle/>
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
