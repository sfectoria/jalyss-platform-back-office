import React, { useEffect, useState } from 'react';
import Chip from '@mui/material/Chip';
import Autocomplete, { createFilterOptions } from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import axios from 'axios';

export default function ArticleCategory({ onCategoryChange }) {
  const [bookCategories, setBookCategories] = useState([]);
  const [newCategory, setNewCategory] = useState(null);

  useEffect(() => {
    async function fetchCategories() {
      try {
        const response = await axios.get('http://localhost:3000/catgoryArticle/all');
        setBookCategories(response.data);
      } catch (error) {
        console.error('Erreur lors de la récupération des catégories :', error);
      }
    }

    fetchCategories();
  }, []);

  const handleCreateCategory = async (newCategoryName) => {
    try {
      const response = await axios.post('http://localhost:3000/catgoryArticle/create', { name: newCategoryName });
      const createdCategory = response.data;
      setBookCategories((prevCategories) => [...prevCategories, createdCategory]);
      return createdCategory; // Retourne la nouvelle catégorie pour la sélectionner automatiquement
    } catch (error) {
      console.error('Erreur lors de la création de la catégorie :', error);
    }
  };

  const filter = createFilterOptions();

  return (
    <Stack spacing={3} sx={{ width: '100%' }}>
      <Autocomplete
        multiple
        id="tags-outlined"
        options={bookCategories}
        getOptionLabel={(option) => option.name || option}
        filterSelectedOptions
        filterOptions={(options, params) => {
          const filtered = filter(options, params);
          // Suggérer de créer une nouvelle catégorie si elle n'existe pas encore
          if (params.inputValue !== '' && !bookCategories.some(category => category.name === params.inputValue)) {
            filtered.push({
              inputValue: params.inputValue,
              name: `Add "${params.inputValue}"`,
            });
          }
          return filtered;
        }}
        onChange={async (event, value) => {
          const lastValue = value[value.length - 1];
          if (lastValue && lastValue.inputValue) {
            const createdCategory = await handleCreateCategory(lastValue.inputValue);
            onCategoryChange([...value.slice(0, -1), createdCategory]);
          } else {
            onCategoryChange(value);
          }
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
