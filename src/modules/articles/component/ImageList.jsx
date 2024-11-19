import React, { useState } from "react";
import { Box, Button } from "@mui/material";
import axios from "axios";

const ImageList = ({ onCoverIdChange }) => {
  const [uploadedImageUrl, setUploadedImageUrl] = useState(null);

  const handleFileUpload = async (event) => {
    const file = event.target.files[0];
    if (file) {
      const uploadData = new FormData();
      uploadData.append("image", file);
      try {
        const uploadResponse = await axios.post(
          "http://localhost:5000/api/upload/image",
          uploadData
        );
        setUploadedImageUrl(URL.createObjectURL(file));
        onCoverIdChange(uploadResponse.data.id); 
      } catch (error) {
        console.error("Error uploading file:", error);
      }
    }
  };

  const handleImageDelete = () => {
    setUploadedImageUrl(null); 
    onCoverIdChange(null); 
  };
  

  return (
    <Box sx={{ position: "relative", display: "inline-block" , mt :20, ml: 5}}>
  {uploadedImageUrl ? (
    <Box
      sx={{
        position: "relative",
        display: "inline-block",
        width: "420px",
        height: "550px",
      }}
    >
      <img
        src={uploadedImageUrl}
        alt="Uploaded cover"
        style={{
          width: "420px",
          height: "420px",
          objectFit: "cover",
          borderRadius: "4px",
        }}
      />
      <Button
        variant="contained"
        sx={{
          position: "absolute",
          top: "8px", 
          right: "8px",
          zIndex: 2,
          backgroundColor: "red",
          "&:hover": {
            backgroundColor: "darkred",
          },
        }}
        onClick={handleImageDelete}
      >
        X
      </Button>
    </Box>
  ) : (
    <Box
      sx={{
        position: "relative",
        display: "inline-block",
        width: "420px",
        height: "550px",
      }}
    >
      <img
        src="https://img.freepik.com/vecteurs-premium/concept-conception-moderne-conception-sans-image-trouvee_637684-247.jpg?w=740"
        alt="No image found"
        style={{
          width: "420px",
          height: "420px",
          objectFit: "cover",
          borderRadius: "4px",
          cursor: "pointer", 
        }}
        onClick={() => document.getElementById("fileInput").click()}
      />
      <input
        id="fileInput"
        type="file"
        onChange={handleFileUpload}
        accept="image/*"
        style={{ display: "none" }} 
      />
    </Box>
  )}
</Box>
  );
};


export default ImageList;