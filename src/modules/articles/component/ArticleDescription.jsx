import React, { useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import ModeEditOutlineIcon from "@mui/icons-material/ModeEditOutline";
import UpdateArticle from "../views/UpdateArticle";

export default function ArticleDescription({ data }) {
  const [isEditMode, setIsEditMode] = useState(false);

  const handleEditClick = () => {
    setIsEditMode(true);
  };

  return (
    <Box sx={{ display: "flex", gap: 5, justifyContent: "flex-end", alignItems: "flex-start" }}>
      {isEditMode ? (
        <UpdateArticle
          setIsEditMode={setIsEditMode}
          isEditMode={isEditMode}
          data1={data}
        />
      ) : (
        <>
          <Box sx={{ flex: 1, paddingRight: 3 }}>
            <Box sx={{ display: "flex", justifyContent: "end" }}>
              <ModeEditOutlineIcon
                onClick={handleEditClick}
                sx={{ cursor: "pointer", marginBottom: 2 }}
              />
            </Box>

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

            <Typography
              marginLeft={7}
              align="right"
              mb={3}
              gutterBottom
              sx={{ fontWeight: "bold", fontSize: 17 }}
            >
              {data.shortDescriptionAr}
            </Typography>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-end",
                gap: 2,
              }}
            >
              <Typography
                color="black"
                variant="h5"
                gutterBottom
                sx={{ fontWeight: "bold", textAlign: "right" }}
              >
                :الكاتب
              </Typography>
              <Typography gutterBottom sx={{ fontWeight: "bold", textAlign: "right" }}>
                {data?.articleByAuthor?.length ? (
                  <ol
                    style={{
                      textAlign: "right",
                      direction: "rtl",
                      listStylePosition: "inside",
                    }}
                  >
                    {data.articleByAuthor.map((e, i) => (
                      <li key={i}>{e.author?.nameAr}</li>
                    ))}
                  </ol>
                ) : (
                  "No authors available"
                )}
              </Typography>
            </Box>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-end",
                gap: 2,
              }}
            >
              <Typography
                color="black"
                variant="h5"
                gutterBottom
                sx={{ fontWeight: "bold", textAlign: "right" }}
              >
                :الكمية الجملية
              </Typography>
              <Typography gutterBottom sx={{ fontWeight: "bold", textAlign: "right" }}>
                {data?.quantity}
              </Typography>
            </Box>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-end",
                gap: 2,
              }}
            >
              <Typography
                color="black"
                variant="h5"
                gutterBottom
                sx={{ fontWeight: "bold", textAlign: "right" }}
              >
                :دار النشر
              </Typography>
              <Typography gutterBottom sx={{ fontWeight: "bold", textAlign: "right" }}>
                {data?.articleByPublishingHouse?.length ? (
                 <ol
                 style={{
                   textAlign: "right",
                   direction: "rtl",
                   listStylePosition: "inside",
                 }}
               >
                 {data.articleByPublishingHouse.map((e, i) => (
                   <li key={i}>
                     {e.publishingHouse?.nameAr}
                     <p>
                       <img
                         src={e.publishingHouse?.logo?.path}
                         style={{ width: "100px", height: "auto", borderRadius: "8px", marginTop: "5px" }} 
                       />
                     </p>
                   </li>
                 ))}
               </ol>
               
                ) : (
                  "No publishing houses available"
                )}
              </Typography>
            </Box>
          </Box>
          <Box>
            <img
              width={300}
              src={data?.cover?.path}
              alt={"article img"}
              loading="lazy"
              style={{
                borderRadius: "8px",
                display: "block",
                paddingTop:"3cm"
              }}
            />
          </Box>
        </>
      )}
    </Box>
  );
}
