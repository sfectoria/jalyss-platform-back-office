import React , {useState} from 'react';
import { DataGrid, GridToolbar, GridActionsCellItem } from '@mui/x-data-grid';
import VisibilityIcon from '@mui/icons-material/Visibility';
import CustomNoResultsOverlay from '../../../style/NoResultStyle';
import DoneIcon from '@mui/icons-material/Done';
import ClearIcon from '@mui/icons-material/Clear';
import InvoiceModal from '../../../components/InvoiceModal';

export default function ClientHistory() {
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
    { field: 'date', headerName: 'Date', width: 120 },
    { field: 'time', headerName: 'Time', width: 100 },
    { field: 'pType', headerName: 'Payment Type', width: 200 },
    { field: 'paAmount', headerName: 'Payed Amount', width: 170 },
    { field: 'rest', headerName: 'Rested', width: 170 },
    { field: 'toAmount', headerName: 'Total Amount', width: 170 },
    { field: 'payed',
      headerName: 'Payed', 
      width: 70,
      renderCell: (params) => (
        params.row.payed ? <DoneIcon color="success"/> : <ClearIcon color="error" /> 
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
    { id: 1, date:'07/23/2024 ',time:'6:56 PM',toAmount:'10000',paAmount:'10000',pType:'Cash',payed:true },
    { id: 2, date: '07/23/2024 ',time:'6:56 PM',toAmount:'400',paAmount:'400',pType:'Credit Card', payed:true},
    { id: 3, date: '07/23/2024 ',time:'6:56 PM',toAmount:'8900',paAmount:'900',rest:'8000',pType:'cash' },
    { id: 4, date: '07/23/2024 ',time:'6:56 PM',toAmount:'7400.470',paAmount:'6687',rest:'713.470',pType:'Cheque' },
    { id: 5, date: '07/23/2024 ',time:'6:56 PM',toAmount:'10000',paAmount:'10000',rest:'740.200',pType:'cash'},
    { id: 6, date: '07/23/2024 ',time:'6:56 PM',toAmount:'10000',paAmount:'10000',rest:'1000',pType:'Cheque' },
    { id: 7, date: '07/23/2024 ',time:'6:56 PM',toAmount:'10000',paAmount:'10000',pType:'Credit Card', payed:true },
    { id: 8, date: '07/23/2024 ',time:'6:56 PM',toAmount:'10000',paAmount:'10000',rest:'1000',pType:'cash' },
    { id: 9, date: '07/23/2024 ',time:'6:56 PM',toAmount:'10000',paAmount:'10000',rest:'1000',pType:'cash'},
  ];

  return (
              <div style={{ width: '100%',marginTop:70 }}>
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
              // taxAmount={0}
              discountAmount={0}
              total={0}
            />
              </div>
  );
}
