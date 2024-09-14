import React ,{useState , useEffect}from 'react';
import Box from '@mui/material/Box';
import Item from '../../../style/ItemStyle';
import ArticleDescription from '../component/ArticleDescription';
import ArticleInStocks from '../component/ArticleInStocks';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { ip } from '../../../constants/ip';

export default function ArticleDetails() {
  const [data,setData]=useState({})
  const [articleInStocks,setArticleInStocks]=useState({})

  const param=useParams()
  console.log(param);

  useEffect(()=>{
    fetchArticle()
  },[])
  
  const fetchArticle=async()=>{
    const response=await axios.get(`${ip}/articles/${param.id}`)
    setData(response.data)
    setArticleInStocks(response.data.stockArticle)
  }
   
  return (
          <Box
            sx={{
              bgcolor: 'background.default',
              mx:3,
              mt:3
            }}
          >
            <Item sx={{ py: 5, px: 10, borderRadius: 10 }} elevation={5}>
              <ArticleDescription data={data}/>
              <ArticleInStocks data={articleInStocks}/>
              </Item>
          </Box>
  );
}
