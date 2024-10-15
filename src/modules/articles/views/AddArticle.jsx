import React, { useState, useRef } from "react";
import Imagelist from "../component/ImageList";
import ArticleInfo from "../component/ArticleInfo";
import { Box, Button } from "@mui/material";
import Item from "../../../style/ItemStyle";

export default function AddArticle() {
  const [submittedArticle, setSubmittedArticle] = useState(null);
  const formRef = useRef(null); 

  const handleArticleSubmit = (article) => {
    setSubmittedArticle(article);
    console.log("Article submitted from child:", article);
  };

  return (
    <Box
      sx={{
        bgcolor: "background.default",
        mx: 3,
        mt: 3,
      }}
    >
      <Item sx={{ pt: 7, pb: 1, px: 7, borderRadius: 10 }} elevation={5}>
        <Box sx={{ display: "flex", gap: 5 }}>
          <Box sx={{ width: "50%" }}>
            <ArticleInfo onSubmit={handleArticleSubmit} ref={formRef} />
            <Box sx={{ display: "flex", justifyContent: "center", margin: 4 }}>
              <Button
                sx={{
                  width: 250,
                  height: 50,
                  backgroundColor: "#48184d",
                  color: "white",
                  "&:hover": {
                    backgroundColor: "#48184d",
                  },
                }}
                variant="outlined"
                onClick={() => {
                  if (formRef.current) {
                    formRef.current.submit(); 
                  }
                }}
              >
                Add Article
              </Button>
            </Box>
          </Box>
          <Box>
            <Imagelist />
          </Box>
        </Box>
      </Item>
    </Box>
  );
}
