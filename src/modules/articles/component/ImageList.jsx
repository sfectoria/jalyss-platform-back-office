import React, { useEffect, useState } from 'react';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import { Box, Button, IconButton } from '@mui/material';
import axios from 'axios';
import CancelIcon from '@mui/icons-material/Cancel'; // Nouvelle icône
import ImageUpload from './ImageUpload'

export default function Imagelist() {
  const [itemData, setItemData] = useState(null); // Store only one image
  const [displayedImage, setDisplayedImage] = useState('https://img.freepik.com/vecteurs-premium/concept-conception-moderne-conception-sans-image-trouvee_637684-247.jpg?w=740');
  const [file, setFile] = useState(null);


  useEffect(() => {
    const storedFile = localStorage.getItem('uploadedFile');
    if (storedFile) {
      setDisplayedImage(storedFile); // nitfa9dou el localStorage ken fih image or not first
      setItemData({ img: storedFile, title: 'Uploaded Image' }); 
    }
  }, []);


  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0]; 
    if (selectedFile) {
      setFile(selectedFile);
      console.log("file",selectedFile)
      const reader = new FileReader();
      reader.onload = (e) => {
        const base64String = e.target.result; //n7awlou lil string 9bal
        console.log("str",base64String)
        localStorage.setItem('uploadedFile', base64String); 
        setItemData({ img: base64String, title: selectedFile.name }); 
        setDisplayedImage(base64String); 
      };
      reader.readAsDataURL(selectedFile); // Read file as URL
    }
  };

  const handleRemoveImage = () => {
    setItemData(null);
    setDisplayedImage('https://img.freepik.com/vecteurs-premium/concept-conception-moderne-conception-sans-image-trouvee_637684-247.jpg?w=740');
    setFile(null);
    localStorage.removeItem('uploadedFile'); 
  };

  return (
    <Box>
      <Box sx={{ position: 'relative', display: 'inline-block' }}>
      <img
          src={displayedImage} // Display the selected/uploaded image
          alt="Displayed"
          loading="lazy"
          width={500}
          height={500}
        />
           {itemData && (
          <IconButton 
            sx={{ 
              position: 'absolute', 
              top: 8, 
              right: 8, 
              bgcolor: 'red', // Changer le fond en rouge
              color: 'white', // Couleur du "X"
              '&:hover': {
                bgcolor: 'darkred' // Couleur du fond au hover
              }
            }} 
            onClick={handleRemoveImage}
          >
            <CancelIcon />
          </IconButton>
        )}
      </Box>
      <ImageList sx={{ width: 500, mt: 2 }} cols={4} gap={10}>
        {/* {itemData && (
          <ImageListItem key={itemData.img}>
            <Box sx={{ width: 120, height: 120 }}>
              <img
                src={itemData.img}
                alt={itemData.title}
                loading="lazy"
                height={'100%'}
                width={'100%'}
              />
            </Box>
          </ImageListItem>
        )} */}
        {!itemData && (
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <ImageUpload handleFileChange={handleFileChange} />
          </Box>
        )}
      </ImageList>
    </Box>
  );
}
