import React, { useEffect, useState } from 'react';
import Chip from '@mui/material/Chip';
import Autocomplete, { createFilterOptions } from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import axios from 'axios';

export default function ArticleAuthor({ onCategoryChange }) {
  // const [bookCategories, setBookCategories] = useState([]);
  const [bookAuthorText, setBookAuthorText] = useState([]);
  const [newCategory, setNewCategory] = useState(null);
  useEffect(() => {
    async function fetchPublisher() {
      try {
        const response = await axios.get('http://localhost:3000/author');
        setBookAuthorText(response.data);
      } catch (error) {
        console.error('Erreur lors de la récupération des auteur :', error);
      }
    }

    fetchPublisher();
  }, []);

  const handelCreateAuthor = async (newAuthorName) => {
    
    
    try {
      const response = await axios.post('http://localhost:3000/author', { nameAr: newAuthorName });
      const createdAuthor = response.data;
      console.log("new",newAuthorName,createdAuthor);
      setBookAuthorText((prevCategories) => [...prevCategories, createdAuthor]);
      return createdAuthor;
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
        options={bookAuthorText}
        getOptionLabel={(option) => option.nameAr || option}
        filterSelectedOptions
        filterOptions={(options, params) => {
          const filtered = filter(options, params);
          if (params.inputValue !== '' && !bookAuthorText.some(category => category.nameAr === params.inputValue)) {
            filtered.push({
              inputValue: params.inputValue,
              nameAr: `Add "${params.inputValue}"`,
            });
          }
          return filtered;
        }}
        onChange={async (event, value) => {
          const lastValue = value[value.length - 1];
          if (lastValue && lastValue.inputValue) {
            const createdAuthor = await handelCreateAuthor(lastValue.inputValue);
            onCategoryChange([...value.slice(0, -1), createdAuthor]);
          } else {
            onCategoryChange(value);
          }
        }}
        renderInput={(params) => (
          <TextField
            {...params}
            label="Author"
            placeholder="Add Author"
          />
        )}
      />
    </Stack>
  );
}
