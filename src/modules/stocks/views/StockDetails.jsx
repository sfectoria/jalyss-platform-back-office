import React ,{useState} from 'react'
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import {  ThemeProvider, styled } from '@mui/material/styles';
import { DataGrid,GridToolbar  } from '@mui/x-data-grid';
import CustomNoResultsOverlay from '../../../style/NoResultStyle'
import lightTheme from '../../../style/lightTheme';
import Item from '../../../style/ItemStyle';
import PropTypes from 'prop-types';
import SwipeableViews from 'react-swipeable-views';
import { useTheme } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import HistoryIcon from '@mui/icons-material/History';
import ArticleIcon from '@mui/icons-material/Article';
import { purple,indigo } from '@mui/material/colors';
import StockArticles from '../component/StockArticleTable';
import StockHistory from '../component/StockHistory';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link';
import { useNavigate } from 'react-router-dom';
import Zoom from '@mui/material/Zoom';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';



const columns = [
  {
    field: 'boImage',
    headerName: 'Image',
    width: 100,
  },
  {
    field: 'boTitle',
    headerName: 'Title',
    width: 180,
  },
  // {
  //   field: 'description',
  //   headerName: 'Description',
  //   width: 270,
  // },
  {
    field: 'category',
    headerName: 'Category',
    width: 270,
  },
  {
    field: 'publisher',
    headerName: 'Publisher',
    width: 270,
  },
  {
    field: 'quantity',
    headerName: 'Quantity',
    width: 90,
    type:'number'
  },

];

const rows = [
  { id: 1, boTitle: 'Halima', publisher: '', Category: "Salim sfexi" , details:"fff"},
  { id: 2, boTitle: 'sendibad', publisher: '', Category: "Hamida midawi" },
  { id: 3, boTitle: '', publisher: 'Sahlin/Sousse', Category: "Wael ben sahloul" },
  { id: 4, boTitle: 'Stock alia', publisher: 'Alia/bizerte', Category: "Mouhamed Amin ben yahya" },
  { id: 5, boTitle: 'Targaryen', publisher: 'Daenerys', Category: "houssem ben ammar" },
  { id: 6, boTitle: 'Melisandre', publisher: null, Category: 150 },
  { id: 7, boTitle: 'Clifford', publisher: 'Ferrara', Category: 44 },
  { id: 8, boTitle: 'Frances', publisher: 'Rossini', Category: 36 },
  { id: 9, boTitle: 'Roxie', publisher: 'Harvey', Category: 65 },
  { id: 10, boTitle: 'Roxie', publisher: 'Harvey', Category: 65 },
  { id: 11, boTitle: 'Roxie', publisher: 'Harvey', Category: 65 },
  { id: 12, boTitle: 'Roxie', publisher: 'Harvey', Category: 65 },
];

const fabStyle = {
  position: 'absolute',
  bottom: 40,
  right: 100,
};
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
    'aria-controls': `full-width-tabpanel-${index}`,
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
  const fabs = [
    {
     
    },
    {
      color: 'primary',
      sx: fabStyle,
      icon: <AddIcon />,
      label: 'Add',
    },
    ]
    const transitionDuration = {
    enter: theme.transitions.duration.enteringScreen,
    exit: theme.transitions.duration.leavingScreen,
  };

  return (
    <Box sx={{ bgcolor: 'background.paper',mx:4 ,display:'flex',flexDirection:'column', justifyContent:"center" }}>
      <AppBar position="static"  sx={{mx:4,height:60,border:0,boxShadow:0,bgcolor:'white'}}>
        <Tabs
          value={value}
          onChange={handleChange}
          variant="fullWidth"
          aria-label="full width tabs example"
        >   
          <Tab icon={<ArticleIcon/>} iconPosition="start" label="Articles" sx={{}} {...a11yProps(0)} />
          <Tab icon={<HistoryIcon/>} iconPosition="start" label="History" {...a11yProps(1)} />
        </Tabs>
      </AppBar>
      <SwipeableViews
        axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
        index={value}
        onChangeIndex={handleChangeIndex}
      >
        <TabPanel value={value} index={0} dir={theme.direction}>
          <StockArticles/>
        </TabPanel>
        <TabPanel value={value} index={1} dir={theme.direction}>
          <StockHistory/>
        </TabPanel>
      </SwipeableViews>
      {fabs.map((fab, index) => (
        <Zoom
          key={fab.color}
          in={value === index}
          timeout={transitionDuration}
          style={{
            transitionDelay: `${value === index ? transitionDuration.exit : 0}ms`,
          }}
          unmountOnExit
        >
          <Fab sx={fab.sx} aria-label={fab.label} color={fab.color}>
            {fab.icon}
          </Fab>
        </Zoom>
      ))}
    </Box>
  );
}

export default function StockDetails() {

  const navigate=useNavigate()
  function handleClick(event) {
    event.preventDefault();
    navigate('/stock')
  }
      const columns = [
        {
          field: 'boImage',
          headerName: 'Image',
          width: 180,
        },
        {
          field: 'boTitle',
          headerName: 'Title',
          width: 180,
        },
        {
          field: 'description',
          headerName: 'Description',
          width: 270,
        },
        {
          field: 'category',
          headerName: 'Category',
          width: 270,
        },
        {
          field: 'publisher',
          headerName: 'Publisher',
          width: 270,
        },
        {
          field: 'quantity',
          headerName: 'Quantity',
          width: 90,
          type:'number'
        },
  
      ];
      
      const rows = [
        { id: 1, boTitle: 'Halima', publisher: '', Category: "Salim sfexi" , details:"fff"},
        { id: 2, boTitle: 'sendibad', publisher: '', Category: "Hamida midawi" },
        { id: 3, boTitle: '', publisher: 'Sahlin/Sousse', Category: "Wael ben sahloul" },
        { id: 4, boTitle: 'Stock alia', publisher: 'Alia/bizerte', Category: "Mouhamed Amin ben yahya" },
        { id: 5, boTitle: 'Targaryen', publisher: 'Daenerys', Category: "houssem ben ammar" },
        { id: 6, boTitle: 'Melisandre', publisher: null, Category: 150 },
        { id: 7, boTitle: 'Clifford', publisher: 'Ferrara', Category: 44 },
        { id: 8, boTitle: 'Frances', publisher: 'Rossini', Category: 36 },
        { id: 9, boTitle: 'Roxie', publisher: 'Harvey', Category: 65 },
      ];
  return (
    <Grid    >
    <Grid item  >
    <ThemeProvider theme={lightTheme}>
      <Box
        sx={{
          pt:7,
          bgcolor: 'background.default',
          display: 'grid',
          marginLeft:'20%',
          marginRight:2
        }}
      >   
          <Item sx={{pt:7,pb:1,px:7,borderRadius:10}} elevation={5}>
          <div role="presentation" onClick={handleClick}>
      <Breadcrumbs aria-label="breadcrumb">
        <Link underline="hover" variant="h5" sx={{ fontWeight: 'bold' }} color="inherit" href="/stock">
          Stock
        </Link>
        <Typography variant="h5" sx={{ fontWeight: 'bold' }} color="text.primary">Stock Sfax</Typography>
      </Breadcrumbs>
    </div>
        <FullWidthTabs/>    

    </Item>


         </Box>
       </ThemeProvider>
     </Grid>
 </Grid>
  )
}
