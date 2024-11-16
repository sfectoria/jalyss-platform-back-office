import React, { useEffect, useState, forwardRef, useImperativeHandle } from "react";
import { Avatar, Box, Typography } from "@mui/material";
import ArticleCategory from "./ArticleCategorie";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import axios from "axios";
import { ip } from "../../../constants/ip";
import { Button } from "react-bootstrap";
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import logo from '../../../assets/JALYSS.png';
import { useNavigate } from "react-router-dom";
import ArticlePublisher from "./ArticlePublishingHouses";
import ArticleAuthor from "./ArticleAuthor";

const ArticleInfo = forwardRef(({ onSubmit }, ref) => {
  const [articlesNames, setArticlesNames] = useState([]);
  const [articlesAuthors, setArticlesAuthors] = useState([]);
  // const [articlesAuthors, setArticlesAuthors] = useState([]);
  const [articlesPubHouses, setArticlesPubHouses] = useState([]);
  const [nameText, setNameText] = useState("");
  const [authorText, setAuthorText] = useState([]);
  const [publisherText, setPublisherText] = useState([]);
  const [shortDescriptionEn, setShortDescriptionEn] = useState("");
  const [shortDescriptionAr, setShortDescriptionAr] = useState("");
  const [weight, setWeight] = useState("");
  const [pageNumber, setPageNumber] = useState("")
  const [descriptionAr, setDescriptionAr] = useState("");
  const [descriptionEn, setDescriptionEn] = useState("");
  const [barcode, setBarcode] = useState("");
  const [refresh, setRefresh] = useState(false);
  const [successAlert, setSuccessAlert] = useState(false);  
  const [errorAlert, setErrorAlert] = useState(false);  
  const [selectedCategories, setSelectedCategories] = useState([]); 
  const [file, setFile] = useState(null); 
  const [error, setError] = useState(false);
  const [barcodeError, setBarcodeError] = useState(false);



  useEffect(() => {
    fetchArticleChoices();
  }, [refresh]);

  useEffect(() => {
    const checkLocalStorage = setInterval(() => {
      const storedFile = localStorage.getItem('uploadedFile');
      if (storedFile) {
        const byteCharacters = atob(storedFile.split(',')[1]); 
        const byteNumbers = new Uint8Array(byteCharacters.length);
        for (let i = 0; i < byteCharacters.length; i++) {
          byteNumbers[i] = byteCharacters.charCodeAt(i);
        }
        const fileBlob = new Blob([byteNumbers], { type: 'image/jpeg' });
        const newFile = new File([fileBlob], 'uploaded-image.jpg', { type: 'image/jpeg' });
        setFile(newFile); 
      } else {
        setFile(null);
      }
    }, 1000); 

    return () => clearInterval(checkLocalStorage); // Clean up the interval on unmount
  }, []);
  const fetchArticleChoices = async () => {
    let params = { take: 5 };
    if (nameText) params["text"] = nameText;
    const response = await axios.get(`${ip}/articles/getAll`, { params });
    setArticlesNames(response.data.data.map((e) => e.title));
    // setArticlesAuthors(
    //   response.data.data.reduce((acc, e) => {
    //     if (e.articleByAuthor.length) {
    //       acc.push(e.articleByAuthor[0]?.author.nameAr);
    //     }
    //     return acc;
    //   }, [])
    // );
  };


  const fetchAuthors = async () => {
    try {
      const response = await axios.get(`${ip}/author`);
      setArticlesAuthors(response.data);
    } catch (error) {
      console.error("Error fetching authors data:", error);
    }
  };
  const fetchPublishingHouses = async () => {
    try {
      const response = await axios.get(`${ip}/publishingHouses/all`);
      setArticlesPubHouses(response.data);
    } catch (error) {
      console.error("Error fetching authors data:", error);
    }
  };

  useEffect(() => {
    fetchAuthors();
    fetchPublishingHouses()
  }, []);
  // const retrieveFileFromLocalStorage = () => {
  //   const storedFile = localStorage.getItem('uploadedFile'); // Assurez-vous d'utiliser la clé correcte
  //   if (storedFile) {
  //     const byteCharacters = atob(storedFile.split(',')[1]); // Decode Base64 string
  //     const byteNumbers = new Uint8Array(byteCharacters.length);
  //     for (let i = 0; i < byteCharacters.length; i++) {
  //       byteNumbers[i] = byteCharacters.charCodeAt(i);
  //     }
  //     const fileBlob = new Blob([byteNumbers], { type: 'image/jpeg' }); // Changez le type MIME si nécessaire
  //     const newFile = new File([fileBlob], 'uploaded-image.jpg', { type: 'image/jpeg' });
  //     setFile(newFile); // Mettre à jour le fichier
  //     console.log("there is")
  //   } else {
  //     setFile(null); // Si pas de fichier dans le localStorage, réinitialiser
  //     console.log("no file")
  //   }
  // };

  const navigate = useNavigate();
  // console.log("fff",setPublisherText);

  const handleSubmit = async () => {
    if (!nameText.trim()) {
      setError(true); 
      return;
    }
    if (!barcode.trim()) {
      setBarcodeError(true);
    } else {
      setBarcodeError(false);
    }
    
    if (!nameText.trim() || !barcode.trim()) {
      return;
    }
 
    try {
      // Create  article without image first
      const newArticle = {
        title: nameText,
        code: barcode,
        shortDescriptionEn,
        shortDescriptionAr,
        longDescriptionEn: descriptionEn,
        longDescriptionAr : descriptionAr,
        weight: parseFloat(weight) || null,
      pageNumber: parseInt(pageNumber, 10) || null,
        articleByAuthor: authorText.map((cat) => ({ nameAr: cat.nameAr })),
        articleByPublishingHouse:publisherText.map((cat) => ({ nameAr: cat.nameAr })),
        articleByCategory: selectedCategories.map((cat) => ({ name: cat.name })),
      };
  
      const response = await axios.post(`${ip}/articles/create`, newArticle);
      console.log("Article created:", response.data);
  
      if (response.status === 201) {

        let uploadedImageUrl = null;
        if (file) {
          const formData = new FormData();
          formData.append('image', file);
  
          const uploadResponse = await axios.post('http://localhost:5000/api/upload/image', formData, {
            headers: { 'Content-Type': 'multipart/form-data' },
          });
          console.log("Image uploaded:", uploadResponse.data);
          uploadedImageUrl = uploadResponse.data.id; 
        }
  
        if (uploadedImageUrl) {
          await axios.patch(`${ip}/articles/${response.data.id}`, { coverId: uploadedImageUrl });
        }
  
        setSuccessAlert(true);
        setErrorAlert(false);  
        setTimeout(() => navigate("/articles"), 2500);
        localStorage.removeItem('uploadedFile'); 
      } else {
        setErrorAlert(true);
        setSuccessAlert(false);  
      }
      setRefresh(!refresh);
    } catch (error) {
      setErrorAlert(true);
      setSuccessAlert(false);  
      console.error("Error creating article:", error);
    }
  };  

  useImperativeHandle(ref, () => ({
    submit: handleSubmit,
  }));

  return (
    <Box sx={{ width: "100%" }}>

      <Box sx={{ display: "flex", justifyContent: "center", mb: 6 }}>
        <Typography variant="h1" sx={{ textAlign :'center'}}>New Article</Typography>
      </Box>
      <Box sx={{ display: "flex", gap: 2, mb: 3 }}>
        <Autocomplete
          id="free-solo-demo"
          freeSolo
          sx={{ width: "55%" }}
          options={articlesNames.map((option) => option)}
          onInputChange={(e, value) => {
            setNameText(value);
            setRefresh(!refresh);
          }}
          renderInput={(params) => (
            <TextField {...params} label="Title"  required
            error={error}
            helperText={error ? "Title is required" : ""} />
          )}
        />
        <TextField
          required
          id="outlined-required"
          label="BarCode"
          sx={{ width: "40%" }}
          value={barcode}
          onChange={(e) => setBarcode(e.target.value)}
          error={barcodeError}
          helperText={barcodeError ? "Barcode is required" : ""}
        />
      </Box>
      <Box sx={{ display: "flex", gap: 2, mb: 3}}>
        <ArticleAuthor onCategoryChange={setAuthorText}/>
        </Box>
      <Box sx={{ display: "flex", gap: 2, mb: 3 }}>
  <TextField
    id="short-description-en"
    label="Short Description (English)"
    sx={{ width: "100%" }}
    value={shortDescriptionEn}
    onChange={(e) => setShortDescriptionEn(e.target.value)}
  />
</Box>

<Box sx={{ display: "flex", gap: 2, mb: 3 }}>
  <TextField
    id="short-description-ar"
    label="Short Description (Arabic)"
    sx={{ width: "100%"}}
    value={shortDescriptionAr}
    onChange={(e) => setShortDescriptionAr(e.target.value)}
  />
</Box>
        <Box sx={{ display: "flex", gap: 2, mb: 3}}>
        <ArticlePublisher  onCategoryChange={setPublisherText}/>
        </Box>
      
        <TextField
        id="outlined-multiline-static"
        label="Description (English)"
        rows={4}
        sx={{ width: "100%", mb: 3 }}
        value={descriptionEn}
        onChange={(e) => setDescriptionEn(e.target.value)}
      /> 
      <TextField
      id="outlined-multiline-static"
      label="Description (Arabic)"
      rows={4}
      sx={{ width: "100%", mb: 3 }}
      value={descriptionAr}
      onChange={(e) => setDescriptionAr(e.target.value)}
    />


<Box sx={{ display: "flex", gap: 2, mb: 3 }}>
  <TextField
    id="page-number"
    label="Page Number"
    type="number"
    sx={{ width: "50%" }}
    value={pageNumber}
    onChange={(e) => setPageNumber(e.target.value)}
  />
  <TextField
    id="weight"
    label="Weight (kg)"
    type="number"
    sx={{ width: "50%" }}
    value={weight}
    onChange={(e) => setWeight(e.target.value)}
  />
</Box>
      <Box sx={{ display: "flex", gap: 2, mb: 3}}>
      <ArticleCategory onCategoryChange={setSelectedCategories}/>
      </Box>
      
      <Stack sx={{ width: '100%' }} spacing={2}>
        {successAlert && (
          <Alert severity="success" onClose={() => setSuccessAlert(false)}>
            Article created successfully!
          </Alert>
        )}
        {errorAlert && (
          <Alert severity="error" onClose={() => setErrorAlert(false)}>
            Error creating article. Please try again.
          </Alert>
        )}
      </Stack>
    </Box>
  );
});

export default ArticleInfo;







{/* <Autocomplete
          freeSolo
          sx={{ width: "47%" }}
          options={articlesAuthors.map((option) => option.nameAr)}  
          onInputChange={(e, value) => setAuthorText(value)}
          value={authorText}
          renderInput={(params) => <TextField {...params} label="Author" required />}
        /> */}
      {/* <Autocomplete
          freeSolo
          sx={{ width: "47%" }}
          options={articlesPubHouses.map((option) => option.nameAr)}  
          onInputChange={(e, value) => setPublisherText(value)}
          value={publisherText}
          renderInput={(params) => <TextField {...params} label="Publishing Houses" required />}
        /> */}