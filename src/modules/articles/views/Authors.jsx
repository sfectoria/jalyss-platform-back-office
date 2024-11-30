import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import { DataGrid, GridToolbar, GridActionsCellItem } from "@mui/x-data-grid";
import Typography from "@mui/material/Typography";
import VisibilityIcon from "@mui/icons-material/Visibility";
import Tooltip from "@mui/material/Tooltip";
import ArchiveSharpIcon from "@mui/icons-material/ArchiveSharp";
import ArchiveAuthorSnackBar from "../../authors/components/ArchiveAuthorSnackBar";
import Avatar from "@mui/material/Avatar";
import { grey } from "@mui/material/colors";
import AddIcon from "@mui/icons-material/Add";
import ArchiveIcon from "@mui/icons-material/Archive";
import { useNavigate } from "react-router-dom";
import CustomNoResultsOverlay from "../../../style/NoResultStyle";
import Item from "../../../style/ItemStyle";
import Fab from "@mui/material/Fab";
import { ip } from "../../../constants/ip";
import axios from "axios";
import CustomNoRowsOverlay from "../../../style/NoRowsStyle";
import ArchiveAuthor from "../../authors/components/ArchiveAuthorPopUp";


export default function AuthorsList() {
  const [authors, setAuthors] = useState([]);
  const [archivePopUp, setArchivePopUp] = useState(false);
  const [authorId, setAuthorId] = useState(0);
  const [refresh, setRefresh] = useState(true);
  const [openSnack, setOpenSnack] = useState(false);
  const [message, setMessage] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${ip}/author`);
        console.log("Authors fetched:", response.data);
        const filteredAuthors = response.data.filter(
          (author) => !author.archived
        );
        setAuthors(filteredAuthors);
      } catch (error) {
        console.log("Error fetching data:", error);
      }
    };
    fetchData();
  }, [refresh]);

  const handleDetails = (id) => {
    navigate(`${id}`);
  };

  const navigateToArchivedAuthors = () => {
    navigate("/articles/authors/archivedauthors");
  };

  const handleArchiveAuthor = (id) => {
    setAuthorId(id);
    setArchivePopUp(true);
    setMessage("Author archived");
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
              icon={<ArchiveSharpIcon />}
              label="Archive"
              onClick={() => handleArchiveAuthor(params.id)}
              style={{ color: "red" }}
            />
          </Tooltip>
        </>
      ),
    },
  ];

  return (
    <>
      <Box sx={{ bgcolor: "background.default", mx: 3, mt: 3 }}>
        <Item sx={{ pt: 7, pb: 1, px: 7, borderRadius: 10 }} elevation={5}>
          <Typography
            variant="h5"
            mb={3}
            gutterBottom
            sx={{
              fontWeight: "bold",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            Authors
            <Tooltip title="Archived Authors">
              <ArchiveIcon
                variant="contained"
                color="primary"
                onClick={navigateToArchivedAuthors}
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
              >
              </ArchiveIcon>
            </Tooltip>
          </Typography>

          <div style={{ width: "100%", height: 500 }}>
            {archivePopUp && (
              <ArchiveAuthor
                refresh={refresh}
                setRefresh={setRefresh}
                setOpenSnack={setOpenSnack}
                authorId={authorId}
                status={archivePopUp}
                setStatus={setArchivePopUp}
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

      <Box
        sx={{
          height: 70,
          position: "fixed",
          bottom: 60,
          right: 110,
        }}
        onClick={() => navigate("/articles/add-author")}
      >
        <Fab
          color="secondary"
          aria-label="edit"
          onClick={() => navigate("/articles/add-author")}
        >
          <Tooltip title="Add new Author">
            <AddIcon />
          </Tooltip>
        </Fab>
      </Box>
    </>
  );
}
