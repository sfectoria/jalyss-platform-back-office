import React, { useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Item from "../../../style/ItemStyle";
import PropTypes from "prop-types";
import SwipeableViews from "react-swipeable-views";
import { useTheme } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import HistoryIcon from "@mui/icons-material/History";
import ArticleIcon from "@mui/icons-material/Article";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Link from "@mui/material/Link";
import { useParams } from "react-router-dom";
import RuleIcon from "@mui/icons-material/Rule";
import AddButton from "../../stocks/component/AddOp";
import ChannelArticles from "../component/ChannelArticleTable";
import ChannelHistory from "../component/ChannelHistory";
import ChannelInventaire from "../component/ChannelInventaire";
function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `full-width-tab-${index}`,
    "aria-controls": `full-width-tabpanel-${index}`,
  };
}

function FullWidthTabs() {
  const theme = useTheme();
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleChangeIndex = (index) => {
    setValue(index);
  };

  return (
    <Box
      sx={{
        bgcolor: "background.paper",
        mx: 4,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
      }}
    >
      <AppBar
        position="static"
        sx={{ mx: 4, height: 60, border: 0, boxShadow: 0, bgcolor: "white" }}
      >
        <Tabs
          value={value}
          onChange={handleChange}
          variant="fullWidth"
          aria-label="full width tabs example"
        >
          <Tab
            icon={<ArticleIcon />}
            iconPosition="start"
            label="Articles"
            {...a11yProps(0)}
          />
          <Tab
            icon={<HistoryIcon />}
            iconPosition="start"
            label="History"
            {...a11yProps(1)}
          />
          <Tab
            icon={<RuleIcon />}
            iconPosition="start"
            label="Inventaire"
            {...a11yProps(2)}
          />
        </Tabs>
      </AppBar>
      <SwipeableViews
        axis={theme.direction === "rtl" ? "x-reverse" : "x"}
        index={value}
        onChangeIndex={handleChangeIndex}
      >
        <TabPanel value={value} index={0} dir={theme.direction}>
          <ChannelArticles />
        </TabPanel>
        <TabPanel value={value} index={1} dir={theme.direction}>
          <ChannelHistory />
        </TabPanel>
        <TabPanel value={value} index={2} dir={theme.direction}>
          <ChannelInventaire />
        </TabPanel>
      </SwipeableViews>
      {value === 1 && <AddButton />}
    </Box>
  );
}

export default function ChannelDetails() {
  const {id} = useParams()
  return (
    <Box
      sx={{
        bgcolor: "background.default",
        mx: 3,
        mt: 3,
      }}
    >
      <Item sx={{ pt: 7, pb: 1, px: 7, borderRadius: 10 }} elevation={5}>
        <div role="presentation">
          <Breadcrumbs aria-label="breadcrumb">
            <Link
              underline="hover"
              variant="h5"
              sx={{ fontWeight: "bold" }}
              color="inherit"
              href="/channels"
            >
              Channels
            </Link>
            <Typography
              variant="h5"
              sx={{ fontWeight: "bold" }}
              color="text.primary"
            >
              Channel {id}
            </Typography>
          </Breadcrumbs>
        </div>
        <FullWidthTabs />
      </Item>
    </Box>
  );
}
