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
import MenuBookIcon from "@mui/icons-material/MenuBook";
import Link from "@mui/material/Link";
import { useNavigate, useParams } from "react-router-dom";
import AddButton from "../../../components/AddOp";
import Vente from "../component/Vente";
import Retour from "../component/Retour";
import Commande from "../component/Commande";
import Devis from "../component/Devis";
import { Button, TextField } from "@mui/material";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import { ip } from "../../../constants/ip";
import axios from "axios";
import ArticleInChannels from "../component/ArticleInChannels";
import DeleteIcon from "@mui/icons-material/Delete";
import EditNoteIcon from "@mui/icons-material/EditNote";
import IconButton from "@mui/material/IconButton";
import SaveAsIcon from "@mui/icons-material/SaveAs";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Autocomplete from "@mui/material/Autocomplete";

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

function FullWidthTabs({ channelInfo }) {
  const navigate = useNavigate();
  const theme = useTheme();
  const [value, setValue] = useState(0);
  const types = ["vente", "articles", "retour", "commande", "devis"];
  const [type, setType] = useState("");

  useEffect(() => {
    setType(types[value]);
  }, [value]);

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
            label="Vente"
            {...a11yProps(0)}
          />
          <Tab
            icon={<MenuBookIcon />}
            iconPosition="start"
            label="Articles"
            {...a11yProps(1)}
          />
          <Tab
            icon={<HistoryIcon />}
            iconPosition="start"
            label="Retour"
            {...a11yProps(2)}
          />
          <Tab
            icon={<HistoryIcon />}
            iconPosition="start"
            label="Commande"
            {...a11yProps(3)}
          />
          <Tab
            icon={<HistoryIcon />}
            iconPosition="start"
            label="Devis"
            {...a11yProps(4)}
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
          <ArticleInChannels channelInfo={channelInfo} />
        </TabPanel>
        <TabPanel value={value} index={2} dir={theme.direction}>
          <Retour />
        </TabPanel>
        <TabPanel value={value} index={3} dir={theme.direction}>
          <Commande />
        </TabPanel>
        <TabPanel value={value} index={4} dir={theme.direction}>
          <Devis />
        </TabPanel>
      </SwipeableViews>
      {value !== 1 && <AddButton type={type} info={channelInfo} />}
    </Box>
  );
}

export default function ChannelDetails() {
  const [channel, setChannel] = useState({});
  const [isOpen, setIsOpen] = useState(false);
  const [name, setName] = useState("");
  const [stocks, setStocks] = useState([]);
  const [stock, setStock] = useState({});
  const [employees, setEmployees] = useState([]);
  const [employee, setEmployee] = useState({});
  const [managerPhone, setManagerPhone] = useState("");
  const [refresh, setRefresh] = useState({});
  const navigate = useNavigate();

  const params = useParams();

  let { id } = params;
  useEffect(() => {
    fetchAllInfoData();
    fetchStockDetails();
  }, [refresh]);
  const fetchAllInfoData = async () => {
    const responseStocks = await axios.get(`${ip}/stocks/getAll`);
    const responseEmp = await axios.get(`${ip}/employees/all`);

    setStocks(responseStocks.data);
    setEmployees(responseEmp.data);
    console.log(employee);
  };

  const fetchStockDetails = async () => {
    const response = await axios.get(`${ip}/selling/${id}`);
    setChannel(response.data);    
    setStock(response.data.stock);
    setEmployee(response.data.Employee);
    setManagerPhone(response.data.Employee?.phoneNumber);
    //console.log("stock", stock, response.data.stock,response.data.Employee);
  }

  const handleChangeName = (event) => {
    setName(event.target.value);
  };
  const handleChange = (event, newValue) => {
    setStock(newValue);
  };

  const handleChangeEmp = (event, newValue) => {
    setEmployee(newValue);
    setManagerPhone(newValue?.phoneNumber || "");
  };

  const handelModify = async () => {
    const obj = {
      name: name ? name : channel.name,
      idStock: stock.id,
      employeeId: employee ? employee.id : channel.employeeId,
    };
    console.log(obj);
    const modifyChannel = await axios.patch(`${ip}/selling/${channel.id}`, obj);
    //console.log(modifyChannel);
    setIsOpen(false);
    setRefresh(!refresh);
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
        <div role="presentation">
          <Box
            sx={{
              position: "absolute",
              right: 100,
            }}
          >
            {isOpen ? (
              <IconButton
                aria-label="delete"
                size="large"
                color="primary"
                onClick={() => handelModify()}
              >
                <SaveAsIcon fontSize="inherit" />
              </IconButton>
            ) : (
              <IconButton
                aria-label="delete"
                size="large"
                color="secondary"
                onClick={() => setIsOpen(true)}
              >
                <EditNoteIcon fontSize="inherit" />
              </IconButton>
            )}
          </Box>
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
              {channel.name}
            </Typography>
          </Breadcrumbs>
        </div>
        {isOpen ? (
          <Box sx={{ mx: 4, my: 1 }}>
            <Box sx={{ display: "flex", gap: 4, my: 3 }}>
              <TextField
                sx={{
                  width: "40%",
                  "& .MuiOutlinedInput-root": {
                    borderRadius: "1px",
                    "& fieldset": {
                      borderRadius: "7px",
                    },
                  },
                }}
                id="outlined-helperText"
                label="Channel Name"
                onChange={handleChangeName}
                defaultValue={channel.name}
              />
              <Autocomplete
                style={{ width: "40%" }}
                value={stock}
                onChange={handleChange}
                options={stocks}
                getOptionLabel={(option) => option.name}
                renderInput={(params) => (
                  <TextField {...params} label="Stock" />
                )}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    borderRadius: "7px",
                    "& fieldset": {
                      borderRadius: "7px",
                    },
                  },
                }}
              />
            </Box>
            <Box sx={{ display: "flex", gap: 4, my: 3 }}>
              <Autocomplete
                style={{ width: "40%" }}
                value={employee}
                onChange={handleChangeEmp}
                options={employees}
                getOptionLabel={(option) =>
                  option.firstName && option?.firstName + " " + option?.lastName
                }
                renderInput={(params) => (
                  <TextField {...params} label="Manager" />
                )}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    borderRadius: "7px",
                    "& fieldset": {
                      borderRadius: "7px",
                    }, // Modify border radius here
                  },
                }}
              />
              <TextField
                sx={{
                  width: "40%",
                  "& .MuiOutlinedInput-root": {
                    borderRadius: "1px",
                    "& fieldset": {
                      borderRadius: "7px",
                    },
                  },
                }}
                id="outlined-helperText"
                label="Manager Phone"
                value={managerPhone}
                InputProps={{
                  readOnly: true,
                }}
                InputLabelProps={{
                  shrink: true, 
                }}
              />
            </Box>
          </Box>
        ) : (
          <Box sx={{ mx: 4 }}>
            <Typography variant="h2" color="initial" gutterBottom>
              {channel.name} informations
            </Typography>
            <Typography variant="body1" color={"initial"} gutterBottom>
              {channel.name} is located in stock ({stock?.name}) managed by
              {""} {employee?.firstName || "N/A"} {employee?.lastName || ""}
            </Typography>
            <Button
              variant="contained"
              color="primary"
              endIcon={<RemoveRedEyeIcon />}
              sx={{ width: "15%" }}
              onClick={() => navigate(`/stock/${channel.idStock}`)}
            >
              View stock
            </Button>
          </Box>
        )}
        <FullWidthTabs channelInfo={channel} />
      </Item>
    </Box>
  );
}
