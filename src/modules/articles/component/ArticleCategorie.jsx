import React, { useEffect, useState } from 'react';
import Chip from '@mui/material/Chip';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import axios from 'axios';

export default function ArticleCategory({ onCategoryChange }) {
  // Utiliser l'état pour stocker les catégories
  const [bookCategories, setBookCategories] = useState([]);

  useEffect(() => {
    async function fetchCategories() {
      try {
        const response = await axios.get('http://localhost:3000/catgoryArticle/all');
        setBookCategories(response.data); // Mettre à jour l'état avec les données de l'API
      } catch (error) {
        console.error('Erreur lors de la récupération des catégories :', error);
      }
    }

    fetchCategories();
  }, []); // Le tableau vide [] garantit que l'effet est exécuté une seule fois
console.log(bookCategories,"categ")
  return (
    <Stack spacing={3} sx={{ width: '100%' }}>
      <Autocomplete
        multiple
        id="tags-outlined"
        options={bookCategories}
        getOptionLabel={(option) => option.name}
        filterSelectedOptions
        onChange={(event, value) => {
          onCategoryChange(value); // Appelle la fonction pour mettre à jour les catégories sélectionnées
        }}
        renderInput={(params) => (
          <TextField
            {...params}
            label="Categories"
            placeholder="Add Category"
          />
        )}
      />
    </Stack>
  );
}
