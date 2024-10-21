import React, { useState } from "react";
import axios from "axios";
import { Box, Typography, TextField, Autocomplete, Stack, Alert, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { ip } from "../../../constants/ip";

const UpdateArticle = ({ data1, setIsEditMode,isEditMode}) => {
  const id = data1.id;
  const [nameText, setNameText] = useState("");
  const [barcode, setBarcode] = useState("");
  const [authorText, setAuthorText] = useState("");
  const [publisherText, setPublisherText] = useState("");
  const [description, setDescription] = useState("");
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [articlesNames, setArticlesNames] = useState([]);
  const [articlesAuthors, setArticlesAuthors] = useState([]);
  const [successAlert, setSuccessAlert] = useState(false);
  const [errorAlert, setErrorAlert] = useState(false);
  const [refresh, setRefresh] = useState(false);
  const navigate = useNavigate();

  const handleUpdate = async () => {
    try {
      const updatedArticle = {
        title: nameText,
        code: barcode,
        longDescriptionEn: description,
        articleByAuthor: [{ nameAr: authorText }],
        articleByPublishingHouse: [{ nameAr: publisherText }],
        articleByCategory: selectedCategories.map((cat) => ({ name: cat.name })),
      };

      const response = await axios.patch(`${ip}/articles/${id}`, updatedArticle);
      console.log("Article updated:", response.data);

      if (response.status === 200) {
        setSuccessAlert(true);
        setErrorAlert(false);
        setTimeout(() => {
            navigate('/articles');
          }, 2000);
      } else {
        setErrorAlert(true);
        setSuccessAlert(false);
      }
    } catch (error) {
      setErrorAlert(true);
      setSuccessAlert(false);
      console.error("Error updating article:", error);
    }
  };

  return (
    <Box
      sx={{
        width: "60%",
        height: "auto",
        padding: "20px",
        margin: "0 auto",
        backgroundColor: "#f5f5f5",
        borderRadius: "8px",
        boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
      }}
    >
      <Typography variant="h4" align="center" sx={{ marginBottom: 2 }}>
        Update Article
      </Typography>
      <Box sx={{ display: "flex", gap: 2, marginBottom: 4 }}>
        <Autocomplete
          freeSolo
          sx={{ width: "55%" }}
          options={articlesNames.map((option) => option)}
          onInputChange={(e, value) => setNameText(value)}
          value={nameText}
          renderInput={(params) => <TextField {...params} label="Title" required />}
        />
        <TextField
          required
          label="BarCode"
          sx={{ width: "40%" }}
          value={barcode}
          onChange={(e) => setBarcode(e.target.value)}
        />
      </Box>
      <Box sx={{ display: "flex", gap: 2, marginBottom: 4 }}>
        <Autocomplete
          freeSolo
          sx={{ width: "47%" }}
          options={articlesAuthors.map((option) => option)}
          onInputChange={(e, value) => setAuthorText(value)}
          value={authorText}
          renderInput={(params) => <TextField {...params} label="Author" required />}
        />
        <TextField
          required
          label="Publisher"
          sx={{ width: "40%" }}
          value={publisherText}
          onChange={(e) => setPublisherText(e.target.value)}
        />
      </Box>

      <TextField
        label="Description"
        rows={4}
        sx={{ width: "100%",}}
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />

      <Stack sx={{ width: "100%" }} spacing={2}>
        {successAlert && (
          <Alert severity="success" onClose={() => setSuccessAlert(false)}>
            Article updated successfully!
          </Alert>
        )}
        {errorAlert && (
          <Alert severity="error" onClose={() => setErrorAlert(false)}>
            Error updating article. Please try again.
          </Alert>
        )}
      </Stack>

      <Box sx={{ display: "flex", justifyContent: "space-between", marginTop: 4 }}>
        <Button
          variant="contained"
          sx={{ backgroundColor: "#48184c", color: "white", "&:hover": { backgroundColor: "#361038" } }}
          onClick={handleUpdate}
        >
          Update Article
        </Button>
        <Button
          variant="outlined"
          sx={{ borderColor: "#48184c", color: "#48184c", "&:hover": { backgroundColor: "#f5f5f5" } }}
          onClick={()=>setIsEditMode(!isEditMode)}
        >
          Cancel
        </Button>
      </Box>
    </Box>
  );
};

export default UpdateArticle;