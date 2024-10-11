import React, { useState, useEffect, useRef } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import { TextField, Autocomplete, MenuItem, Typography } from "@mui/material";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Card from "react-bootstrap/Card";
import InvoiceItem from "./InvoiceItem";
import InvoiceModal from "./InvoiceModal";
import InputGroup from "react-bootstrap/InputGroup";
import AlertAdding from "./AlertAdding";
import { useLocation, useNavigate } from "react-router-dom";
import PersonPresent from "./PersonPresent";
import PersonSearch from "./PersonSearch";
import { useParams } from "react-router-dom";
import axios from "axios";
import { ip } from "../constants/ip";
import SuccessOperationPopUp from "./SuccessOperationPopUp";
import { handelInfo } from "./helperFunctions/handelInfo";

const InvoiceForm = () => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [currency, setCurrency] = useState("DT");
  const [paymentType, setPaymentType] = useState("Cash");
  const [paymentStatus, setPaymentStatus] = useState("Payed");
  const [currentDate, setCurrentDate] = useState("");
  const [invoiceNumber, setInvoiceNumber] = useState(1);
  const [dateOfIssue, setDateOfIssue] = useState("");
  const [billToId, setBillToId] = useState(0);
  const [billTo, setBillTo] = useState("");
  const [billToEmail, setBillToEmail] = useState("");
  const [billToAddress, setBillToAddress] = useState("");
  const [billFromId, setBillFromId] = useState(0);
  const [billFrom, setBillFrom] = useState("");
  const [billFromEmail, setBillFromEmail] = useState("");
  const [billFromAddress, setBillFromAddress] = useState("");
  const [notes, setNotes] = useState("");
  const [total, setTotal] = useState("0.00");
  const [payedAmount, setPayedAmount] = useState(0);
  const [subTotal, setSubTotal] = useState(0.0);
  const [taxRate, setTaxRate] = useState("");
  const [taxAmount, setTaxAmount] = useState("0.00");
  const [discountRate, setDiscountRate] = useState("");
  const [discountAmount, setDiscountAmount] = useState("0.00");
  const [items, setItems] = useState([]);
  const [showSuAlert, setShowSuAlert] = useState(false);
  const [showErAlert, setShowErAlert] = useState(false);
  const [msgArticle, setMsgArticle] = useState("");
  const [invoiceTitle, setInvoiceTitle] = useState("");
  const [reqName, setReqName] = useState("");
  const [reqClient, setReqClient] = useState("idClient");
  const [reqChannel, setReqChannel] = useState("saleChannelId");
  const [reqLine, setReqLine] = useState("lines");
  const [reqDate, setReqDate] = useState("date");
  const [suOp, setSuOp] = useState(null);
  const [info, setInfo] = useState({});
  const param = useParams();

  const { type, receiver, sender } = param;
  console.log(items);
  useEffect(() => {
    handelInfo(
      type,
      setInvoiceTitle,
      setReqName,
      setReqLine,
      setReqChannel,
      setReqClient,
      setReqDate
    );
    handleCalculateTotal();
    setCurrentDate(new Date().toLocaleDateString());
  }, [items]);
  const targetRef = useRef(null);

  const handleRowDel = (itemToDelete) => {
    const updatedItems = items.filter((item) => item.id !== itemToDelete.id);
    setItems(updatedItems);
    handleCalculateTotal();
  };

  const finishSale = async () => {
    try {
      let saleStatus = false;
      if (
        type === "BL" ||
        type === "BLF" ||
        type === "F" ||
        type === "Ticket"
      ) {
        const itemsWithIdArticle = items.map((e) => {
          let { id, quantity, price, discount, ...rest } = e;
          const articleId = id;
          price = price ? parseFloat(price) : 0;
          discount = parseFloat(discount);
          return { articleId, quantity, price, discount };
        });
        console.log(itemsWithIdArticle, "itemsWithIdArticle");

        const obj = {
          exitNoteId: 0,
          [reqClient]: billToId,
          [reqChannel]: billFromId,
          [reqDate]: new Date(),
          totalAmount: parseFloat(total),
          payedAmount: payedAmount
            ? parseFloat(payedAmount)
            : parseFloat(total),
          restedAmount: payedAmount
            ? parseFloat(total) - parseFloat(payedAmount)
            : 0,
          tax: taxRate ? parseFloat(taxRate) : 0,
          discount: discountAmount ? parseFloat(discountAmount) : 0,
          paymentType: paymentType,
          paymentStatus: paymentStatus,
          [reqLine]: itemsWithIdArticle,
        };
        console.log(obj);

        const response = await axios.post(`${ip}/${reqName}/create`, obj);
        console.log("Response:", response.data);
        console.log(response.status);

        if (response && response.status === 201) {
          setTimeout(() => navigate(-1), 2500);
          setItems([]);
          saleStatus = true;
        }
      } else if (
        type === "Bl" ||
        type === "Blf" ||
        type === "f" ||
        type === "ticket"
      ) {
        const itemsWithIdArticle = items.map((e) => {
          let { id, quantity, price, discount, ...rest } = e;
          const idArticle = id;
          price = parseFloat(price);
          discount = parseFloat(discount);
          quantity = parseInt(quantity);
          return { idArticle, quantity, price, discount };
        });
        console.log(itemsWithIdArticle);

        const obj = {
          deliveryDate: new Date(),
          idStock: billFromId,
          idReceiptNote: 0,
          totalAmount: parseFloat(total),
          payedAmount: payedAmount
            ? parseFloat(payedAmount)
            : parseFloat(total),
          restedAmount: payedAmount
            ? parseFloat(total) - parseFloat(payedAmount)
            : 0,
          tax: taxRate ? parseFloat(taxRate) : 0,
          discount: discountAmount ? parseFloat(discountAmount) : 0,
          paymentType: paymentType,
          paymentStatus: paymentStatus,
          lines: itemsWithIdArticle,
        };
        const response = await axios.post(`${ip}/${reqName}/create`, obj);
        if (response && response.status === 201) {
          setTimeout(() => navigate(-1), 2500);
          setItems([]);
          saleStatus = true;
        }
      } else if (type === "BS") {
        const itemsWithIdArticle = items.map((e) => {
          let { id, quantity, price, discount, ...rest } = e;
          const articleId = id;
          price = parseFloat(price);
          discount = parseFloat(discount);
          return { articleId, quantity, price, discount };
        });
        console.log(itemsWithIdArticle, "itemsWithIdArticle");

        const obj = {
          numExitNote: 0,
          stockId: billFromId,
          exitDate: new Date(),
          totalAmount: parseFloat(total),
          payedAmount: payedAmount
            ? parseFloat(payedAmount)
            : parseFloat(total),
          restedAmount: payedAmount
            ? parseFloat(total) - parseFloat(payedAmount)
            : 0,
          tax: taxRate ? parseFloat(taxRate) : 0,
          discount: discountAmount ? parseFloat(discountAmount) : 0,
          paymentType: paymentType,
          paymentStatus: paymentStatus,
          lines: itemsWithIdArticle,
        };

        const response = await axios.post(
          `${ip}/exitNote/create_exitNote`,
          obj
        );
        console.log("Response:", response.data);
        console.log(response.status);
        if (response && response.status === 201) {
          setTimeout(() => navigate(-1), 2500);
          setItems([]);
          saleStatus = true;
        }
      } else if (type === "BC") {
        const itemsWithIdArticle = items.map((e) => {
          let { id, quantity, ...rest } = e;
          const idArticle = id;
          return { idArticle, quantity };
        });
        console.log(itemsWithIdArticle);

        const obj = {
          idClient: billToId,
          salesChannelsId: billFromId,
          status: "Pending",
          date: new Date(),
          orderDate: new Date(),
          purchaseOrderLine: itemsWithIdArticle,
        };
        const response = await axios.post(`${ip}/purchaseOrder/create`, obj);

        if (response && response.status === 201) {
          setTimeout(() => navigate(-1), 2500);
          setItems([]);
          saleStatus = true;
        }
      } else if (type === "Devis") {
        const itemsWithIdArticle = items.map((e) => {
          let { id, quantity, discount, price, ...rest } = e;
          const idArticle = id;
          price = parseFloat(price);
          discount = parseFloat(discount);
          return { idArticle, quantity, price, discount };
        });
        console.log(itemsWithIdArticle);

        const obj = {
          idClient: billToId,
          salesChannelId: billFromId,
          date: new Date(),
          totalAmount: parseFloat(total),
          tax: taxRate ? parseFloat(taxRate) : 0,
          discount: discountAmount ? parseFloat(discountAmount) : 0,
          estimateLine: itemsWithIdArticle,
        };
        const response = await axios.post(`${ip}/estimate/create`, obj);

        if (response && response.status === 201) {
          setTimeout(() => navigate(-1), 2500);
          setItems([]);
          saleStatus = true;
        }
      } else if (type === "BR") {
        const itemsWithIdArticle = items.map((e) => {
          console.log(e);
          let { id, quantity, price, discount, ...rest } = e;
          const idArticle = id;
          price = parseFloat(price);
          discount = parseFloat(discount);
          quantity = parseInt(quantity);
          return { idArticle, quantity, price, discount };
        });
        console.log(itemsWithIdArticle);

        const obj = {
          typeReceipt: "achat",
          receiptDate: new Date(),
          idStock: billFromId,
          totalAmount: parseFloat(total),
          payedAmount: payedAmount
            ? parseFloat(payedAmount)
            : parseFloat(total),
          restedAmount: payedAmount
            ? parseFloat(total) - parseFloat(payedAmount)
            : 0,
          tax: taxRate ? parseFloat(taxRate) : 0,
          discount: discountAmount ? parseFloat(discountAmount) : 0,
          paymentType: paymentType,
          paymentStatus: paymentStatus,
          lines: itemsWithIdArticle,
          numReceiptNote: 0,
        };
        const response = await axios.post(`${ip}/receiptNote/create_rn`, obj);
        if (response && response.status === 201) {
          setTimeout(() => navigate(-1), 2500);
          setItems([]);
          saleStatus = true;
        }
      } else if (type === "BT") {
        const itemsWithIdArticle = items.map((e) => {
          console.log(e);
          let { id, quantity, ...rest } = e;
          const idArticle = id;
          quantity = parseInt(quantity);
          return { idArticle, quantity };
        });
        console.log(itemsWithIdArticle);

        const obj = {
          from: billFromId,
          to: billToId,
          date: new Date(),
          idReceiptNote: 0,
          idExitNote: 0,
          lines: itemsWithIdArticle,
        };
        const response = await axios.post(`${ip}/transfer-note/createTN`, obj);
        if (response && response.status === 201) {
          setTimeout(() => navigate(-1), 2500);
          setItems([]);
          saleStatus = true;
        }
      } else if (type === "BRe") {
        const itemsWithIdArticle = items.map((e) => {
          console.log(e);
          let { id, quantity, ...rest } = e;
          const idArticle = id;
          quantity = parseInt(quantity);
          return { idArticle, quantity };
        });
        console.log(itemsWithIdArticle);

        const obj = {
          returnDate: new Date(),
          lines: itemsWithIdArticle,
          idClient: billFromId,
          idStock: billToId,
          receiptNoteId: 0,
        };
        const response = await axios.post(`${ip}/return-note/createRN`, obj);

        if (response && response.status === 201) {
          setTimeout(() => navigate(-1), 2500);
          setItems([]);
          saleStatus = true;
        }
      }
      closeModal();
      saleStatus && setSuOp(true);
      return saleStatus;
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleAddEvent = (obj) => {
    const duplicate = items.find((e) => {
      return e.id === obj.id;
    });
    if (duplicate) {
      let verify = 0;
      const doubleQ = items.map((e) => {
        if (
          e.id === obj.id &&
          e.quantity < e.stockQuantity &&
          type !== "BR" &&
          type !== "Bl" &&
          type !== "Blf" &&
          type !== "f" &&
          type !== "ticket"
        ) {
          e.quantity = e.quantity + 1;
          verify += 1;
        } else if (
          e.id === obj.id &&
          (type === "BR" ||
            type === "Bl" ||
            type === "Blf" ||
            type === "f" ||
            type === "ticket")
        ) {
          e.quantity = e.quantity + 1;
          verify += 1;
        }
        return e;
      });
      var hhh = JSON.stringify(verify) === JSON.stringify(doubleQ);
      console.log(hhh, verify);
      if (verify) setShowSuAlert(true);
      else {
        setShowErAlert(true);
        setMsgArticle("You've reached the maximum limit.");
      }
      setItems(doubleQ);
    } else {
      console.log(obj);

      const newItem = {
        id: obj.id,
        name: obj.name,
        price: obj.price,
        barcode: "",
        quantity: 1,
        publisher: obj.publisher,
        author: obj.author,
        stockQuantity: obj.quantity,
        discount: 0,
      };
      setShowSuAlert(true);
      setItems([...items, newItem]);
    }
    handleCalculateTotal();
  };

  const handelBarcodeSu = (e) => {
    console.log(e);

    handelShow();
    handleAddEvent(e);
    // setShowSuAlert(true);
  };

  const handelBarcodeEr = (e) => {
    console.log(e);
    handelShow();
    setMsgArticle(e);
    setShowErAlert(true);
  };

  const handelNSearch = (event, value) => {
    handelAddItem(value);
  };

  const handelAddItem = (obj) => {
    setShowErAlert(false);
    // setShowSuAlert(true);
    handleAddEvent(obj);
  };
  const handelSearchPerson = (event, type, rows) => {
    if (type === "viaName") {
      return rows.filter((row) => row.name.includes(event));
    }
    if (type === "viaEmail") {
      return rows.filter((row) => row.email.includes(event));
    }
    if (type === "viaAddress") {
      return rows.filter((row) => row.address.includes(event));
    }
  };

  const handleCalculateTotal = () => {
    let subTotal = 0;
    items.forEach((item) => {
      subTotal += parseFloat(
        (parseFloat(item.price) * parseInt(item.quantity)).toFixed(2) -
          (
            parseFloat(item.price) *
            parseInt(item.quantity) *
            (item.discount / 100)
          ).toFixed(2)
      );
      setSubTotal(subTotal.toFixed(2));
    });
    const taxAmt = parseFloat(subTotal * (taxRate / 100) || 0).toFixed(2);
    setTaxAmount(taxAmt);

    const discountAmt = parseFloat(
      subTotal * (discountRate / 100) || 0
    ).toFixed(2);
    setDiscountAmount(discountAmt);

    const totalAmt = parseFloat(
      subTotal - discountAmt + parseFloat(taxAmt)
    ).toFixed(2);
    setTotal(totalAmt);
  };

  const onItemizedItemEdit = (event) => {
    const { id, name, value } = event.target;
    console.log(name, value, id);
    const updatedItems = items.map((item) => {
      if (item.id == id) {
        if (name === "quantity" && value !== "")
          return { ...item, [name]: parseInt(value) };
        else return { ...item, [name]: value };
      }
      return item;
    });
    setItems(updatedItems);
    handleCalculateTotal();
  };

  const handelShow = () => {
    setShowErAlert(false);
    setShowSuAlert(false);
  };
  console.log(billTo, billToId, billFrom, billFromId);

  const editField = (event) => {
    const { name, value } = event.target;
    switch (name) {
      case "dateOfIssue":
        setDateOfIssue(value);
        break;
      case "invoiceNumber":
        setInvoiceNumber(value);
        break;
      case "billTo":
        setBillTo(value);
        break;
      case "billToEmail":
        setBillToEmail(value);
        break;
      case "billToAddress":
        setBillToAddress(value);
        break;
      case "billFrom":
        setBillFrom(value);
        break;
      case "billFromEmail":
        setBillFromEmail(value);
        break;
      case "billFromAddress":
        setBillFromAddress(value);
        break;
      case "notes":
        setNotes(value);
        break;
      case "taxRate":
        setTaxRate(value);
        break;
      case "discountRate":
        setDiscountRate(value);
        break;
      case "payedAmount":
        setPayedAmount(value);
        break;
      default:
        break;
    }
    handleCalculateTotal();
  };
  console.log(payedAmount, total);

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
  const handlePTypeChange = (event) => {
    setPaymentType(event.target.value);
  };

  return (
    <Form onSubmit={openModal}>
      {suOp && <SuccessOperationPopUp open={true} />}
      {showSuAlert && (
        <AlertAdding
          showAlert={showSuAlert}
          handelShow={handelShow}
          msg={"Article Added Successfully"}
          status={"success"}
        />
      )}
      {showErAlert && (
        <AlertAdding
          showAlert={showErAlert}
          handelShow={handelShow}
          msg={msgArticle}
          status={"error"}
        />
      )}
      <Row>
        <Col md={8} lg={9}>
          <Card className="p-4 p-xl-5 my-3 my-xl-4">
            <div className="d-flex flex-row align-items-start justify-content-between mb-3">
              <div className="d-flex flex-column">
                <div className="d-flex flex-column">
                  <div className="mb-2">
                    <p className="h2 fw-bold">{invoiceTitle}</p>
                  </div>
                </div>
                <div className="d-flex flex-row align-items-center">
                  <span className="fw-bold d-block me-2">
                    Current&nbsp;Date:&nbsp;
                  </span>
                  <span className="current-date">{currentDate}</span>
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
                  style={{ maxWidth: "70px" }}
                  required
                />
              </div>
            </div>
            <hr className="my-4" />
            <Row className="mb-5">
              <Col>
                <Form.Label className="fw-bold">Bill to:</Form.Label>
                {param.receiver !== "0" ? (
                  <PersonPresent
                    person={receiver}
                    type={type}
                    reff={"resv"}
                    setId={setBillToId}
                    setName={setBillTo}
                    setEmail={setBillToEmail}
                    setAddress={setBillToAddress}
                  />
                ) : (
                  <div>
                    <PersonSearch
                      person={receiver}
                      type={type}
                      reff={"resv"}
                      setId={setBillToId}
                      setName={setBillTo}
                      setEmail={setBillToEmail}
                      setAddress={setBillToAddress}
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
                  </div>
                )}
              </Col>
              <Col>
                <Form.Label className="fw-bold">Bill from:</Form.Label>
                {param.sender !== "0" ? (
                  <PersonPresent
                    person={sender}
                    type={type}
                    reff={"sndr"}
                    setId={setBillFromId}
                    setName={setBillFrom}
                    setEmail={setBillFromEmail}
                    setAddress={setBillFromAddress}
                  />
                ) : (
                  <div>
                    <PersonSearch
                      person={sender}
                      type={type}
                      reff={"sndr"}
                      setId={setBillFromId}
                      setName={setBillFrom}
                      setEmail={setBillFromEmail}
                      setAddress={setBillFromAddress}
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
                  </div>
                )}
              </Col>
            </Row>
            <div ref={targetRef}>
              <InvoiceItem
                onItemizedItemEdit={onItemizedItemEdit}
                onRowAdd={handleAddEvent}
                onRowDel={handleRowDel}
                currency={currency}
                items={items}
                handelBarcodeSu={handelBarcodeSu}
                handelBarcodeEr={handelBarcodeEr}
                handelNSearch={handelNSearch}
                type={type}
                info={{
                  type: type,
                  receiver: billToId,
                  sender: billFromId,
                }}
              />
            </div>
            {type !== "BT" && (
              <Row className="mt-4 justify-content-end">
                <Col lg={6}>
                  <div className="d-flex flex-row align-items-start justify-content-between">
                    <span className="fw-bold">Subtotal:</span>
                    <span>
                      {subTotal || 0}
                      {currency}
                    </span>
                  </div>
                  <div className="d-flex flex-row align-items-start justify-content-between mt-2">
                    <span className="fw-bold">Discount:</span>
                    <span>
                      <span className="small">({discountRate || 0}%)</span>
                      {discountAmount || 0}
                      {currency}
                    </span>
                  </div>
                  <div className="d-flex flex-row align-items-start justify-content-between mt-2">
                    <span className="fw-bold">Tax:</span>
                    <span>
                      <span className="small">({taxRate || 0}%)</span>
                      {taxAmount || 0}
                      {currency}
                    </span>
                  </div>
                  <hr />
                  <div
                    className="d-flex flex-row align-items-start justify-content-between"
                    style={{ fontSize: "1.125rem" }}
                  >
                    <span className="fw-bold">Total:</span>
                    <span className="fw-bold">
                      {total || 0}
                      {currency}
                    </span>
                  </div>
                </Col>
              </Row>
            )}
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
            <Button variant="primary" type="submit" className="d-block w-100">
              Review Invoice
            </Button>
            {isOpen && (
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
                  discountAmount,
                }}
                itemsData={items}
                currency={currency}
                subTotal={subTotal}
                taxAmount={taxAmount}
                discountAmount={discountAmount}
                total={total}
                finishSale={finishSale}
                mode="creation"
                invoiceTitle={invoiceTitle}
              />
            )}

            {type !== "BT" && (
              <Form.Group className="mb-3 mt-3">
                <Form.Label className="fw-bold">Currency:</Form.Label>
                <Form.Select
                  onChange={handleCurrencyChange}
                  className="btn btn-light my-1"
                  aria-label="Change Currency"
                >
                  <option value="DT">DT (Tunisian Dinar)</option>
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
            )}
            {type !== "BC" && type !== "BT" && (
              <>
                <Form.Group className="mb-3">
                  <Form.Label className="fw-bold">Payment:</Form.Label>
                  <Form.Select
                    onChange={handlePTypeChange}
                    className="btn btn-light my-1"
                    aria-label="Change Currency"
                  >
                    <option value="Cash">💰 Cash </option>
                    <option value="CreditCard">💳 Credit Card </option>
                    <option value="Checks">🧾 Checks </option>
                    <option value="BankTransfers">🏦 Bank Transfers </option>
                  </Form.Select>

                  <Form.Group className="my-3">
                    <div className="d-flex gap-3">
                      {paymentStatus === "Payed" ? (
                        <button
                          type="button"
                          class="btn btn-success"
                          onClick={() => {
                            setPaymentStatus("Payed");
                          }}
                        >
                          Payed
                        </button>
                      ) : (
                        <button
                          type="button"
                          class="btn btn-outline-success"
                          onClick={() => {
                            setPaymentStatus("Payed");
                          }}
                        >
                          Payed
                        </button>
                      )}
                      {paymentStatus === "PartiallyPayed" ? (
                        <button
                          type="button"
                          class="btn btn-warning"
                          onClick={() => {
                            setPaymentStatus("PartiallyPayed");
                          }}
                        >
                          Partially
                        </button>
                      ) : (
                        <button
                          type="button"
                          class="btn btn-outline-warning"
                          onClick={() => {
                            setPaymentStatus("PartiallyPayed");
                          }}
                        >
                          Partially
                        </button>
                      )}
                      {paymentStatus === "NotPayed" ? (
                        <button
                          type="button"
                          class="btn btn-danger"
                          onClick={() => {
                            setPaymentStatus("NotPayed");
                          }}
                        >
                          Not Payed
                        </button>
                      ) : (
                        <button
                          type="button"
                          class="btn btn-outline-danger"
                          onClick={() => {
                            setPaymentStatus("NotPayed");
                          }}
                        >
                          Not Payed
                        </button>
                      )}
                    </div>
                  </Form.Group>
                </Form.Group>
                {paymentStatus === "PartiallyPayed" && (
                  <Form.Group className="my-3">
                    <Form.Label className="fw-bold">Payed Amount</Form.Label>
                    <InputGroup className="my-1 flex-nowrap">
                      <Form.Control
                        name="payedAmount"
                        type="number"
                        value={payedAmount}
                        onChange={editField}
                        className="bg-white border"
                        placeholder="0.0"
                        min="0.00"
                        step="0.01"
                      />
                      <InputGroup.Text className="bg-light fw-bold text-secondary small">
                        {currency}
                      </InputGroup.Text>
                    </InputGroup>
                  </Form.Group>
                )}
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
                </Form.Group>{" "}
              </>
            )}
          </div>
        </Col>
      </Row>
    </Form>
  );
};

export default InvoiceForm;
