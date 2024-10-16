import React, { useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import ModeEditOutlineIcon from "@mui/icons-material/ModeEditOutline";
import UpdateArticle from "../views/UpdateArticle";

export default function ArticleDescription({ data }) {
  const [isEditMode, setIsEditMode] = useState(false); 

  const handleEditClick = () => {
    setIsEditMode(!isEditMode); 
  };
  


  return (
    <Box sx={{ display: "flex", justifyContent: "end", gap: 10 }}>
      <Box>
        <ModeEditOutlineIcon
          onClick={handleEditClick} 
          sx={{ cursor: "pointer" }}
        />
      </Box>
      {isEditMode && (
        <UpdateArticle setIsEditMode={setIsEditMode} isEditMode={isEditMode} data1={data} />
      )}

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
            gap: 2,
            alignItems: "center",
            justifyContent: "end",
          }}
        >
          <Typography gutterBottom sx={{ fontWeight: "bold" }}>
            {data?.articleByAuthor?.length
              ? data?.articleByAuthor[0]?.author?.nameEn +
                "  " +
                data?.articleByAuthor[0]?.author?.nameAr
              : ""}{" "}
          </Typography>
          <Typography
            color="black"
            variant="h5"
            gutterBottom
            sx={{ fontWeight: "bold" }}
          >
            الكاتب
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
            الكمية الجملية
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
            {data?.articleByPublishingHouse?.length
              ? data?.articleByPublishingHouse[0]?.publishingHouse?.nameEn +
                "  " +
                data?.articleByPublishingHouse[0]?.publishingHouse?.nameAr
              : ""}
          </Typography>
          <img
            width={250}
            src={"https://jalyss.com/img/m/7.jpg"}
            alt={"fff"}
            loading="lazy"
          />
        </Box>
      </Box>
      <img
        width={270}
        src={data?.cover?.path}
        alt={"article img"}
        loading="lazy"
      />
    </Box>
  );
}
