import  React,{useEffect, useState} from 'react';
import Box from '@mui/material/Box';
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';
import {
  GridRowModes,
  DataGrid,
  GridActionsCellItem,
  GridRowEditStopReasons,
  gridPageCountSelector,
  GridPagination,
  useGridApiContext,
  useGridSelector,
} from '@mui/x-data-grid';
import MuiPagination from "@mui/material/Pagination";
import ImagePopUp from '../../../components/ImagePopUp';
import CustomNoResultsOverlay from '../../../style/NoResultStyle';
import AlertAdding from '../../../components/AlertAdding'
import QuickSearchToolbar from '../component/QuickSearchToolbar'
import SaveDialog from '../component/SaveDialog';
import { ip } from '../../../constants/ip';
import axios from 'axios';
import { useParams } from 'react-router-dom';


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
  const [rows, setRows] = useState([]);
  const [showAlert, setShowAlert] = useState(false);
  const [showDialog, setShowDialog] = useState(false);
  const [count, setCount] = useState(10);
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const [text, setText] = useState(null);
  const [msg, setMsg] = useState('');
  const [refresh, setRefresh] = useState('');
  const [rowModesModel, setRowModesModel] = useState(
    rows.reduce((acc, row) => {
      acc[row.id] = { mode: GridRowModes.View };
      return acc;
    }, {})
  );

  const param = useParams()

  useEffect(() => {
    fetchData();
  }, [refresh,text]);

  const fetchData = async () => {
    let params={take:pageSize,skip:page*pageSize}
    if(text) params['text']=text
    console.log(params);
    
    const response = await axios.get(`${ip}/stocks/${param.id}`,{params});
    console.log(response.data.data.stockArticle, response.data.count);
    setRows(response.data.data.stockArticle);
    setCount(response.data.count);
  };
  function Pagination({ onPageChange, className }) {
    const apiRef = useGridApiContext();
    const pageCount = useGridSelector(apiRef, gridPageCountSelector);
   console.log(page);
   console.log(text);
   
    return (
      <MuiPagination
        color="secondary"
        className={className}
        count={pageCount}
        page={page+1}
        onChange={(event, newPage) => {
          setPage(newPage-1,page)
          onPageChange(event, newPage-1);
        }}
      />
    );
  }
  
  function CustomPagination(props) {
    return <GridPagination ActionsComponent={Pagination} {...props} />;
  }
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

  const handlePageChange = (newPageInfo) => {
    console.log(newPageInfo, "pagesize");
    console.log(pageSize === newPageInfo.pageSize);

    if (pageSize === newPageInfo.pageSize) {
      setPage(newPageInfo.page);
      setRefresh(!refresh);
    }
    if (pageSize !== newPageInfo.pageSize) {
      setPageSize(newPageInfo.pageSize);
      setPage(0);
      setRefresh(!refresh);
    }
  };


  const columns = [
    {
      field: 'image',
      headerName: 'Image',
      width: 90,
      renderCell: (params) => <ImagePopUp image={params.value} />,
    },
    { field: 'title', headerName: 'Title', width: 270 , valueGetter: (value, row) => {
      return row?.article?.title;
    },},
    {
      field: 'quantityInv',
      headerName: 'Quantity',
      width: 90,
      editable: true,
      type: 'number',
    },
    { field: 'author', headerName: 'Author', width: 250, valueGetter: (value, row) => {
      return row?.article.articleByAuthor[0]?.author?.nameAr;

    }, },
    { field: 'publisher', headerName: 'Publisher', width: 250,
      valueGetter: (value, row) => {
        return row?.article.articleByPublishingHouse[0]?.publishingHouse?.nameAr;
      },
     },
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
        width: '85%',
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
          onPaginationModelChange={(event)=>{
            handlePageChange(event)
          }}
          rows={rows}
          columns={columns}
          editMode="row"
          pagination
          pageSize={pageSize}
          paginationMode="server"
          rowCount={count}
          rowModesModel={rowModesModel}
          onFilterModelChange={(e)=>{setText(e.quickFilterValues[0]);
          }}
          onRowModesModelChange={handleRowModesModelChange}
          onRowEditStop={handleRowEditStop}
          processRowUpdate={processRowUpdate}
          slots={{
            noResultsOverlay: CustomNoResultsOverlay,
            toolbar: QuickSearchToolbar,
            pagination: CustomPagination,
          }}
          initialState={{
            pagination: { paginationModel: { pageSize: 10 } },
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
              onDoneClick: handleDoneClick,
            },
          }}
        />
      </Box>
      {showDialog&&<SaveDialog show={true} setShow={setShowDialog} />}
    </Box>
  );
}
