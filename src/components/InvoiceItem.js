import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import { BiTrash } from "react-icons/bi";
import EditableField from './EditableField';
import PandMField from './PandMField';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import SearchField from './SearchField';


function createData(id,image, title, quantity, author, publisher, barcode,price) {
  return {
    id,
    image,
    title,
    quantity,
    author,
    publisher,
    barcode,
    price
  };
}


const rows = [
  createData(1,'https://jalyss.com/520-large_default/alabe-alghani-alabe-alfaker.jpg', 'الرجل الغني و الرجل الفقير', 24, 'robert ti kyosaki', 'maktabat jarir' ,'104725'),
  createData(2,'https://jalyss.com/899-large_default/The-Subtle-Art-of-Not-Giving.jpg', 'فن اللامبالات',120, 'mark manson', 'attanwir','104727'),
  createData(3,'https://jalyss.com/1064-home_default/-kon-ant.jpg', 'كن انت', 160, 'iheb hamarna','molhimon','104720',100),
  createData(4,'https://jalyss.com/2759-large_default/-.jpg', 'خلق الكون في القران الكريم', 123, 'walid mohyi e din al asghar', 'dar e salam','104728'),
  createData(5,'https://jalyss.com/423-home_default/min-ajl-annajah.jpg', 'من أجل النجاح', 49, 'abd el karim bakkar','dar e salam','1047254'),
  createData(6,'https://jalyss.com/1170-large_default/-.jpg', 'اولاد حارتنا', 49, 'najib mahfoudh','dar e chourouk','104729'),
];

const InvoiceItem = (props) => {
  const { items, currency, onItemizedItemEdit, onRowDel, onRowAdd,handelBarcode,handelNSearch } = props;

  const handleRowDel = (item) => {
    onRowDel(item);
  };

  const itemTable = items.map((item) => (
    <ItemRow
      key={item.id}
      item={item}
      currency={currency}
      onItemizedItemEdit={onItemizedItemEdit}
      onDelEvent={() => handleRowDel(item)}
    />
  ));

  return (
    <div>
      <Table>
        <thead>
          <tr>
            <th>ITEM</th>
            <th style={{display:'flex' ,justifyContent:'center'}}>QTY</th>
            <th>PRICE</th>
            <th>Discount</th>
            <th>Subtotal</th>
            <th className="text-center">ACTION</th>
          </tr>
        </thead>
        <tbody>
          {itemTable}
          </tbody>
          <tfoot>
          <SearchField handelBarcode={handelBarcode} handelNSearch={handelNSearch}/>
         </tfoot>
      </Table>
    </div>
  );
};

const ItemRow = ({ item, currency, onItemizedItemEdit, onDelEvent,handelBarcode,handelNSearch}) => {
  const handleDelEvent = () => {
    onDelEvent();
  };
  return (

    <tr>
      <td style={{ width: '100%',alignContent:'center' }}>
          <div className="col-sm-10">
      <input data-toggle="tooltip" data-placement="top"  type="text" readOnly className="form-control-plaintext" id="name" defaultValue={item.name}/>
    </div>
      </td>
      
      <td style={{ minWidth: '140px' }}>
      <PandMField id={item.id} quantity={item.quantity} onItemizedItemEdit={onItemizedItemEdit}/>
      </td>
      <td style={{ minWidth:'130px',alignContent:'center' }}>
          <div className="col-sm-10">
      <input type="text" readOnly className="form-control-plaintext" id="price" name='price' defaultValue={item.price}/>
    </div>
      </td>
      <td style={{ minWidth: '130px' }}>
         <InputGroup className="my-1 flex-nowrap">
                <Form.Control
                id={item.id}
                  name="discount"
                  type="number"
                  value={item.discount}
                  onChange={onItemizedItemEdit}
                  className="bg-white border"
                  placeholder="0.0"
                  min="0.00"
                  step="0.01"
                  max="100.00"
                />
                <InputGroup.Text className="bg-light fw-bold text-secondary small">
                  %
                </InputGroup.Text>
              </InputGroup>
      </td>
      <td style={{ minWidth:'130px',alignContent:'center' }}>
          <div className="col-sm-10">
      <input type="text" readOnly className="form-control-plaintext" id="subtotal" name='subtotal' value={parseFloat((parseFloat(item.price) * parseInt(item.quantity)).toFixed(2)-((parseFloat(item.price) * parseInt(item.quantity)*(item.discount/100))).toFixed(2))
}/>
    </div>
      </td>
      <td className="text-center" style={{ minWidth: '30px' }}>
        <BiTrash
          onClick={handleDelEvent}
          style={{ height: '33px', width: '33px', padding: '7.5px' }}
          className="text-white mt-1 btn btn-danger"
        />
      </td>
    </tr>
  );
};

export default InvoiceItem;
