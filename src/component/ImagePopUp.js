import React from "react";
import Popover from "@mui/material/Popover";
import PopupState, { bindTrigger, bindPopover } from "material-ui-popup-state";

export default function ImagePopUp({image}) {
  return (
    <PopupState variant="popover" popupId="demo-popup-popover">
    {(popupState) => (
      <div>
        <img
          {...bindTrigger(popupState)}
          width={50}
          src={image}
          alt=""
        />

        <Popover
          {...bindPopover(popupState)}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "center"
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "center"
          }}
        > 
          <img
            width={500}
            src={image}
            alt=""
          />
        </Popover>
      </div>
    )}
  </PopupState>
  );
}
