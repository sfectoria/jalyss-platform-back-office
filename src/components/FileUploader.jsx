import {IconButton } from "@mui/material";
import React, { useRef, useState } from "react";
import CameraAltRoundedIcon from "@mui/icons-material/CameraAltRounded";

import Tooltip from "@mui/material/Tooltip";
function FileUploader(props) {
  const { onSelectFile , icon} = props;
  const hiddenFileInput = useRef(null);

  const handleClick = (event) => {
    hiddenFileInput.current.click();
  };

 
  

  return (
    <Tooltip
      title="Add Photo"
      slotProps={{
        popper: {
          modifiers: [
            {
              name: "offset",
              options: {
                offset: [0, -170],
              },
            },
          ],
        },
      }}
    >
      <IconButton
        id="upload-btn"
        onClick={handleClick}
        sx={{
          width: "400px",
          height: "400px",
        }}
      >
        <CameraAltRoundedIcon
          sx={{ color: "white", width: "100px  ", height: "100px" }}
        />

        <input
          type="file"
          id="actual-btn"
          accept={"image/*"}
          ref={hiddenFileInput}
          onChange={onSelectFile}
          hidden
          data-testid="file-upload-input"
        />
      </IconButton>
    </Tooltip>
  );
}

export default FileUploader;
