import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import { DataGrid, GridToolbar, GridActionsCellItem } from "@mui/x-data-grid";
import Typography from "@mui/material/Typography";
import VisibilityIcon from "@mui/icons-material/Visibility";
import Tooltip from '@mui/material/Tooltip';
import UnarchiveSharpIcon from '@mui/icons-material/UnarchiveSharp';
import ArchiveAuthorSnackBar from "../../authors/components/ArchiveAuthorSnackBar";
import Avatar from "@mui/material/Avatar";
import { grey } from "@mui/material/colors";
import { useNavigate } from "react-router-dom";
import CustomNoResultsOverlay from "../../../style/NoResultStyle";
import Item from "../../../style/ItemStyle";
import Modal from "react-bootstrap/Modal";
import { ip } from "../../../constants/ip";
import axios from "axios";
import UnarchiveIcon from "@mui/icons-material/Unarchive";
import CustomNoRowsOverlay from "../../../style/NoRowsStyle";
import UnarchiveAuthorPopUp from "./UnarchiveAuthorPopUp";

export default function ArchivedAuthors  ()  {
 
   const [authors, setAuthors] = useState([]);
  const [unarchivePopUp, setUnarchivePopUp] = useState(false);
  const [authorId,setAuthorId] = useState(0)
  const [refresh, setRefresh] = useState(true);
  const [openSnack, setOpenSnack] = useState(false);
  const [message, setMessage] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${ip}/author`);
        const archivedAuthors = response.data.filter((author) => author.archived);
        setAuthors(archivedAuthors);
      } catch (error) {
        console.log("Error fetching data:", error);
      }
    };
    fetchData();
  }, [refresh]);

  const handleDetails = (id) => {
    navigate(`${id}`);
  };


  const handleUnarchiveAuthor = (id) => {
    setAuthorId(id);
    setUnarchivePopUp(true);
    setMessage("Author Unarchived");
    setRefresh((prev) => !prev);
  };

 

  const columns = [
    {
      field: "avatar",
      headerName: "Avatar",
      width: 100,
      renderCell: (params) => (
        <Avatar
          src={params.row.Media?.path || ""}
          sx={{ bgcolor: grey[500], width: 35, height: 35 }}
        >
          {params.row.nameEn?.charAt(0)}
        </Avatar>
      ),
    },
    {
      field: "nameAr",
      headerName: "Author Name Ar",
      width: 190,
    },
    {
      field: "nameEn",
      headerName: "Author Name Eng",
      width: 200,
    },
    {
      field: "biographyAr",
      headerName: "Author Bio Ar",
      width: 230,
    },
    {
      field: "biographyEn",
      headerName: "Author Bio En",
      width: 220,
    },
    {
      field: "actions",
      headerName: "Actions",
      width: 110,
      type: "actions",
      renderCell: (params) => (
        <>
          <Tooltip title="View Details">
            <GridActionsCellItem
              icon={<VisibilityIcon />}
              label="Details"
              onClick={() => handleDetails(params.id)}
            />
          </Tooltip>
          <Tooltip title="Archive Author">
            <GridActionsCellItem
              icon={<UnarchiveSharpIcon />}
              label="Archive"
              onClick={() => handleUnarchiveAuthor(params.id)}
              style={{ color: "green" }}
            />
          </Tooltip>
        </>
      ),
    },
  ];

const HandleButton = () =>{
  navigate('/articles/authors')
}


  return (
<Box sx={{ bgcolor: "background.default", mx: 3, mt: 3 }}>
  <Item sx={{ pt: 7, pb: 1, px: 7, borderRadius: 10 }} elevation={5}>
  <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mb: 2,
          }}
        >
          <Typography variant="h5" gutterBottom sx={{ fontWeight: "bold" }}>
            Archived Authors
          </Typography>
          <Tooltip title="Authors">
            <UnarchiveIcon
              onClick={HandleButton}
              sx={{
                  flexShrink: 0,
                  ml: "auto",
                  marginBottom: { xs: 2, sm: 0 },
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  padding: 1,
                  cursor: "pointer",
                  fontSize: "55px",
                  color: "#701583",
              }}
            />
          </Tooltip>
        </Box>

    <div style={{ width: "100%", height: 500 }}>
    {unarchivePopUp && (
            <UnarchiveAuthorPopUp
              refresh={refresh}
              setRefresh={setRefresh}
              setOpenSnack={setOpenSnack}
              authorId={authorId}
              status={unarchivePopUp}
              setStatus={setUnarchivePopUp}
            />
          )}
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
        rows={authors}
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
       <ArchiveAuthorSnackBar
            openSnack={openSnack}
            setOpenSnack={setOpenSnack}
            message={message}
          />
    </div>
  </Item>


</Box>

  );
}

