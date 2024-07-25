import React ,{useState} from 'react'
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Item from '../../../style/ItemStyle';
import PropTypes from 'prop-types';
import SwipeableViews from 'react-swipeable-views';
import { useTheme } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import HistoryIcon from '@mui/icons-material/History';
import ArticleIcon from '@mui/icons-material/Article';
import StockArticles from '../component/StockArticleTable';
import StockHistory from '../component/StockHistory';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link';
import { useNavigate } from 'react-router-dom';
import AddButton from '../component/AddOp';


const fabStyle = {
  position: 'fixed',
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
      {value===1&&<AddButton />}
    </Box>
  );
}

export default function StockDetails() {

  const navigate=useNavigate()
  function handleClick(event) {
    event.preventDefault();
    navigate('/stock')
  }
      
  return (
      <Box
        sx={{
          pt:7,
          bgcolor: 'background.default',
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
  )
}
