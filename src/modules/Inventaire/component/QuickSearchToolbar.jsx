import React from "react";
import {
    GridToolbarContainer,
    GridToolbarQuickFilter
  } from '@mui/x-data-grid';
import Button from '@mui/material/Button';

export default function QuickSearchToolbar({ onDoneClick }) {


    return (
      <GridToolbarContainer sx={{display:'flex',justifyContent:'space-between',px:6,py:3}}>
        <GridToolbarQuickFilter />
        <Button variant="contained" onClick={onDoneClick}>
          Done
        </Button>
      </GridToolbarContainer>
    );
  }