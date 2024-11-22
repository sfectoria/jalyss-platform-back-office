import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Box,
  Typography,
  TextField,
  Autocomplete,
  Stack,
  Alert,
  Button,
  Chip,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { ip } from "../../../constants/ip";

const UpdateArticle = ({ data1, setIsEditMode, isEditMode }) => {
  const id = data1.id;
  const [publisherText, setPublisherText] = useState([]);
  const [nameText, setNameText] = useState("");
  const [barcode, setBarcode] = useState("");
  const [shortDescriptionEn, setShortDescriptionEn] = useState("");
  const [shortDescriptionAr, setShortDescriptionAr] = useState("");
  const [descriptionEn, setDescriptionEn] = useState("");
  const [descriptionAr, setDescriptionAr] = useState("");
  const [weight, setWeight] = useState("");
  const [pageNumber, setPageNumber] = useState("");
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [articlesAuthors, setArticlesAuthors] = useState([]);
  const [selectedAuthors, setSelectedAuthors] = useState([]);
  const [allPublishers, setAllPublishers] = useState([]);
  const [allCategories, setAllCategories] = useState([]);
  const [successAlert, setSuccessAlert] = useState(false);
  const [errorAlert, setErrorAlert] = useState(false);
  const [avatar, setAvatar] = useState(null);
  const [coverId, setCoverId] = useState(null);
  const navigate = useNavigate();

  const fetchInitialData = async () => {
    try {
      const [authorsRes, publishersRes, categoriesRes] = await Promise.all([
        axios.get(`${ip}/author`),
        axios.get(`${ip}/publishingHouses/all`),
        axios.get("http://localhost:3000/catgoryArticle/all"),
      ]);
      setArticlesAuthors(authorsRes.data);
      setAllPublishers(publishersRes.data);
      setAllCategories(categoriesRes.data);
    } catch (error) {
      console.error("Error fetching initial data:", error);
    }
  };

  useEffect(() => {
    fetchInitialData();
  }, []);

  useEffect(() => {
    if (data1) {
      setNameText(data1.title || "");
      setBarcode(data1.code || "");
      setShortDescriptionEn(data1.shortDescriptionEn || "");
      setShortDescriptionAr(data1.shortDescriptionAr || "");
      setDescriptionEn(data1.longDescriptionEn || "");
      setDescriptionAr(data1.longDescriptionAr || "");
      setWeight(data1.weight || "");
      setPageNumber(data1.pageNumber || "");
      setSelectedCategories(
        data1.articleByCategory.map((cat) => cat.categoryArticle.name) || []
      );
      setPublisherText(
        data1.articleByPublishingHouse.map((pub) => pub.publishingHouse.nameAr) || []
      );
      setSelectedAuthors(
        data1.articleByAuthor.map((author) => author.nameAr) || []
      );
      setCoverId(data1.coverId || null);
      setAvatar(null);
    }
  }, [data1]);

  const handleFileUpload = async (event) => {
    const file = event.target.files[0];
    if (file) {
      const formData = new FormData();
      formData.append("image", file);

      try {
        const response = await axios.post(
          `http://localhost:5000/api/upload/image`,
          formData
        );
        setCoverId(response.data.id);
        setAvatar(file);
      } catch (error) {
        console.error("Error uploading image:", error);
        setErrorAlert(true);
        setSuccessAlert(false);
      }
    }
  };

  const handleUpdate = async () => {
    try {
      const updatedArticle = {
        title: nameText,
        code: barcode,
        shortDescriptionEn,
        shortDescriptionAr,
        longDescriptionEn: descriptionEn,
        longDescriptionAr: descriptionAr,
        weight: parseFloat(weight) || null,
        pageNumber: parseInt(pageNumber, 10) || null,
        articleByAuthor: selectedAuthors.map((author) => ({
          nameAr: author,
        })),
        articleByPublishingHouse: publisherText.map((name) => ({
          publishingHouse: name,
        })),
        articleByCategory: selectedCategories.map((e) => ({
          categoryArticle: e,
        })),
        coverId: coverId || null,
      };

      const formData = new FormData();
      formData.append("article", JSON.stringify(updatedArticle));

      if (avatar) {
        formData.append("avatar", avatar);
        console.log("Avatar to be uploaded:", avatar); // Log the avatar being uploaded
      }

      // Log the data before sending to the backend
      console.log("Updated Article Data:", updatedArticle);
      console.log("Form Data:", formData);

      const response = await axios.patch(`${ip}/articles/${id}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      if (response.status === 200) {
        setSuccessAlert(true);
        setErrorAlert(false);

        // Log the updated data returned from API
        console.log("Updated Article Response:", response.data);

        setTimeout(() => {
          navigate("/articles");
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
        padding: "20px",
        margin: "0 auto",
        backgroundColor: "white",
        borderRadius: "8px",
        boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
      }}
    >
      <Typography variant="h4" align="center" sx={{ marginBottom: 2, color: "#48184c" }}>
        Update Article
      </Typography>
      <TextField
        label="Title"
        fullWidth
        value={nameText}
        onChange={(e) => setNameText(e.target.value)}
        sx={{ marginBottom: 2 }}
      />
      <TextField
        label="Barcode"
        fullWidth
        value={barcode}
        onChange={(e) => setBarcode(e.target.value)}
        sx={{ marginBottom: 2 }}
      />
      <TextField
        label="Short Description (English)"
        fullWidth
        value={shortDescriptionEn}
        onChange={(e) => setShortDescriptionEn(e.target.value)}
        sx={{ marginBottom: 2 }}
      />
      <TextField
        label="Short Description (Arabic)"
        fullWidth
        value={shortDescriptionAr}
        onChange={(e) => setShortDescriptionAr(e.target.value)}
        sx={{ marginBottom: 2 }}
      />
      <TextField
        label="Description (English)"
        fullWidth
        multiline
        minRows={4}
        value={descriptionEn}
        onChange={(e) => setDescriptionEn(e.target.value)}
        sx={{ marginBottom: 2 }}
      />
      <TextField
        label="Description (Arabic)"
        fullWidth
        multiline
        minRows={4}
        value={descriptionAr}
        onChange={(e) => setDescriptionAr(e.target.value)}
        sx={{ marginBottom: 2 }}
      />
      <TextField
        label="Weight"
        fullWidth
        type="number"
        value={weight}
        onChange={(e) => setWeight(e.target.value)}
        sx={{ marginBottom: 2 }}
      />
      <TextField
        label="Page Number"
        fullWidth
        type="number"
        value={pageNumber}
        onChange={(e) => setPageNumber(e.target.value)}
        sx={{ marginBottom: 2 }}
      />
      <Autocomplete
        multiple
        options={articlesAuthors.map((author) => author.nameAr)}
        value={selectedAuthors}
        onChange={(event, newValue) => setSelectedAuthors(newValue)}
        renderTags={(value, getTagProps) =>
          value.map((option, index) => <Chip label={option} {...getTagProps({ index })} />)
        }
        renderInput={(params) => <TextField {...params} label="Authors" />}
        sx={{ marginBottom: 2 }}
      />
      <Autocomplete
        multiple
        options={allPublishers.map((pub) => pub.nameAr)}
        value={publisherText}
        onChange={(event, newValue) => setPublisherText(newValue)}
        renderTags={(value, getTagProps) =>
          value.map((option, index) => <Chip label={option} {...getTagProps({ index })} />)
        }
        renderInput={(params) => <TextField {...params} label="Publishing Houses" />}
        sx={{ marginBottom: 2 }}
      />
      <Autocomplete
        multiple
        options={allCategories.map((cat) => cat.name)}
        value={selectedCategories}
        onChange={(event, newValue) => setSelectedCategories(newValue)}
        renderTags={(value, getTagProps) =>
          value.map((option, index) => <Chip label={option} {...getTagProps({ index })} />)
        }
        renderInput={(params) => <TextField {...params} label="Categories" />}
        sx={{ marginBottom: 2 }}
      />
      <Box sx={{ marginBottom: 2 }}>
        <Typography>Cover Image</Typography>
        <input
          accept="image/*"
          type="file"
          onChange={handleFileUpload}
        />
      </Box>
      {successAlert && (
        <Alert severity="success">Article updated successfully!</Alert>
      )}
      {errorAlert && <Alert severity="error">Error updating article!</Alert>}
      <Stack direction="row" spacing={2} sx={{ justifyContent: "center" }}>
        <Button
          variant="contained"
          sx={{ backgroundColor: "#48184c", color: "white" }}
          onClick={handleUpdate}
        >
          Update Article
        </Button>
      </Stack>
    </Box>
  );
};

export default UpdateArticle;
