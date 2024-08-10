import React, { useEffect, useState } from "react";
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
import ChannelHistory from "../component/Vente";
import ChannelInventaire from "../component/ChannelInventaire";
import Vente from "../component/Vente";
import Retour from "../component/Retour";
import Commande from "../component/Commande";
import Devis from "../component/Devis";
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
  const types = [
    "vente",
    "retour",
    "commande",
    "devis",
  
  ];
  const [type, setType] = useState('')

  useEffect(() => {
    
    setType(types[value]);
  },[value])

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleChangeIndex = (index) => {
    setValue(index);
  };
  const { id } = useParams();
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
      <Typography variant="h2" color="initial" gutterBottom>
        Channel {id} informations
      </Typography>
      <Typography variant="body1" color={"initial"} gutterBottom>
        channel {id} is located in stock{" "}
        <a href={`/stock/${id}`}>(foulen fouleni)</a> managed by (foulen
        fouleni)
      </Typography>
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
            label="Vente"
            {...a11yProps(0)}
          />
          <Tab
            icon={<HistoryIcon />}
            iconPosition="start"
            label="Retour"
            {...a11yProps(1)}
          />
          <Tab
            icon={<HistoryIcon />}
            iconPosition="start"
            label="Commande"
            {...a11yProps(2)}
          />
          <Tab
            icon={<HistoryIcon />}
            iconPosition="start"
            label="Devis"
            {...a11yProps(3)}
          />
        </Tabs>
      </AppBar>
      <SwipeableViews
        axis={theme.direction === "rtl" ? "x-reverse" : "x"}
        index={value}
        onChangeIndex={handleChangeIndex}
      >
        <TabPanel value={value} index={0} dir={theme.direction}>
          <Vente />
        </TabPanel>
        <TabPanel value={value} index={1} dir={theme.direction}>
          <Retour />
        </TabPanel>
        <TabPanel value={value} index={2} dir={theme.direction}>
          <Commande />
        </TabPanel>
        <TabPanel value={value} index={3} dir={theme.direction}>
          <Devis />
        </TabPanel>
        
      </SwipeableViews>
      <AddButton type={type} />
    </Box>
  );
}

export default function ChannelDetails() {
  const { id } = useParams();
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
