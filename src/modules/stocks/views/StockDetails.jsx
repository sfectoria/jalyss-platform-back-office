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
import StockArticles from "../component/StockArticleTable";
import StockHistory from "../component/StockHistory";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Link from "@mui/material/Link";
import { useNavigate, useParams } from "react-router-dom";
import AddButton from "../../../components/AddOp";
import RuleIcon from "@mui/icons-material/Rule";
import StockInvontaire from "../component/StockInvontaire";
import AddInventaire from "../component/AddInventaire";
import axios from "axios";
import { ip } from "../../../constants/ip";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import IconButton from "@mui/material/IconButton";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import { Button } from "@mui/material";
import ArchiveStockPopUp from "../component/ArchiveStockPopUp";
import SimpleDialog from "../component/ChannelsListOfStock";
import { TbArrowBackUp } from "react-icons/tb";
import Tooltip from "@mui/material/Tooltip";


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

function FullWidthTabs({ stockInfo }) {
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
          <StockArticles />
        </TabPanel>
        <TabPanel value={value} index={1} dir={theme.direction}>
          <StockHistory />
        </TabPanel>
        <TabPanel value={value} index={2} dir={theme.direction}>
          <StockInvontaire />
        </TabPanel>
      </SwipeableViews>
      {value === 1 && <AddButton type={"histStock"} info={stockInfo} />}
      {value === 2 && <AddInventaire />}
    </Box>
  );
}

export default function StockDetails() {
  const [stockInfo, setStockInfo] = useState({});
  const [more, setMore] = useState(false);
  const [open, setOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState("");
  const params = useParams();
  const navigate =useNavigate()
  useEffect(() => {
    fetchStockDetails();
  }, []);

  const fetchStockDetails = async () => {
    const response = await axios.get(`${ip}/stocks/${params.id}`);
    setStockInfo(response.data.data);
    console.log("hereeeee",response.data.data);
    
  };
  const handelChannelsList = () => {
    console.log("hello");
    setOpen(true);
  };
  const handleClose = (value) => {
    setOpen(false);
  };

const retour =()=>{
  navigate('/stock')
}

  return (
    <Box
    sx={{
      bgcolor: "background.default",
      mx: 3,
      mt: 3,
    }}
  >
    <Item sx={{ pt: 7, pb: 1, px: 7, borderRadius: 10 }} elevation={5}>
    <Box sx={{ mt: 3, display: "flex", justifyContent: "flex-end", color: "grey" }}>
  <Tooltip title="Go Back" placement="top">
    <Box
      sx={{
        display: "inline-flex",
        alignItems: "center",
        cursor: "pointer",
      }}
      onClick={retour}
    >
      <TbArrowBackUp size={40} sx={{ fontSize: "40px" }} />
    </Box>
  </Tooltip>
</Box>

      <div
        role="presentation"
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginRight: "50px",
          marginTop:"-2cm"
        }}
      >
        <Breadcrumbs aria-label="breadcrumb">
          <Link
            underline="hover"
            variant="h5"
            sx={{ fontWeight: "bold" }}
            color="inherit"
            href="/stock"
          >
            Stock
          </Link>
          <Typography
            variant="h5"
            sx={{ fontWeight: "bold" }}
            color="text.primary"
          >
            {stockInfo.name}
          </Typography>
        </Breadcrumbs>
      </div>
  
      <Box sx={{ mx: 4 }}>
        <Typography variant="h2" color="initial" gutterBottom>
          {stockInfo.name} informations
        </Typography>
        <Typography variant="body1" color={"initial"} gutterBottom>
          {stockInfo.name} managed by ({stockInfo?.employee?.firstName +
            " " +
            stockInfo?.employee?.lastName})
        </Typography>
        <Box sx={{ display: "flex", justifyContent: "flex-start", mt: 2 }}>
          <Button
            variant="contained"
            color="secondary"
            endIcon={<RemoveRedEyeIcon />}
            sx={{ width: "20%" }}
            onClick={() => handelChannelsList()}
          >
            View Channels
          </Button>
        </Box>
      </Box>
  
      <FullWidthTabs stockInfo={stockInfo} />
      <SimpleDialog
        info={stockInfo?.salesChannels}
        selectedValue={selectedValue}
        open={open}
        onClose={handleClose}
      />
    </Item>
  </Box>
  
  );
}
