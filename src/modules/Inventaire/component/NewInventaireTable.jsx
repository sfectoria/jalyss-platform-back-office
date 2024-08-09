import  React,{useState} from 'react';
import Box from '@mui/material/Box';
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';
import {
  GridRowModes,
  DataGrid,
  GridActionsCellItem,
  GridRowEditStopReasons,
} from '@mui/x-data-grid';

import CustomNoResultsOverlay from '../../../style/NoResultStyle';
import AlertAdding from "../../../components/AlertAdding"
import QuickSearchToolbar from '../component/QuickSearchToolbar'
import SaveDialog from '../component/SaveDialog';
import ImagePopUp from '../../../components/ImagePopUp';


function createData(id, image, title, quantity, author, publisher, price) {
  return {
    id,
    image,
    title,
    quantity,
    author,
    publisher,
    price,
  };
}
const rowss = [
  createData(1, 'https://jalyss.com/520-large_default/alabe-alghani-alabe-alfaker.jpg', 'الرجل الغني و الرجل الفقير', 0, 'robert ti kyosaki', 'maktabat jarir', 120),
  createData(2, 'https://jalyss.com/899-large_default/The-Subtle-Art-of-Not-Giving.jpg', 'فن اللامبالات', 0, 'mark manson', 'attanwir', 120),
  createData(3, 'https://jalyss.com/1064-home_default/-kon-ant.jpg', 'كن انت', 0, 'iheb hamarna', 'molhimon', 120),
  createData(4, 'https://jalyss.com/2759-large_default/-.jpg', 'خلق الكون في القران الكريم', 0, 'walid mohyi e din al asghar', 'dar e salam', 120),
  createData(5, 'https://jalyss.com/423-home_default/min-ajl-annajah.jpg', 'من أجل النجاح', 0, 'abd el karim bakkar', 'dar e salam', 140),
  createData(6, 'https://jalyss.com/1170-large_default/-.jpg', 'اولاد حارتنا', 0, 'najib mahfoudh', 'dar e chourouk', 147),
  createData(7, 'https://jalyss.com/1170-large_default/-.jpg', 'اولاد حارتنا', 0, 'najib mahfoudh', 'dar e chourouk', 56),
  createData(8, 'https://jalyss.com/1170-large_default/-.jpg', 'اولاد حارتنا', 0, 'najib mahfoudh', 'dar e chourouk', 25),
  createData(9, 'https://jalyss.com/1170-large_default/-.jpg', 'اولاد حارتنا', 0, 'najib mahfoudh', 'dar e chourouk', 25),
  createData(10, 'https://jalyss.com/1170-large_default/-.jpg', 'اولاد حارتنا', 0, 'najib mahfoudh', 'dar e chourouk', 25),
];

export default function NewInventaireTable() {
  const [rows, setRows] = useState(rowss);
  const [showAlert, setShowAlert] = useState(false);
  const [showDialog, setShowDialog] = useState(false);
  const [msg, setMsg] = useState('');
  const [rowModesModel, setRowModesModel] = useState(
    rowss.reduce((acc, row) => {
      acc[row.id] = { mode: GridRowModes.Edit };
      return acc;
    }, {})
  );
  const [searchText, setSearchText] = useState('');

  const handleRowEditStop = (params, event) => {
    if (params.reason === GridRowEditStopReasons.rowFocusOut) {
      event.defaultMuiPrevented = true;
    }
  };

  const handleEditClick = (id) => () => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.Edit } });
  };

  const handleSaveClick = (id) => () => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.View } });
  };

  const processRowUpdate = (newRow) => {
    const updatedRow = { ...newRow, isNew: false };
    setRows(rows.map((row) => (row.id === newRow.id ? updatedRow : row)));
    return updatedRow;
  };

  const handleRowModesModelChange = (newRowModesModel) => {
    setRowModesModel(newRowModesModel);
  };

  const countModes = (modesModel) => {
    let editCount = 0;
    for (const key in modesModel) {
      if (modesModel[key].mode === GridRowModes.Edit) {
        editCount++;
      }
    }
    return { editCount };
  };

  const handleDoneClick = () => {
    const { editCount} = countModes(rowModesModel);
    if(editCount>0){
      setShowAlert(true)
      if (editCount===1) {
        setMsg('You forget an Article')
      }
      else setMsg(`You forget ${editCount} articles`)
    }
    else if (editCount===0) setShowDialog(true)
  };

  const filteredRows = rows.filter((row) => {
    return (
      row.title.toLowerCase().includes(searchText.toLowerCase()) ||
      row.publisher.toLowerCase().includes(searchText.toLowerCase()) ||
      row.author.toLowerCase().includes(searchText.toLowerCase())
    );
  });

  const columns = [
    {
      field: 'image',
      headerName: 'Image',
      width: 90,
      renderCell: (params) => <ImagePopUp image={params.value} />,
    },
    { field: 'title', headerName: 'Title', width: 270 },
    {
      field: 'quantity',
      headerName: 'Quantity',
      width: 90,
      editable: true,
      type: 'number',
    },
    { field: 'author', headerName: 'Author', width: 250 },
    { field: 'publisher', headerName: 'Publisher', width: 250 },
    {
      field: 'actions',
      type: 'actions',
      headerName: 'Actions',
      width: 100,
      cellClassName: 'actions',
      getActions: ({ id }) => {
        const isInEditMode = rowModesModel[id]?.mode === GridRowModes.Edit;

        if (isInEditMode) {
          return [
            <GridActionsCellItem
              icon={<SaveIcon />}
              label="Save"
              sx={{ color: 'primary.main' }}
              onClick={handleSaveClick(id)}
            />,
          ];
        }

        return [
          <GridActionsCellItem
            icon={<EditIcon />}
            label="Edit"
            className="textPrimary"
            onClick={handleEditClick(id)}
            color="inherit"
          />,
        ];
      },
    },
  ];

  const handelShow =()=>{
    setShowAlert(false)
  }

  return (
    <Box
      sx={{
        width: '75%',
        '& .actions': {
          color: 'text.secondary',
        },
        '& .textPrimary': {
          color: 'text.primary',
        },
      }}
    >
     { showAlert&&<AlertAdding showAlert={showAlert} handelShow={handelShow} msg={msg} status={'error'}/>}
      <Box >
        <DataGrid
        rowHeight={80}
          pageSizeOptions={[7, 10, 20]}
          rows={filteredRows}
          columns={columns}
          editMode="row"
          rowModesModel={rowModesModel}
          onRowModesModelChange={handleRowModesModelChange}
          onRowEditStop={handleRowEditStop}
          processRowUpdate={processRowUpdate}
          slots={{
            noResultsOverlay: CustomNoResultsOverlay,
            toolbar: QuickSearchToolbar,
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
              setSearchText,
              onDoneClick: handleDoneClick,
            },
          }}
        />
      </Box>
      {showDialog&&<SaveDialog show={true} setShow={setShowDialog} />}
    </Box>
  );
}
