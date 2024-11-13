import React, { useEffect, useState } from 'react';
import Chip from '@mui/material/Chip';
import Autocomplete, { createFilterOptions } from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import axios from 'axios';

export default function ArticlePublisher({ onCategoryChange }) {
  // const [bookCategories, setBookCategories] = useState([]);
  const [bookPublisherText, setBookPublisherText] = useState([]);
  const [newCategory, setNewCategory] = useState(null);
  useEffect(() => {
    async function fetchPublisher() {
      try {
        const response = await axios.get('http://localhost:3000/publishingHouses/all');
        setBookPublisherText(response.data);
      } catch (error) {
        console.error('Erreur lors de la récupération des catégories :', error);
      }
    }

    fetchPublisher();
  }, []);

  const handleCreateCategory = async (newPublisherName) => {
    
    
    try {
      const response = await axios.post('http://localhost:3000/publishingHouses/create', { nameAr: newPublisherName,nameEn:newPublisherName });
      const createdPublisher = response.data;
      console.log("new",newPublisherName,createdPublisher);
      setBookPublisherText((prevCategories) => [...prevCategories, createdPublisher]);
      return createdPublisher;
    } catch (error) {
      console.error('Erreur lors de la création de publisher  :', error);
    }
  };

  const filter = createFilterOptions();

  return (
    <Stack spacing={3} sx={{ width: '100%' }}>
      <Autocomplete
        multiple
        id="tags-outlined"
        options={bookPublisherText}
        getOptionLabel={(option) => option.nameAr || option}
        filterSelectedOptions
        filterOptions={(options, params) => {
          const filtered = filter(options, params);
          if (params.inputValue !== '' && !bookPublisherText.some(category => category.nameAr === params.inputValue)) {
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
            const createdPublisher = await handleCreateCategory(lastValue.inputValue);
            onCategoryChange([...value.slice(0, -1), createdPublisher]);
          } else {
            onCategoryChange(value);
          }
        }}
        renderInput={(params) => (
          <TextField
            {...params}
            label="Publishing House"
            placeholder="Add Publisher"
          />
        )}
      />
    </Stack>
  );
}
