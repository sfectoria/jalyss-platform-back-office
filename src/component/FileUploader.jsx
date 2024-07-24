import { Button, IconButton } from "@mui/material";
import React, { useRef, useState } from "react";
import AttachmentIcon from "@mui/icons-material/Attachment";
import DeleteIcon from "@mui/icons-material/Delete";

function FileUploader(props) {
  const { onSelectFile, onDeleteFile, disabled ,file, setFile, fileName} = props;
  const hiddenFileInput = useRef(null);

  const handleClick = (event) => {
    hiddenFileInput.current.click();
  };

  const handleChange = (event) => {
    setFile(event.target.files[0]);
    onSelectFile(event);
  };

  const onDeleteFileHandler = () => {
    setFile(null);
    hiddenFileInput.current.value = null;
    onDeleteFile();
  };

  return (
    <div className="file-uploader">
      <div className={`file-div ${disabled && "disabled"}`}>
        <Button
          className="attachment-icon"
          onClick={handleClick}
          disabled={disabled}
        >
          <AttachmentIcon />
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
          <div className="file-name">
            {file ? <div>{fileName}</div> : <div>Choose file</div>}
          </div>
        </Button>
      </div>
      <div className={`${disabled && "disabled"}`}>
        <IconButton
          aria-label="delete"
          disabled={disabled}
          color="primary"
          onClick={onDeleteFileHandler}
        >
          <DeleteIcon />
        </IconButton>
      </div>
    </div>
  );
}

export default FileUploader;
