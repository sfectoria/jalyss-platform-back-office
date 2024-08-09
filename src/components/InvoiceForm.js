import React, { useState, useEffect,useRef  } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { TextField, Autocomplete, MenuItem, Typography } from '@mui/material';
import SearchField from './SearchField'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Card from 'react-bootstrap/Card';
import InvoiceItem from './InvoiceItem';
import InvoiceModal from './InvoiceModal';
import InputGroup from 'react-bootstrap/InputGroup';
import AlertAdding from './AlertAdding'



const InvoiceForm = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [currency, setCurrency] = useState('$');
  const [currentDate, setCurrentDate] = useState('');
  const [invoiceNumber, setInvoiceNumber] = useState(1);
  const [dateOfIssue, setDateOfIssue] = useState('');
  const [billTo, setBillTo] = useState('');
  const [billToEmail, setBillToEmail] = useState('');
  const [billToAddress, setBillToAddress] = useState('');
  const [billFrom, setBillFrom] = useState('');
  const [billFromEmail, setBillFromEmail] = useState('');
  const [billFromAddress, setBillFromAddress] = useState('');
  const [notes, setNotes] = useState('');
  const [total, setTotal] = useState('0.00');
  const [subTotal, setSubTotal] = useState('0.00');
  const [taxRate, setTaxRate] = useState('');
  const [taxAmount, setTaxAmount] = useState('0.00');
  const [discountRate, setDiscountRate] = useState('');
  const [discountAmount, setDiscountAmount] = useState('0.00');
  const ids = (+ new Date() + Math.floor(Math.random() * 999999)).toString(36);
  const [items, setItems] = useState([]);
  const [showSuAlert, setShowSuAlert] = useState(false);
  const [showErAlert, setShowErAlert] = useState(false);

  useEffect(() => {
    handleCalculateTotal();
    setCurrentDate(new Date().toLocaleDateString());
  }, [items]);
  const targetRef = useRef(null);

  const handleRowDel = (itemToDelete) => {
    const updatedItems = items.filter(item => item.id !== itemToDelete.id);
    setItems(updatedItems);
    handleCalculateTotal();
  };


  const handleAddEvent = (obj) => {
    const duplicate =items.find((e)=>{return (e.id===obj.id)})
    if(duplicate){
     const doubleQ=items.map((e)=>{
      if(e.id===obj.id){
       e.quantity=e.quantity+1
      }
      return e
     })
     setItems(items)
     return doubleQ
    }
    else {
    const newItem = {
      id: obj.id,
      name: obj.title,
      price: obj.price,
      barcode: '',
      quantity: 1,
      discount:0
    };
    setItems([...items, newItem]);
  }
    handleCalculateTotal();
  };
  
  const handelBarcode = (e,rows) => {
    const prod = (rows.find((element) =>{ console.log(element,e.target.value);
      return element.barcode==e.target.value}))
    if (prod) {
      handleAddEvent(prod);
      setShowSuAlert(true);
      e.target.value = '';
    } else if (e.target.value.length) {
      setShowErAlert(true);
    }
  }

  const handelNSearch = (event,value,rows) => {
      handelAddItem(value,rows)
  };
  
  const handelAddItem = (obj,rows) => {
    setShowErAlert(false)
    setShowSuAlert(true)
    handleAddEvent(obj)

  }
  const handleCalculateTotal = () => {
    let subTotal = 0;
    items.forEach(item => {
      subTotal += parseFloat((parseFloat(item.price) * parseInt(item.quantity)).toFixed(2)-((parseFloat(item.price) * parseInt(item.quantity)*(item.discount/100))).toFixed(2)
    );
    setSubTotal(subTotal.toFixed(2));
})
    const taxAmt = parseFloat(subTotal * (taxRate / 100) || 0).toFixed(2);
    setTaxAmount(taxAmt);

    const discountAmt = parseFloat(subTotal * (discountRate / 100) || 0).toFixed(2);
    setDiscountAmount(discountAmt);

    const totalAmt = parseFloat(subTotal - discountAmt + parseFloat(taxAmt)).toFixed(2);
    setTotal(totalAmt);
  };

  const onItemizedItemEdit = (event) => {
  
    const { id, name, value } = event.target;
    console.log(name,value,id);
    const updatedItems = items.map(item => {
      if (item.id == id) {
        return { ...item, [name]: value };
      }
      return item;
    });
    setItems(updatedItems);
    handleCalculateTotal();
  };

  const handelShow =()=>{
    setShowErAlert(false)
    setShowSuAlert(false)
  }

  const editField = (event) => {
    const { name, value } = event.target;
    switch (name) {
      case 'dateOfIssue':
        setDateOfIssue(value);
        break;
      case 'invoiceNumber':
        setInvoiceNumber(value);
        break;
      case 'billTo':
        setBillTo(value);
        break;
      case 'billToEmail':
        setBillToEmail(value);
        break;
      case 'billToAddress':
        setBillToAddress(value);
        break;
      case 'billFrom':
        setBillFrom(value);
        break;
      case 'billFromEmail':
        setBillFromEmail(value);
        break;
      case 'billFromAddress':
        setBillFromAddress(value);
        break;
      case 'notes':
        setNotes(value);
        break;
      case 'taxRate':
        setTaxRate(value);
        break;
      case 'discountRate':
        setDiscountRate(value);
        break;
      default:
        break;
    }
    handleCalculateTotal();
  };

  const openModal = (event) => {
    event.preventDefault();
    handleCalculateTotal();
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  const handleCurrencyChange = (event) => {
    setCurrency(event.target.value);
  };

  return (
    <Form onSubmit={openModal}>
      {showSuAlert&&<AlertAdding showAlert={showSuAlert} handelShow={handelShow} msg={'Article Added Successfully'} status={'success'}/>}
      {showErAlert&&<AlertAdding showAlert={showErAlert} handelShow={handelShow} msg={" We Can't Find This Article"} status={'error'}/>}
      <Row>
        <Col md={8} lg={9}>
          <Card className="p-4 p-xl-5 my-3 my-xl-4">
            <div className="d-flex flex-row align-items-start justify-content-between mb-3">
              <div className="d-flex flex-column">
                <div className="d-flex flex-column">
                  <div className="mb-2">
                    <span className="fw-bold">Current&nbsp;Date:&nbsp;</span>
                    <span className="current-date">{currentDate}</span>
                  </div>
                </div>
                <div className="d-flex flex-row align-items-center">
                  <span className="fw-bold d-block me-2">Due&nbsp;Date:</span>
                  <Form.Control
                    type="date"
                    value={dateOfIssue}
                    name="dateOfIssue"
                    onChange={editField}
                    style={{ maxWidth: '150px' }}
                    required
                  />
                </div>
              </div>
              <div className="d-flex flex-row align-items-center">
                <span className="fw-bold me-2">Invoice&nbsp;Number:&nbsp;</span>
                <Form.Control
                  type="number"
                  value={invoiceNumber}
                  name="invoiceNumber"
                  onChange={editField}
                  min="1"
                  style={{ maxWidth: '70px' }}
                  required
                />
              </div>
            </div>
            <hr className="my-4" />
            <Row className="mb-5">
              <Col>
                <Form.Label className="fw-bold">Bill to:</Form.Label>
                <Form.Control
                  placeholder={"Who is this invoice to?"}
                  rows={3}
                  value={billTo}
                  type="text"
                  name="billTo"
                  className="my-2"
                  onChange={editField}
                  autoComplete="name"
                  required
                />
                <Form.Control
                  placeholder={"Email address"}
                  value={billToEmail}
                  type="email"
                  name="billToEmail"
                  className="my-2"
                  onChange={editField}
                  autoComplete="email"
                  required
                />
                <Form.Control
                  placeholder={"Billing address"}
                  value={billToAddress}
                  type="text"
                  name="billToAddress"
                  className="my-2"
                  autoComplete="address"
                  onChange={editField}
                  required
                />
              </Col>
              <Col>
                <Form.Label className="fw-bold">Bill from:</Form.Label>
                <Form.Control
                  placeholder={"Who is this invoice from?"}
                  rows={3}
                  value={billFrom}
                  type="text"
                  name="billFrom"
                  className="my-2"
                  onChange={editField}
                  autoComplete="name"
                  required
                />
                <Form.Control
                  placeholder={"Email address"}
                  value={billFromEmail}
                  type="email"
                  name="billFromEmail"
                  className="my-2"
                  onChange={editField}
                  autoComplete="email"
                  required
                />
                <Form.Control
                  placeholder={"Billing address"}
                  value={billFromAddress}
                  type="text"
                  name="billFromAddress"
                  className="my-2"
                  autoComplete="address"
                  onChange={editField}
                  required
                />
              </Col>
            </Row>
            <div ref={targetRef}>
            <InvoiceItem
              onItemizedItemEdit={onItemizedItemEdit}
              onRowAdd={handleAddEvent}
              onRowDel={handleRowDel}
              currency={currency}
              items={items}
              handelBarcode={handelBarcode}
              handelNSearch={handelNSearch}
            />
            </div>
            <Row className="mt-4 justify-content-end">
              <Col lg={6}>
                <div className="d-flex flex-row align-items-start justify-content-between">
                  <span className="fw-bold">Subtotal:</span>
                  <span>{currency}{subTotal}</span>
                </div>
                <div className="d-flex flex-row align-items-start justify-content-between mt-2">
                  <span className="fw-bold">Discount:</span>
                  <span>
                    <span className="small">({discountRate || 0}%)</span>
                    {currency}{discountAmount || 0}
                  </span>
                </div>
                <div className="d-flex flex-row align-items-start justify-content-between mt-2">
                  <span className="fw-bold">Tax:</span>
                  <span>
                    <span className="small">({taxRate || 0}%)</span>
                    {currency}{taxAmount || 0}
                  </span>
                </div>
                <hr />
                <div className="d-flex flex-row align-items-start justify-content-between" style={{ fontSize: '1.125rem' }}>
                  <span className="fw-bold">Total:</span>
                  <span className="fw-bold">{currency}{total || 0}</span>
                </div>
              </Col>
            </Row>
            <hr className="my-4" />
            <Form.Label className="fw-bold">Notes:</Form.Label>
            <Form.Control
              placeholder="Thanks for your business!"
              name="notes"
              value={notes}
              onChange={editField}
              as="textarea"
              className="my-2"
              rows={1}
            />
          </Card>
        </Col>
        <Col md={4} lg={3}>
          <div className="sticky-top pt-md-3 pt-xl-4">
            <Button variant="primary" type="submit" className="d-block w-100">Review Invoice</Button>
            <InvoiceModal
              showModal={isOpen}
              closeModal={closeModal}
              info={{
                currentDate,
                dateOfIssue,
                invoiceNumber,
                billTo,
                billToEmail,
                billToAddress,
                billFrom,
                billFromEmail,
                billFromAddress,
                notes,
                total,
                subTotal,
                taxAmount,
                discountAmount
              }}
              items={items}
              currency={currency}
              subTotal={subTotal}
              taxAmount={taxAmount}
              discountAmount={discountAmount}
              total={total}
            />
            <Form.Group className="mb-3">
              <Form.Label className="fw-bold">Currency:</Form.Label>
              <Form.Select
                onChange={handleCurrencyChange}
                className="btn btn-light my-1"
                aria-label="Change Currency"
              >
                <option value="$">USD (United States Dollar)</option>
                <option value="£">GBP (British Pound Sterling)</option>
                <option value="¥">JPY (Japanese Yen)</option>
                <option value="$">CAD (Canadian Dollar)</option>
                <option value="$">AUD (Australian Dollar)</option>
                <option value="$">SGD (Signapore Dollar)</option>
                <option value="¥">CNY (Chinese Renminbi)</option>
                <option value="₿">BTC (Bitcoin)</option>
              </Form.Select>
            </Form.Group>
            <Form.Group className="my-3">
              <Form.Label className="fw-bold">Tax rate:</Form.Label>
              <InputGroup className="my-1 flex-nowrap">
                <Form.Control
                  name="taxRate"
                  type="number"
                  value={taxRate}
                  onChange={editField}
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
            </Form.Group>
            <Form.Group className="my-3">
              <Form.Label className="fw-bold">Discount rate:</Form.Label>
              <InputGroup className="my-1 flex-nowrap">
                <Form.Control
                  name="discountRate"
                  type="number"
                  value={discountRate}
                  onChange={editField}
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
            </Form.Group>
          </div>
        </Col>
      </Row>
    </Form>
  );
};

export default InvoiceForm;


