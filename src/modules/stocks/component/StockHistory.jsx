import React , {useState} from 'react';
import { DataGrid, GridToolbar, GridActionsCellItem } from '@mui/x-data-grid';
import VisibilityIcon from '@mui/icons-material/Visibility';
import CustomNoResultsOverlay from '../../../style/NoResultStyle';
import DoneIcon from '@mui/icons-material/Done';
import ClearIcon from '@mui/icons-material/Clear';
import InvoiceModal from '../../../components/InvoiceModal';
import MouseOverPopover from './cosOrForPopUp';

export default function StockHistory() {
  const [isOpen, setIsOpen] = useState(false);
  const items=[
    {
      id: (+ new Date() + Math.floor(Math.random() * 999999)).toString(36),
      name: 'hhhh',
      description: 'a  book',
      price: '1.00',
      quantity: 7
    },
    {
      id: (+ new Date() + Math.floor(Math.random() * 999999)).toString(36),
      name: 'halima',
      description: 'a  book',
      price: '1.00',
      quantity: 1
    },
    {
      id: (+ new Date() + Math.floor(Math.random() * 999999)).toString(36),
      name: 'nooo',
      description: 'a  book',
      price: '4.00',
      quantity: 5
    }
  ]
  
  const openModal = (event) => {
    event.preventDefault();
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  const columns = [
    { field: 'date', headerName: 'Date', width: 200 },
    { field: 'customerName', headerName: 'Customer', width: 270,renderCell: (params) => (
      <MouseOverPopover name={params.row.customerName}/> 
    )
  },
    { field: 'fournisseurName', headerName: 'Fournisseur', width: 250 , renderCell: (params) => (
      <MouseOverPopover name={params.row.fournisseurName}/>
    )
  },
    { field: 'br',
      headerName: 'BR', 
      width: 50,
      renderCell: (params) => (
        params.row.br ? <DoneIcon color="success"/> : <ClearIcon color="error" /> 
      ),
      },
    { field: 'bs', 
      headerName: 'BS', 
      width: 50,
      renderCell: (params) => (
        params.row.bs ? <DoneIcon color="success"/> : <ClearIcon color="error" /> 
      ),
    },
    { field: 'bt', 
      headerName: 'BT', 
      width: 50,
      renderCell: (params) => (
        params.row.bt ? <DoneIcon color="success"/> : <ClearIcon color="error" /> 
      ),
     },
     {
      field: 'details',
      headerName: 'Details',
      width: 110,
      type: 'actions',
      getActions: ({ id }) => [
        <GridActionsCellItem icon={<VisibilityIcon />} onClick={openModal} label="" />,
      ],
    },
  ];

  const rows = [
    { id: 1, date:'07/23/2024 6:56 PM', customerName: null, fournisseurName: 'Salim sfexi', managerNumber: '+216 28527345', details: 'fff',br:true },
    { id: 2, date: '07/23/2024 6:56 PM', customerName:  'Hamida midawi' , fournisseurName:null,bs:true},
    { id: 3, date: '07/23/2024 6:56 PM', customerName: null, fournisseurName: 'Wael ben sahloul',br:true },
    { id: 4, date: '07/23/2024 6:56 PM', customerName: null, fournisseurName: 'Stock Gabes',br:true,bt:true },
    { id: 5, date: '07/23/2024 6:56 PM', customerName: 'Daenerys', fournisseurName:null ,bs:true},
    { id: 6, date: '07/23/2024 6:56 PM', customerName:  'houssem ben ammar', fournisseurName:null,bs:true },
    { id: 7, date: '07/23/2024 6:56 PM', customerName: null, fournisseurName: 'Ferrara',br:true },
    { id: 8, date: '07/23/2024 6:56 PM', customerName: 'Stock Nabeul', fournisseurName: null,bs:true,bt:true },
    { id: 9, date: '07/23/2024 6:56 PM', customerName: 'Harvey', fournisseurName:null ,bs:true },
  ];

  return (
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
                  <InvoiceModal
              showModal={isOpen}
              closeModal={closeModal}
              info={{
                // currentDate,
                // dateOfIssue,
                invoiceNumber:1,
                billTo:'hamadi',
                billToEmail:'hamadi@gmail.com',
                billToAddress:'win',
                // billFrom,
                // billFromEmail,
                // billFromAddress,
                // notes,
                // total,
                // subTotal,
                // taxAmount,
                // discountAmount
              }}
              items={items}
              currency={0}
              subTotal={0}
              taxAmount={0}
              discountAmount={0}
              total={0}
            />
              </div>
  );
}
