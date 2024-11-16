import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import { DataGrid,GridToolbar,GridActionsCellItem  } from '@mui/x-data-grid';
import { useDemoData } from '@mui/x-data-grid-generator';
import Typography from '@mui/material/Typography';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { useNavigate } from 'react-router-dom';
import Avatar from '@mui/material/Avatar';
import CustomNoResultsOverlay from '../../../style/NoResultStyle'
import { deepOrange } from '@mui/material/colors';
import Item from '../../../style/ItemStyle';
import { Pagination, Stack } from '@mui/material';
import { GridPagination } from "@mui/x-data-grid";
import { styled } from "@mui/material/styles";
import { Button } from '@mui/material';
import axios from 'axios';
import { ip } from '../../../constants/ip';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import CustomNoRowsOverlay from '../../../style/NoRowsStyle';

function BasicPagination() {
  return (
    <Stack spacing={2}>
      <Pagination count={10} color="secondary" />
    </Stack>
  );
}

export default function EmployeesList() {

const [employer,setEmployer]=useState([])
const [employerToDelete, setEmployeToDelete] = useState(null); 
const [confirmDelete, setConfirmDelete] = useState(false);

useEffect(()=>{
  const fetchEmplyer = async()=>{
    try {
      const response = await axios.get(`${ip}/employees/all`)
      setEmployer(response.data)
      console.log("from employers",response.data);
      
    } catch (error) {
      console.log("error fetching data",error);
    }
  }
  fetchEmplyer()
},[])

const handleDeleteClick = (id) => {
  setEmployeToDelete(id);
  setConfirmDelete(true); 
};

const handelDelete = async () => {
  try {
    await axios.delete(`${ip}/employees/${employerToDelete}`);
    setEmployer(employer.filter((employee) => employee.id !== employerToDelete));
    setConfirmDelete(false); 
  } catch (error) {
    console.log('Error deleting employer:', error);
  }
};
  const { data } = useDemoData({
    dataSet: 'Commodity',
    rowLength: 500,
    maxColumns: 6,
  });


  const navigate = useNavigate()
  const handelDetails = (ids) => {
    navigate(`${ids}`);
  };
  // const handelDetails = (ids)=>{
  //   navigate('/stock/location',{state:{id:ids}})
  // }
  const columns = [
    {
      field: "avatar",
      headerName: "Avatar",
      width: 90,
      renderCell: (params) => (
        <Avatar
          src={params.row.media?.path || ""}
          sx={{ bgcolor: deepOrange[500], width: 35, height: 35 }}
        >
          {params.row.firstName?.charAt(0)}
        </Avatar>
      ),
    },
    {
      field: `firstName`,
      headerName: 'Employer Name',
      width: 200,
    },
    {
      field: 'position',
      headerName: 'Post',
      width: 200,
    },
    {
      field: 'postLocation',
      headerName: 'Post Location',
      width: 200,
    },
    {
      field: 'email',
      headerName: 'Email',
      width: 220,
    },
    {
      field: 'phoneNumber',
      headerName: 'Phone Number',
      width: 150,
    },
    {
      field: 'address',
      headerName: 'Address',
      width: 200,
    },
    {
      field: 'actions',
      headerName: 'Actions',
      width: 100,
      type: 'actions',
      getActions: ({ id }) => [
        <GridActionsCellItem
          icon={<VisibilityIcon />}
          label="Details"
          onClick={() => handelDetails(id)}
        />,
        <GridActionsCellItem
          icon={<DeleteOutlineIcon />}
          label="Delete"
          onClick={() => handleDeleteClick(id)} 
          style={{color:"red"}}
        />,
      ],
    },
    
  ];
  
  return (
    <Box
      sx={{
        bgcolor: "background.default",
        mx: 3,
        mt: 3,
      }}
    >
      <Item sx={{ pt: 7, pb: 1, px: 7, borderRadius: 10 }} elevation={5}>
        <Typography variant="h5" mb={3} gutterBottom>
          Employers
        </Typography>
        <div style={{ height: 500 }}>
          <DataGrid
            pageSizeOptions={[7, 10, 20]}
            sx={{
              boxShadow: 0,
              border: 0,
              borderColor: "primary.light",
              "& .MuiDataGrid-cell:hover": {
                color: "primary.main",
              },
            }}
            rows={employer}
            columns={columns}
            slots={{
              noRowsOverlay: CustomNoRowsOverlay,
              noResultsOverlay: CustomNoResultsOverlay,
              toolbar: GridToolbar,
            }}
            initialState={{
              pagination: { paginationModel: { pageSize: 7 } },
              filter: {
                filterModel: {
                  items: [],
                  quickFilterValues: [""],
                },
              },
            }}
            slotProps={{
              toolbar: {
                showQuickFilter: true,
              },
            }}
          />
        </div>
        <BasicPagination />
      </Item>
      {confirmDelete && (
        <Box
          sx={{
            backgroundColor: 'white',
            padding: '20px',
            borderRadius: '8px',
            boxShadow: '0 0 10px rgba(0,0,0,0.1)',
            position: 'fixed',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            zIndex: 1000,
          }}
        >
          <Typography sx={{ fontSize: 20, mb: 2 }}>
            Do you want to delete this, sir?
          </Typography>
          <span style={{ color: 'red' }}>This action is irreversible!</span>

          <Box sx={{ mt: 2, display: 'flex', gap: 2 }}>
            <Button
              variant="contained"
              color="error"
              onClick={handelDelete}
            >
              Yes, Delete
            </Button>
            <Button
              variant="outlined"
              onClick={() => setConfirmDelete(false)} 
            >
              Cancel
            </Button>
          </Box>
        </Box>
      )}
    </Box>
  );
}
