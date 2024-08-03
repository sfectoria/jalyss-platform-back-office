import React from 'react';
import Chip from '@mui/material/Chip';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';

export default function ArticleCatigorie() {
  return (
    <Stack spacing={3} sx={{ width: '100%' }}>
      <Autocomplete
        multiple
        id="tags-outlined"
        options={bookCategories}
        getOptionLabel={(option) => option.title}
        // defaultValue={[top100Films[13]]}
        filterSelectedOptions
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

const bookCategories = [
    { id: 1, title: 'Fiction' },
    { id: 2, title: 'Non-Fiction' },
    { id: 3, title: 'Science Fiction' },
    { id: 4, title: 'Fantasy' },
    { id: 5, title: 'Mystery' },
    { id: 6, title: 'Biography' },
    { id: 7, title: 'History' },
    { id: 8, title: 'Romance' },
    { id: 9, title: 'Self-Help' },
    { id: 10, title: 'Children\'s' }
  ];
  