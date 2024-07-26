import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Item from '../../../style/ItemStyle';
import ArticleDescription from '../component/ArticleDescription';
import ArticleInStocks from '../component/ArticleInStocks';

export default function ArticleDetails() {

  return (
          <Box
            sx={{
              pt: 7,
              bgcolor: 'background.default',
              marginLeft: '20%',
              marginRight: 2,
            }}
          >
            <Item sx={{ py: 5, px: 10, borderRadius: 10 }} elevation={5}>
              <ArticleDescription/>
              <ArticleInStocks/>
              </Item>
          </Box>
  );
}
