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
    const ids=response.data.data.stockArticle.map(e=>{
      return e.articleId
    })
    console.log(ids);
    const responseInventory = await axios.get(`${ip}/inventory/${param.idInv}`,{params:{articlesIds:ids}})
    const result = response.data.data.stockArticle.map((el) => {
      const invLine = responseInventory?.data?.inventoryLine?.find(q => q.articleId === el.article.id)
      console.log(invLine);
      
      return {
        ...el.article,
        quantity: invLine?.quantity||null,
        reelQuantity:el.quantity,
        idLine:invLine?.id||null
      };
    });
    
    console.log(result);
     
    setRows(result);
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

  const processRowUpdate = async(newRow) => {
    const {quantity,reelQuantity,id}=newRow
    console.log('here',newRow);
    const verify=rows.find((row) => row.id === id);
    console.log(verify);
    
    if(verify.quantity){
      const postInventoryLine=await axios.patch(`${ip}/inventory/line/${verify.idLine}`,{quantity:quantity})
     console.log(postInventoryLine,'test');
    }
    else{
    const obj={
      inventoryId:param.idInv,
      quantity,
      reelQuatity:reelQuantity,
      articleId:id
    }
     const postInventoryLine=await axios.post(`${ip}/inventory/createLine`,obj)
     console.log(postInventoryLine,'test');
    }
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
      renderCell: (params) => <ImagePopUp image={params?.row?.cover?.path} />,
    },
    { field: 'title', headerName: 'Title', width: 270 , valueGetter: (value, row) => {
      return row?.title;
    },},
    {
      field: 'quantity',
      headerName: 'Quantity',
      width: 90,
      editable: true,
      type: 'number',
    },
    { field: 'author', headerName: 'Author', width: 250, valueGetter: (value, row) => {
      return row?.articleByAuthor[0]?.author?.nameAr;

    }, },
    { field: 'publisher', headerName: 'Publisher', width: 250,
      valueGetter: (value, row) => {
        return row?.articleByPublishingHouse[0]?.publishingHouse?.nameAr;
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
          onFilterModelChange={(e)=>{setText(e.quickFilterValues.join(' '));
            console.log(e.quickFilterValues);
            
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
