import React from "react";
import {
    GridToolbarContainer,
    GridToolbarQuickFilter
  } from '@mui/x-data-grid';
import Button from '@mui/material/Button';
import Box from '@mui/material/Button'


export default function QuickSearchToolbar({ onDoneClick, onSaveAllClick }) {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "end",
        gap :2,
        alignItems: "center",
        padding: "8px",
      }}
    >
      <Button variant="contained" color="secondary" onClick={onSaveAllClick}>
        Save All
      </Button>
      <Button variant="outlined" color="secondary" onClick={onDoneClick}>
        Done
      </Button>
    </Box>
  );
}
