import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Table from "react-bootstrap/Table";
import { BiTrash } from "react-icons/bi";
import PandMField from "./PandMField";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import SearchField from "./SearchField";

const InvoiceItem = (props) => {
  const {
    items,
    currency,
    onItemizedItemEdit,
    onRowDel,
    onRowAdd,
    handelBarcodeSu,
    handelBarcodeEr,
    handelNSearch,
    type,
    info,
  } = props;

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
      type={type}
    />
  ));

  return (
    <div>
      <Table>
        <thead>
          <tr>
            <th>ITEM</th>
            <th style={{ display: "flex", justifyContent: "center" }}>QTY</th>
            {type!=='BT'&&<th>PRICE</th>}
            {type!=='BT'&&<th>Discount</th>}
            {type!=='BT'&&<th>Subtotal</th>}
            <th className="text-center">ACTION</th>
          </tr>
        </thead>
        <tbody>{itemTable}</tbody>
        <tfoot>
          <SearchField
            handelBarcodeSu={handelBarcodeSu}
            handelBarcodeEr={handelBarcodeEr}
            handelNSearch={handelNSearch}
            info={info}
            type={type}
          />
        </tfoot>
      </Table>
    </div>
  );
};

const ItemRow = ({
  item,
  currency,
  onItemizedItemEdit,
  onDelEvent,
  handelBarcode,
  handelNSearch,
  type,
}) => {
  const handleDelEvent = () => {
    onDelEvent();
  };
  console.log(item);
  
  return (
    <tr>
      <td style={{ width: "100%", alignContent: "center" }}>
        <div className="col-sm-10">
          <input
            data-toggle="tooltip"
            data-placement="top"
            type="text"
            readOnly
            className="form-control-plaintext"
            id="name"
            defaultValue={item.name}
          />
        </div>
      </td>

      <td style={{ minWidth: "140px" }}>
        <PandMField
          id={item.id}
          quantity={item.quantity}
          stockQuantity={item.stockQuantity}
          onItemizedItemEdit={onItemizedItemEdit}
          type={type}
        />
      </td>
     { type !== "BT"&&<td style={{ minWidth: "140px", alignContent: "center" }}>
        {(type === "BR" || type ==='BS' )? (
          <InputGroup className="my-1 flex-nowrap">
            <Form.Control
              id={item.id}
              name="price"
              type="number"
              value={item.price}
              onChange={onItemizedItemEdit}
              className="bg-white border"
              placeholder="0.0"
              min="0.00"
              step="0.01"
              required
            />
            <InputGroup.Text className="bg-light fw-bold text-secondary small">
              DT
            </InputGroup.Text>
          </InputGroup>
        ) : (
          <div className="col-sm-10">
            <input
              type="text"
              readOnly
              className="form-control-plaintext"
              id="price"
              name="price"
              defaultValue={item.price}
            />
          </div>
        )}
      </td>}
      { type !== "BT"&& <td style={{ minWidth: "130px" }}>
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
      </td>}
      { type !== "BT"&&<td style={{ minWidth: "130px", alignContent: "center" }}>
        <div className="col-sm-10">
          <input
            type="text"
            readOnly
            className="form-control-plaintext"
            id="subtotal"
            name="subtotal"
            value={parseFloat(
              (parseFloat(item.price) * parseInt(item.quantity)).toFixed(2) -
                (
                  parseFloat(item.price) *
                  parseInt(item.quantity) *
                  (item.discount / 100)
                ).toFixed(2)
            )||0}
          />
        </div>
      </td>}
      <td className="text-center" style={{ minWidth: "30px" }}>
        <BiTrash
          onClick={handleDelEvent}
          style={{ height: "33px", width: "33px", padding: "7.5px" }}
          className="text-white mt-1 btn btn-danger"
        />
      </td>
    </tr>
  );
};

export default InvoiceItem;
