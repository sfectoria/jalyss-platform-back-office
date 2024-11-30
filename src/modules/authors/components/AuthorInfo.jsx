import React, { useEffect, useState } from "react";
import { Box, Typography, Avatar, Tab, Tabs, Tooltip } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { ip } from "../../../constants/ip";
import UpdateAuthor from "./UpdateAuthor";
import KeyboardBackspaceOutlinedIcon from "@mui/icons-material/KeyboardBackspaceOutlined";
import LibraryBooksIcon from "@mui/icons-material/LibraryBooks";
import { TbArrowBackUp } from "react-icons/tb";

export default function AuthorDetails() {
  const { id } = useParams();
  const [theAuthor, setTheAuthor] = useState({});
  const [tabIndex, setTabIndex] = useState(0);
  const navigate = useNavigate();

  const getOneAuthor = async () => {
    try {
      const response = await axios.get(`${ip}/author/${id}`);
      setTheAuthor(response.data);
      console.log("Author data:", response.data);
    } catch (error) {
      console.error("Error fetching author data:", error);
    }
  };

  useEffect(() => {
    getOneAuthor();
  }, [id]);

  const handleTabChange = (event, newValue) => setTabIndex(newValue);

  const retour = () => navigate("/articles/authors");

  const columns = [
    {
      field: "cover",
      headerName: "Cover Pic",
      width: 90,
      renderCell: (params) => (
        <Avatar
          src={params.row.cover?.path || ""}
          sx={{ bgcolor: "#e6c440", width: 35, height: 35 }}
        >
          {params.row.cover?.alt?.charAt(0) || "?"}
        </Avatar>
      ),
    },
    { field: "title", headerName: "Article Title", width: 200 },
    {
      field: "shortDescriptionEn",
      headerName: "Short Description (EN)",
      width: 220,
    },
    {
      field: "shortDescriptionAr",
      headerName: "Short Description (AR)",
      width: 220,
    },
  ];

  const rowsWithId =
    theAuthor.ArticleByAuthor?.map((article) => ({
      id: article.articleId,
      cover: article.article?.cover,
      title: article.article?.title,
      shortDescriptionEn: article.article?.shortDescriptionEn,
      shortDescriptionAr: article.article?.shortDescriptionAr,
    })) || [];

  return (
    <Box sx={{ mx: 3, my: 6, display: "flex", justifyContent: "center" }}>
      <Box
        sx={{
          flex: 1,
          p: 3,
          border: "2px solid #e0e0e0",
          borderRadius: 2,
          maxWidth: "800px",
          width: "100%",
        }}
      >
        <Tabs
          value={tabIndex}
          onChange={handleTabChange}
          indicatorColor="primary"
          textColor="primary"
          variant="fullWidth"
          sx={{ marginBottom: "20px" }}
        >
          <Tab label="Overview" />
          <Tab label="Edit Profile" />
        </Tabs>

        {tabIndex === 0 && (
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Box
              sx={{
                display: "flex",
                justifyContent: "flex-start",
                width: "100%",
                mb: 2,
              }}
            >
              <Tooltip title="Go Back">
                <Box
                  onClick={retour}
                  sx={{
                    cursor: "pointer",
                    display: "inline-flex",
                    alignItems: "center",
                  }}
                >
                  <TbArrowBackUp size={50} color="grey" />
                </Box>
              </Tooltip>
            </Box>

            {theAuthor?.Media?.path ? (
              <Avatar
                alt="author avatar"
                sx={{ width: 200, height: 180 }}
                src={theAuthor?.Media?.path}
              />
            ) : (
              <Avatar
                sx={{
                  bgcolor: "#e6c440",
                  width: 140,
                  height: 140,
                  fontSize: 50,
                }}
              >
                {theAuthor.nameEn
                  ? theAuthor.nameEn
                      .split(" ")
                      .map((namePart) => namePart[0])
                      .join("")
                  : "?"}
              </Avatar>
            )}
            <Typography sx={{ fontSize: 20, fontWeight: "bold", mt: 2 }}>
              {theAuthor.nameEn}
            </Typography>
            <Typography sx={{ fontSize: 26, fontWeight: "bold", mt: 1 }}>
              {theAuthor.nameAr}
            </Typography>

            <Box
              sx={{ display: "flex", justifyContent: "space-between", my: 4 }}
            >
              <Box sx={{ width: "48%" }}>
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  <LibraryBooksIcon />
                  <Typography sx={{ fontSize: 19, fontWeight: "bold" }}>
                    Biography (English):
                  </Typography>
                </Box>
                <Typography sx={{ fontSize: 19, mb: 4 }}>
                  {theAuthor.biographyEn}
                </Typography>
              </Box>

              <Box sx={{ width: "48%", textAlign: "right", direction: "rtl" }}>
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  <LibraryBooksIcon />
                  <Typography sx={{ fontSize: 19, fontWeight: "bold" }}>
                    السيرة الذاتية (Arabic):
                  </Typography>
                </Box>
                <Typography sx={{ fontSize: 19 }}>
                  {theAuthor.biographyAr}
                </Typography>
              </Box>
            </Box>

            <Box sx={{ width: "100%", height: 500 }}>
              <DataGrid
                rows={rowsWithId}
                columns={columns}
                pageSizeOptions={[7, 10, 20]}
                initialState={{
                  pagination: { paginationModel: { pageSize: 7 } },
                  filter: { filterModel: { items: [] } },
                }}
                sx={{
                  boxShadow: 0,
                  border: 0,
                  "& .MuiDataGrid-cell:hover": { color: "primary.main" },
                }}
                slots={{
                  toolbar: GridToolbar,
                }}
                slotProps={{
                  toolbar: { showQuickFilter: true },
                }}
              />
            </Box>
          </Box>
        )}

        {tabIndex === 1 && (
          <Box sx={{ mt: 3, display: "flex", justifyContent: "center" }}>
            <UpdateAuthor theAuthor={theAuthor} />
          </Box>
        )}
      </Box>
    </Box>
  );
}
