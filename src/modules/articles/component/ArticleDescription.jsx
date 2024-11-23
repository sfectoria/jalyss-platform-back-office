import React, { useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import ModeEditOutlineIcon from "@mui/icons-material/ModeEditOutline";
import UpdateArticle from "../views/UpdateArticle";

export default function ArticleDescription({ data }) {
  const [isEditMode, setIsEditMode] = useState(false);
  const category= (data.articleByCategory?.map((i) => i.categoryArticle.name))



console.log("here",category )
;


  const handleEditClick = () => {
    setIsEditMode(true);
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
            <ModeEditOutlineIcon
              onClick={handleEditClick}
              sx={{ cursor: "pointer" }}
            />
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
            }}>
            <Typography sx={{ fontWeight: "bold"}}>
            {category} 
              </Typography>
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
            <img
              width={270}
              src={data?.cover?.path}
              alt={"article img"}
              loading="lazy"
            />

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
