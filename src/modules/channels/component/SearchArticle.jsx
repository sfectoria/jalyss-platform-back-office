import  React from 'react';
import Box  from '@mui/material/Box';
import BarcodeSearch from './BarcodeSearch';
import SearchBar from './SearchBar';

export default function SearchArticle() {
  return (
<Box sx={{display:'flex',m:2,gap:2,flexWrap: 'wrap',}}>
            <BarcodeSearch />
            <SearchBar/>
            </Box>
  );
}
