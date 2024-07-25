import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Item from '../../../style/ItemStyle';

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
              <Box sx={{display:'flex',gap:10}}>
      <Box >
        <Typography align='right' color='#1a237e' variant='h3'  mb={3} gutterBottom sx={{fontWeight: 'bold' }}>
                الاب الغني و الاب الفقير
              </Typography>
              <Typography marginLeft={7} align='right'  mb={3} gutterBottom sx={{fontWeight: 'bold' }}>
              يحكي الكاتب قصة طفولته، الموزعة بين نصائح أبيه الأستاذ الجامعي والذي يرمز له في الكتاب بلقب الأب الفقير، وبين نصائح والد صديقه مايك، رجل الأعمال العصامي والذي يرمز له في الكتاب بلقب الأب الغني. يسرد الكتاب طفولة الكاتب وهو يتعلم كيف يحصل على المال ويكتسبه، مع مقارنة دائمه ما بين وضعي والده الأكاديمي الجامعي، ووالد صديقه العملي التجاري.              </Typography>
              </Box>
              <img
              width={250}
        src={'https://daroueya.com/wp-content/uploads/2023/05/%D8%A7%D9%84%D8%A3%D8%A8-%D8%A7%D9%84%D8%BA%D9%86%D9%8A-%D8%A7%D9%84%D8%A3%D8%A8-%D8%A7%D9%84%D9%81%D9%82%D9%8A%D8%B1-1.jpg'}
        alt={"fff"}
        loading="lazy"
      />
      </Box>
      
              </Item>
          </Box>
  );
}
