import React, { useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import ModeEditOutlineIcon from "@mui/icons-material/ModeEditOutline";
import UpdateArticle from "../views/UpdateArticle";
import Avatar from "@mui/material/Avatar";
import Tooltip from "@mui/material/Tooltip";
import KeyboardBackspaceOutlinedIcon from "@mui/icons-material/KeyboardBackspaceOutlined";
import { useNavigate } from "react-router-dom";
import { TbArrowBackUp } from "react-icons/tb";

export default function ArticleDescription({ data }) {
  const [isEditMode, setIsEditMode] = useState(false);
  const navigate = useNavigate();

  const category = data.articleByCategory
    ?.map((i, index) => `${index === 0 ? "" : ", "}${i.categoryArticle.name}`)
    .join(" ");

  console.log("here", category);

  const handleEditClick = () => {
    setIsEditMode(true);
  };

  const retour = () => {
    navigate("/articles");
  };

  return (
    <Box sx={{ display: "flex", justifyContent: "end", gap: 6 }}>
      {isEditMode ? (
        <UpdateArticle
          setIsEditMode={setIsEditMode}
          isEditMode={isEditMode}
          data1={data}
        />
      ) : (
        <>
          <Box>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                padding: "10px",
                marginBottom: "16px",
                gap: "10px",
              }}
            >
              <Tooltip title="Go Back" placement="top">
                <Box
                  sx={{
                    display: "inline-flex",
                    alignItems: "center",
                    cursor: "pointer",
                  }}
                  onClick={retour}
                >
                  <TbArrowBackUp size={40} />
                </Box>
              </Tooltip>
              <Tooltip title="Edit" placement="top">
                <Box
                  sx={{
                    display: "inline-flex",
                    alignItems: "center",
                    cursor: "pointer",
                  }}
                  onClick={handleEditClick}
                >
                  <ModeEditOutlineIcon
                    sx={{
                      fontSize: 40,
                      color: "#48184C",
                      padding: "4px",
                    }}
                  />
                </Box>
              </Tooltip>
            </Box>
          </Box>

          <Box>
            <Typography
              align="right"
              color="#1a237e"
              variant="h3"
              mb={3}
              gutterBottom
              sx={{ fontWeight: "bold" }}
            >
              {data.title}
            </Typography>
            <Box
              sx={{
                display: "flex",
                gap: 2,
                alignItems: "center",
                justifyContent: "end",
              }}
            >
              <Typography sx={{ fontWeight: "bold", textAlign: "center" }}>
                {data?.articleByAuthor?.length
                  ? data.articleByAuthor.map((e) => e.author?.nameAr).join(", ")
                  : "No authors available"}
              </Typography>
              <Typography
                color="black"
                variant="h5"
                gutterBottom
                sx={{ fontWeight: "bold" }}
              >
                :الكاتب
              </Typography>
            </Box>
            <Box
              sx={{
                display: "flex",
                gap: 2,
                alignItems: "center",
                justifyContent: "end",
              }}
            >
              <Typography gutterBottom sx={{ fontWeight: "bold" }}>
                {data?.quantity}
              </Typography>
              <Typography
                color="black"
                variant="h5"
                gutterBottom
                sx={{ fontWeight: "bold" }}
              >
                :الكمية الجملية
              </Typography>
            </Box>
            <Box
              sx={{
                display: "flex",
                gap: 2,
                alignItems: "center",
                justifyContent: "end",
              }}
            >
              <Typography sx={{ fontWeight: "bold" }}>{category}</Typography>
              <Typography
                color="black"
                variant="h5"
                gutterBottom
                sx={{ fontWeight: "bold" }}
              >
                : صنف
              </Typography>
            </Box>
            <Box
              sx={{
                display: "flex",
                gap: 2,
                alignItems: "center",
                justifyContent: "end",
              }}
            >
              <Typography sx={{ fontWeight: "bold", textAlign: "center" }}>
                {data?.articleByPublishingHouse?.length
                  ? data.articleByPublishingHouse.map((e, i) => (
                      <span key={i}>
                        {e.publishingHouse?.nameAr}
                        {i < data.articleByPublishingHouse.length - 1 && ", "}
                      </span>
                    ))
                  : "No publishing houses available"}
              </Typography>

              <Typography
                color="black"
                variant="h5"
                gutterBottom
                sx={{ fontWeight: "bold" }}
              >
                :دار النشر
              </Typography>
            </Box>
            <Box
              sx={{
                display: "flex",
                gap: 2,
                alignItems: "center",
                justifyContent: "end",
              }}
            >
              <Typography sx={{ fontWeight: "bold", textAlign: "center" }}>
                {data?.longDescriptionAr}
              </Typography>

              <Typography
                color="black"
                variant="h5"
                gutterBottom
                sx={{ fontWeight: "bold" }}
              >
                :وصف مفصل
              </Typography>
            </Box>
            <Box
              sx={{
                display: "flex",
                gap: 2,
                alignItems: "center",
                justifyContent: "end",
              }}
            >
              <Typography sx={{ fontWeight: "bold", textAlign: "center" }}>
                {data.shortDescriptionAr}
              </Typography>

              <Typography
                color="black"
                variant="h5"
                gutterBottom
                sx={{ fontWeight: "bold" }}
              >
                : وصف
              </Typography>
            </Box>
          </Box>
          <Box sx={{ textAlign: "center", marginTop: 3 }}>
            {data?.cover?.path ? (
              <img width={270} src={data.cover.path} alt={"article img"} />
            ) : (
              <div
                style={{
                  height: "10cm",
                  width: "6cm",
                  backgroundColor: "white",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  border: "1px solid #ccc",
                }}
              >
                <p style={{ fontSize: "2cm" }}>{data.title?.charAt(0)}</p>
              </div>
            )}

            <Box
              sx={{
                display: "flex",
                gap: 2,
                justifyContent: "center",
                marginTop: 2,
              }}
            >
              <Typography
                sx={{
                  fontWeight: "bold",
                  textAlign: "center",
                  marginTop: "0.4cm",
                }}
              >
                {data.pageNumber}
              </Typography>

              <Typography
                color="black"
                variant="h5"
                gutterBottom
                sx={{ fontWeight: "bold" }}
              >
                :عدد الصفحات{" "}
              </Typography>
            </Box>
            <Box
              sx={{
                display: "flex",
                gap: 2,
                justifyContent: "center",
              }}
            >
              <Typography
                sx={{
                  fontWeight: "bold",
                  textAlign: "left",
                  marginTop: "0.4cm",
                  display: "flex",
                }}
              >
                {data.weight}
                <span style={{ marginLeft: "5px" }}>كغ</span>
              </Typography>

              <Typography
                color="black"
                variant="h5"
                gutterBottom
                sx={{ fontWeight: "bold" }}
              >
                : الوزن{" "}
              </Typography>
            </Box>
          </Box>
        </>
      )}
    </Box>
  );
}
