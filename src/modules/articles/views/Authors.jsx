import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import { DataGrid, GridToolbar, GridActionsCellItem } from "@mui/x-data-grid";
import Typography from "@mui/material/Typography";
import VisibilityIcon from "@mui/icons-material/Visibility";
import Avatar from "@mui/material/Avatar";
import { deepOrange } from "@mui/material/colors";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { MdOutlinePersonAdd } from "react-icons/md";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import CustomNoResultsOverlay from "../../../style/NoResultStyle";
import Item from "../../../style/ItemStyle";
import Modal from "react-bootstrap/Modal";
import { ip } from "../../../constants/ip";
import axios from "axios";

export default function AuthorsList() {
  const [authors, setAuthors] = useState([]);
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [authorToDelete, setAuthorToDelete] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${ip}/author`);
        setAuthors(response.data);
        console.log("Authors fetched:", response.data);
      } catch (error) {
        console.log("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  const handleDetails = (id) => {
    navigate(`${id}`);
  };

  const handleDeleteClick = (id) => {
    setAuthorToDelete(id);
    setConfirmDelete(true);
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`${ip}/author/${authorToDelete}`);
      setAuthors(authors.filter((author) => author.id !== authorToDelete));
      setConfirmDelete(false);
      setAuthorToDelete(null);
    } catch (error) {
      console.log("Error deleting author:", error);
    }
  };

  const columns = [
    {
      field: "avatar",
      headerName: "Avatar",
      width: 90,
      renderCell: (params) => (
        <Avatar
          src={params.row.Media?.path || ""}
          sx={{ bgcolor: deepOrange[500], width: 35, height: 35 }}
        >
          {params.row.nameEn?.charAt(0)}
        </Avatar>
      ),
    },
    {
      field: "nameAr",
      headerName: "Author Name Ar",
      width: 200,
    },
    {
      field: "nameEn",
      headerName: "Author Name Eng",
      width: 200,
    },
    {
      field: "biographyAr",
      headerName: "Author Bio Ar",
      width: 220,
    },
    {
      field: "biographyEn",
      headerName: "Author Bio En",
      width: 150,
    },
    {
      field: "actions",
      headerName: "Actions",
      width: 100,
      type: "actions",
      renderCell: (params) => (
        <>
          <GridActionsCellItem
            icon={<VisibilityIcon />}
            label="Details"
            onClick={() => handleDetails(params.id)}
          />
          <GridActionsCellItem
            icon={<DeleteOutlineIcon />}
            label="Delete"
            onClick={() => handleDeleteClick(params.id)}
            style={{ color: "red" }}
          />
        </>
      ),
    },
  ];

  return (
    <Box sx={{ bgcolor: "background.default", mx: 3, mt: 3 }}>
      <Item sx={{ pt: 7, pb: 1, px: 7, borderRadius: 10 }} elevation={5}>
        <div className="d-flex justify-content-between">
          <Typography
            variant="h5"
            mb={3}
            gutterBottom
            sx={{ fontWeight: "bold" }}
          >
            Authors
          </Typography>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              padding: 1,
              borderRadius: "50%",
              cursor: "pointer",
            }}
            onClick={() => navigate("/articles/add-author")}
          >
            <MdOutlinePersonAdd size={54} />
          </Box>
        </div>

        <div style={{ width: "100%" }}>
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
      </Item>
      <Modal
        show={confirmDelete}
        onHide={() => setConfirmDelete(false)}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title style={{ color: "red" }}>Confirm Delete</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ color: "red" }}>
          Are you sure you want to delete this author?
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={() => setConfirmDelete(false)}
            sx={{
              "&:hover": {
                backgroundColor: ["#22c55e"],
                borderColor: "red",
                color: "white",
              },
            }}
          >
            Cancel
          </Button>
          <Button
            variant="danger"
            onClick={handleDelete}
            sx={{
              "&:hover": {
                backgroundColor: "red",
                borderColor: "red",
                color: "white",
              },
            }}
          >
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </Box>
  );
}
