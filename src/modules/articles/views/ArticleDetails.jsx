import React from 'react';
import Box from '@mui/material/Box';
import Item from '../../../style/ItemStyle';
import ArticleDescription from '../component/ArticleDescription';
import ArticleInStocks from '../component/ArticleInStocks';

export default function ArticleDetails() {

  return (
          <Box
            sx={{
              bgcolor: 'background.default',
              mx:3,
              mt:3
            }}
          >
            <Item sx={{ py: 5, px: 10, borderRadius: 10 }} elevation={5}>
              <ArticleDescription/>
              <ArticleInStocks/>
              </Item>
          </Box>
  );
}
