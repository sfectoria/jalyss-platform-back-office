import  React,{useState,useEffect} from 'react';
import Box from '@mui/material/Box';
import { DataGrid, GridToolbar, GridActionsCellItem } from '@mui/x-data-grid';
import Typography from '@mui/material/Typography';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { useLocation, useNavigate } from "react-router-dom";
import CustomNoResultsOverlay from '../../../style/NoResultStyle';
import Item from '../../../style/ItemStyle';
import axios from "axios";
import { ip } from '../../../constants/ip';


const getPageFromUrl = () => {
  const params = new URLSearchParams(window.location.search);
  return +params.get("page") || 0;
};

const getPageSizeFromUrl = () => {
  const params = new URLSearchParams(window.location.search);
  return +params.get("take") || 10;
};

export default function StockList() {
  const [rows,setRows]=useState([])
  const [page, setPage] = useState(getPageFromUrl);
  const [pageSize, setPageSize] = useState(getPageSizeFromUrl());
  const [text, setText] = useState(null);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  const location = useLocation();

  const handleDetails = (ids) => {
    navigate(`/stock/${ids}`);
  };
  useEffect(() => {
    // updateUrlParams();
    fetchData();
  }, [location, text, page,pageSize]);

  const fetchData = async () => {
    try {
      let queryParams = new URLSearchParams(location.search);
      let params = Object.fromEntries(queryParams.entries());
      params.take=pageSize
      params.skip= page * pageSize
      console.log(params);
      if (text) params["text"] = text;
      console.log(params, text);
      const response = await axios.get(ip + "/stocks/getAll", {
        params,
      });
      setRows(response.data);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  const columns = [
    { field: 'name', headerName: 'Stock name', width: 200 },
    { field: 'location', headerName: 'Address', width: 270 },
    { field: 'managerName', headerName: 'Manager name', width: 250 },
    { field: 'managerNumber', headerName: 'Manager Tel number', width: 250 },
    {
      field: 'details',
      headerName: 'Details',
      width: 110,
      type: 'actions',
      getActions: ({ id }) => [
        <GridActionsCellItem icon={<VisibilityIcon />} onClick={() => handleDetails(id)} label="" />,
      ],
    },
  ];

  return (
          <Box
            sx={{
              bgcolor: 'background.default',
              mx:3,
              mt:3
            }}
          >
            <Item sx={{ py:5, px: 7, borderRadius: 10 }} elevation={5}>
              <Typography variant="h5" mb={3} gutterBottom sx={{ fontWeight: 'bold' }}>
                Stock
              </Typography>
              <div style={{ width: '100%' }}>
               
                  <DataGrid
                    pageSizeOptions={[7, 10, 20]}
                    sx={{
                      boxShadow: 0,
                      border: 0,
                      borderColor: 'primary.light',
                      '& .MuiDataGrid-cell:hover': {
                        color: 'primary.main',
                      },
                    }}
                    rows={rows}
                    columns={columns}
                    slots={{
                      noResultsOverlay: CustomNoResultsOverlay,
                      toolbar: GridToolbar,
                    }}
                    initialState={{
                      pagination: { paginationModel: { pageSize: 7 } },
                      filter: {
                        filterModel: {
                          items: [],
                          quickFilterValues: [''],
                        },
                      },
                    }}
                    slotProps={{
                      toolbar: {
                        showQuickFilter: true,
                      },
                    }}
                  />
             
              </div>
            </Item>
          </Box>
  );
}
