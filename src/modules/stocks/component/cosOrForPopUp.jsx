import React from "react";
import Popover from "@mui/material/Popover";
import Typography from "@mui/material/Typography";
import Avatar from "@mui/material/Avatar";
import Stack from "@mui/material/Stack";
import { deepOrange } from "@mui/material/colors";
import { Box } from "@mui/material";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import EmailIcon from "@mui/icons-material/Email";
import LocationCityIcon from "@mui/icons-material/LocationCity";

export default function MouseOverPopover({ name }) {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handlePopoverOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);

  return (
    <div style={{ display: "flex", alignItems: "center", height: "100%" }}>
      <Typography
        aria-owns={open ? "mouse-over-popover" : undefined}
        aria-haspopup="true"
        onMouseEnter={handlePopoverOpen}
        onMouseLeave={handlePopoverClose}
      >
        {name}
      </Typography>
      <Popover
        id="mouse-over-popover"
        sx={{
          pointerEvents: "none",
        }}
        open={open}
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
        onClose={handlePopoverClose}
        disableRestoreFocus
      >
        <Box sx={{ mx: 3, my: 6, display: "flex" }}>
          <Box>
            <Stack direction="row" spacing={2}>
              <Avatar
                sx={{
                  bgcolor: deepOrange[500],
                  width: 140,
                  height: 140,
                  fontSize: 50,
                }}
              >
                {name && name.slice(0, 1)}
              </Avatar>
            </Stack>
            <Typography sx={{ pt: 4, fontSize: 30, fontWeight: "bold" }}>
              {name}
            </Typography>
          </Box>
          <Box>
            <Typography sx={{ p: 1, fontSize: 20 }}>Details :</Typography>
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <EmailIcon />
              <Typography sx={{ p: 1, fontSize: 15 }}>
                ousseemachetrif@gmail.com
              </Typography>
            </Box>
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <LocalPhoneIcon />
              <Typography sx={{ p: 1, fontSize: 15 }}>
                +216 98 567 565
              </Typography>
            </Box>
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <LocationCityIcon />
              <Typography sx={{ p: 1, fontSize: 15 }}>
                rue 420 rtiba takelsa nabeul
              </Typography>
            </Box>
          </Box>
        </Box>
      </Popover>
    </div>
  );
}
