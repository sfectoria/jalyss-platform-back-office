import React ,{useState}from 'react';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import { Box } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import ImageUpload from './ImageUpload'

export default function Imagelist() {
  const [itemData, setItemData] = useState( []);
  const [displayedImage, setDisplayedImage] = useState('https://images.unsplash.com/photo-1522770179533-24471fcdba45');

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e,i) => {
        const obj={
          img:e.target.result ,
          title: i,
        }
        setItemData([...itemData,obj]);
        console.log(itemData);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleImageHover = (imgSrc) => {
    setDisplayedImage(imgSrc);
  };
  return (
      <Box>
      <Box> 
      <img
            
            src={displayedImage}
            alt="Displayed"
            loading="lazy"
            width={500}
            height={500}
          />
          </Box>
    <ImageList sx={{ width: 500,mt:2}} cols={4} gap={10} >
      {itemData&&itemData.map((item) => (
        <ImageListItem key={item.img}>
          <Box sx={{width:120,height:120}}>
          <img
            src={item.img}
            alt={item.title}
            loading="lazy"
            onMouseEnter={() => handleImageHover(item.img)}
            height={'100%'}
            width={'100%'}
            />
            </Box>
        </ImageListItem>
      ))}
      {itemData.length<4&&   <ImageUpload handleFileChange={handleFileChange}/>}
    </ImageList>
 

    </Box>
  );
}
