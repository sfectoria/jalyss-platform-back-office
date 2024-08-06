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
  const { items, currency, onItemizedItemEdit, onRowDel, onRowAdd,handelBarcode } = props;

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
      handelBarcode={handelBarcode}
    />
  ));

  return (
    <div>
      <Table>
        <thead>
          <tr>
            <th>ITEM</th>
            <th>QTY</th>
            <th>PRICE/RATE</th>
            <th>Discount</th>
            <th className="text-center">ACTION</th>
          </tr>
        </thead>
          {itemTable}
      </Table>
      <Button className="fw-bold" onClick={()=>{onRowAdd('hhh',12)}}>Add Item</Button>
    </div>
  );
};

const ItemRow = ({ item, currency, onItemizedItemEdit, onDelEvent,handelBarcode }) => {
  const handleDelEvent = () => {
    onDelEvent();
  };

  return (
    <tbody>
    <tr style={{}}>
      <td style={{ width: '100%',alignContent:'center' }}>
          <div className="col-sm-10">
      <input data-toggle="tooltip" data-placement="top"  type="text" readOnly className="form-control-plaintext" id="name" defaultValue={'lalalalalalalalalalalalalalalalalalalalalalalalalalalalalalalalalalalalalalalalalalalalalalalalalalalalalalalalalalalalalalalalala'}/>
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
        {/* <EditableField
          onItemizedItemEdit={onItemizedItemEdit}
          cellData={{
            leading: '%',
            type: "number",
            name: "discount",
            min: 1,
            step: "0.01",
            precision: 2,
            textAlign: "text-end",
            value: item.discount,
            id: item.id,
          }}
        /> */}
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
      <td className="text-center" style={{ minWidth: '50px' }}>
        <BiTrash
          onClick={handleDelEvent}
          style={{ height: '33px', width: '33px', padding: '7.5px' }}
          className="text-white mt-1 btn btn-danger"
        />
      </td>
    </tr>
    <SearchField/>
    
    </tbody>
  );
};

export default InvoiceItem;
