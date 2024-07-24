import { Button, IconButton } from "@mui/material";
import React, { useRef, useState } from "react";
import AttachmentIcon from "@mui/icons-material/Attachment";

function FileUploader(props) {
  const { onSelectFile,  disabled , setFile} = props;
  const hiddenFileInput = useRef(null);

  const handleClick = (event) => {
    hiddenFileInput.current.click();
  };

  const handleChange = (event) => {
    setFile(event.target.files[0]);
    onSelectFile(event);
  };

  

  return (
    <Button
      id="upload-btn"
          onClick={handleClick}
          disabled={disabled}
        >
          <AttachmentIcon sx={{color: 'white'} }/>
          <input
            type="file"
            id="actual-btn"
            accept={'image/*'}
            ref={hiddenFileInput}
            onChange={handleChange}
            hidden
            disabled={disabled}
            data-testid="file-upload-input"
          />
        </Button>
  );
}

export default FileUploader;
