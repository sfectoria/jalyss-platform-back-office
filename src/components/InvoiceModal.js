import React, { useEffect, useRef, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Table from "react-bootstrap/Table";
import Modal from "react-bootstrap/Modal";
import { BiPaperPlane, BiCloudDownload } from "react-icons/bi";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import axios from "axios";
import { ip } from "../constants/ip";
import Alert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";
import jalyssImage from "../assets/jalyss-image-preview.png";

const InvoiceModal = ({
  showModal,
  closeModal,
  currency,
  modalId,
  idChannel,
  info,
  itemsData,
  subTotal,
  total,
  discountAmount,
  finishSale,
  mode,
  type,
  invoiceTitle,
  invoiceState,
}) => {
  const invoiceCaptureRef = useRef(null);
  const [items, setItems] = useState([]);
  const [date, setDate] = useState("");
  const [billTo, setBillTo] = useState({});
  const [billFrom, setBillFrom] = useState({});
  const [amount, setAmount] = useState(0);
  const [subTotall, setSubTotal] = useState(0);
  const [totall, setTotal] = useState(0);
  const [pStatus, setPStatus] = useState("");
  const [pStatusColor, setPStatusColor] = useState("");
  const [pType, setPType] = useState("");
  const [status, setStatus] = useState(invoiceState || "");
  const [title, setTitle] = useState("");
  const [successAlert, setSuccessAlert] = useState(false);
  const [errorAlert, setErrorAlert] = useState(false);

  useEffect(() => {
    if (mode === "viewer") {
      console.log(type, "type");

      if (type === "exit") {
        fetchModalDataExit();
      } else if (type === "receipt") {
        fetchModalDataReceipt();
      } else if (type === "return") {
        fetchModalDataReturn();
      }
       else if (type === "command") {
        fetchModalDataCommand();
      }
    } else if (mode === "creation") {
      setBillTo({
        name: info.billTo,
        address: info.billToAddress,
        email: info.billToEmail,
      });
      setBillFrom({
        name: info.billFrom,
        address: info.billFromAddress,
        email: info.billFromEmail,
      });
      setItems(itemsData);
      setSubTotal(subTotal);
      setTotal(total);
      setTitle(invoiceTitle);
      setDate(new Date().toISOString());
      console.log(billTo, billFrom);
    }
  }, []);
  console.log(idChannel, modalId, mode);

  const fetchModalDataExit = async () => {
    const response = await axios.get(`${ip}/exitNote/${modalId}`);
    console.log(response.data);

    let e = response.data;
    setPStatus(e.paymentStatus);
    setPType(e.paymentType);
    setTitle("Bon de Sortie");
    console.log(response.data.transferNote);
    let itemsData = e.exitNoteLine.reduce(
      (acc, el) => {
        let { Article, quantity, price, discount } = el;
        acc.data.push({ ...Article, quantity, price, discount });
        return acc;
      },
      { data: [] }
    );
    setBillTo({
      name: e.client?.fullName,
      address: e.client?.address,
      email: e.client?.email,
    });
    setBillFrom({
      name: e.stock?.name,
      address: e.stock?.location,
      email: "jalyss@gmail.com",
    });
    if (e.transferNote.length) {
      setBillTo({
        name: e.transferNote[0].stockTo.name,
        address: e.transferNote[0].stockTo.location,
        // email:e.transferNote[0].stockTo.email
      });
      setBillFrom({
        id: e.transferNote[0].stockFrom.id,
        name: e.transferNote[0].stockFrom.name,
        address: e.transferNote[0].stockFrom.location,
        //  email:"jalyss@gmail.com",
      });
      setTitle("Bon de Transfer");
    }
    if (e.salesDeliveryInvoice.length) {
      setBillTo({
        name: e.salesDeliveryInvoice[0].client.fullName,
        address: e.salesDeliveryInvoice[0].client.address,
        email: e.salesDeliveryInvoice[0].client.email,
      });
      setBillFrom({
        id: e.salesDeliveryInvoice[0].salesChannels.id,
        name: e.salesDeliveryInvoice[0].salesChannels.name,
        address: e.salesDeliveryInvoice[0].salesChannels.region,
        email: "jalyss@gmail.com",
      });
      setTitle("Bon de Livraison / Facture");
    }
    if (e.salesDeliveryNote.length) {
      setBillTo({
        name: e.salesDeliveryNote[0].client.fullName,
        address: e.salesDeliveryNote[0].client.address,
        email: e.salesDeliveryNote[0].client.email,
      });
      setBillFrom({
        id: e.salesDeliveryNote[0].salesChannels.id,
        name: e.salesDeliveryNote[0].salesChannels.name,
        address: e.salesDeliveryNote[0].salesChannels.region,
        email: "jalyss@gmail.com",
      });
      setTitle("Bon de Livraison");
    }
    if (e.salesInvoice.length) {
      setBillTo({
        name: e.salesInvoice[0].client.fullName,
        address: e.salesInvoice[0].client.address,
        email: e.salesInvoice[0].client.email,
      });
      setBillFrom({
        id: e.salesInvoice[0].salesChannels.id,
        name: e.salesInvoice[0].salesChannels.name,
        address: e.salesInvoice[0].salesChannels.region,
        email: "jalyss@gmail.com",
      });
      setTitle("Facture");
    }

    setDate(e.exitDate);
    setTotal(e.totalAmount);
    console.log(itemsData.data, "hello");
    setStatus("Vente");
    setItems(
      itemsData.data.map((e) => {
        e.author = e.articleByAuthor.length
          ? e.articleByAuthor[0]?.author?.nameAr
          : null;
        e.publisher = e.articleByPublishingHouse.length
          ? e.articleByPublishingHouse[0]?.publishingHouse?.nameAr
          : null;
        e.image = e?.cover?.path || null;
        e.name = e.title;
        return e;
      })
    );
    console.log(items);
  };
  const fetchModalDataReceipt = async () => {
    const response = await axios.get(`${ip}/receiptNote/${modalId}`);
    let e = response.data;
    setPStatus(e.paymentStatus);
    setPType(e.paymentType);
    setStatus("Achat");
    let itemsData = e.receiptNoteLine.reduce((acc, el) => {
      let { Article, quantity, price, discount } = el;
      acc.push({ ...Article, quantity, price, discount });
      return acc;
    }, []);
    console.log(response.data);

    setBillTo({
      name: e.stock.name,
      address: e.stock.location,
      email: "jalyss@gmail.com",
    });
    setDate(e.receiptDate);
    setTotal(e.totalAmount);
    setBillFrom({
      name: e.provider?.nameProvider,
      address: e.provider?.adresse,
      email: e.provider?.email,
    });
    if (e.transferNote.length) {
      setBillFrom({
        id: e.transferNote[0].stockFrom.id,
        name: e.transferNote[0].stockFrom.name,
        address: e.transferNote[0].stockFrom.location,
        email: "jalyss@gmail.com",
      });
      setTitle("Bon de Transfer");
    } else setTitle("Bon de Reception");
    if (e.purchaseDeliveryInvoice.length) {
      setTitle("Bon de Livraison / Facture");
    }
    if (e.purchaseDeliveryNote.length) {
      setTitle("Bon de Livraison");
    }
    if (e.purchaseInvoice.length) {
      setTitle("Facture");
    }
    console.log(itemsData, "hello");
    setItems(
      itemsData.map((e) => {
        e.author = e.articleByAuthor.length
          ? e.articleByAuthor[0]?.author?.nameAr
          : null;
        e.publisher = e.articleByPublishingHouse.length
          ? e.articleByPublishingHouse[0]?.publishingHouse?.nameAr
          : null;
        e.image = e?.cover?.path;
        e.name = e.title;
        return e;
      })
    );
  };
  const fetchModalDataReturn = async () => {
    const response = await axios.get(`${ip}/return-note/${modalId}`);
    let e = response.data;
    console.log(e);
    setTitle('Bon de Retour')
    setStatus('Vente')
    setDate(e.returnDate);
    setBillFrom({ name: e?.client?.fullName,
      email : e?.client?.email,
      address : e?.client?.address,
     });
    setItems(
      response.data.returnNoteLine.map((el) => {
        console.log(el);
        el.author = el?.article?.articleByAuthor.length
          ? el?.article?.articleByAuthor[0]?.author?.nameAr
          : null;
        el.publisher = el?.article?.articleByPublishingHouse.length
          ? el?.article?.articleByPublishingHouse[0]?.publishingHouse?.nameAr
          : null;
        el.image = el?.article?.cover?.path;
        el.name = el?.article?.title;
        return el;
      })
    );
  };

  const fetchModalDataCommand = async () => {
    const response = await axios.get(`${ip}/purchaseOrder/${modalId}`);
    let e = response.data;
    console.log(e);
    setTitle('Bon de Commande')
    setStatus('Vente')
    setDate(e.date);
    setBillFrom({ name: e?.client?.fullName,
      email : e?.client?.email,
      address : e?.client?.address,
     });
    setBillTo({ name: e?. salesChannels?.name,
      email : "jalyss@gmail.com",
      address : e?. salesChannels?.region,
     });
     setTotal(e.totalAmount||0)
    setItems(
      response.data.purchaseOrderLine.map((el) => {
        console.log(el);
        el.author = el?.article?.articleByAuthor.length
          ? el?.article?.articleByAuthor[0]?.author?.nameAr
          : null;
        el.publisher = el?.article?.articleByPublishingHouse.length
          ? el?.article?.articleByPublishingHouse[0]?.publishingHouse?.nameAr
          : null;
        el.image = el?.article?.cover?.path;
        el.name = el?.article?.title;
        return el;
      })
    );
  };

  const handleFinishSale = async () => {
    try {
      const saleStatus = await finishSale();
      console.log(saleStatus);
      if (!saleStatus) {
        setErrorAlert(true);
        setSuccessAlert(false);
      }
    } catch (error) {
      setErrorAlert(true);
      setSuccessAlert(false);
      console.error("Error:", error);
    }
  };

  const generateInvoice = () => {
    html2canvas(invoiceCaptureRef.current).then((canvas) => {
      const imgData = canvas.toDataURL("image/png", 1.0);
      const pdf = new jsPDF({
        orientation: "portrait",
        unit: "pt",
        format: [612, 792],
      });
      pdf.internal.scaleFactor = 1;
      const imgProps = pdf.getImageProperties(imgData);
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
      pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
      pdf.save("invoice-001.pdf");
    });
  };

  return (
    <div>
      <Modal show={showModal} onHide={closeModal} size="lg" centered>
        <div id="invoiceCapture" ref={invoiceCaptureRef}>
          {/* Alertes MUI */}
          <Stack sx={{ width: "100%" }} spacing={2}>
            {successAlert && (
              <Alert
                severity="success"
                onClose={() => setSuccessAlert(false)}
                dismissible
              >
                This is a success Alert.
              </Alert>
            )}
            {errorAlert && (
              <Alert
                severity="error"
                onClose={() => setErrorAlert(false)}
                dismissible
              >
                This is an error Alert.
              </Alert>
            )}
          </Stack>
          <div className="d-flex flex-row justify-content-between align-items-start bg-light w-100 p-4">
            <div className="w-100">
              <h4 className="fw-bold my-2">{title}</h4>
              <h6 className="fw-bold text-secondary mb-1">~ {status} ~</h6>
              <h6 className="fw-bold text-secondary mb-1">
                <span>{pType} </span>
                {pStatus === "Payed" ? (
                  <span style={{ color: "green", marginLeft: 20 }}>
                    {pStatus}
                  </span>
                ) : pStatus === "NotPayed" ? (
                  <span style={{ color: "red", marginLeft: 20 }}>
                    Not Payed
                  </span>
                ) : pStatus === "PartiallyPayed" ? (
                  <span style={{ color: "orange", marginLeft: 20 }}>
                    Partially Payed
                  </span>
                ) : (
                  ""
                )}
              </h6>
            </div>
            <div className="text-end ms-4">
              <img src={jalyssImage} style={{ width: "150px" }} />
            </div>
          </div>
          <div className="p-4">
            <Row className="mb-4">
              <Col md={4}>
                <div className="fw-bold">Billed to:</div>
                <div>{billTo?.name || ""}</div>
                <div>{billTo?.address || ""}</div>
                <div>{billTo?.email || ""}</div>
              </Col>
              <Col md={4}>
                <div className="fw-bold">Billed From:</div>
                <div>{billFrom?.name || ""}</div>
                <div>{billFrom?.address || ""}</div>
                <div>{billFrom?.email || ""}</div>
              </Col>
              <Col md={4}>
                <div className="fw-bold mt-2">Date Of Issue:</div>
                <div>{date.slice(0, 10) || ""}</div>
                <div>
                  {date.slice(date.indexOf("T") + 1, date.indexOf("T") + 6) ||
                    ""}
                </div>
              </Col>
            </Row>
            <Table className="mb-0">
              <thead>
                <tr>
                  <th>Title</th>
                  <th className="text-end">QTY</th>
                  {title !== "Bon de Transfer" && (
                    <>
                      {" "}
                      <th className="text-end">PRICE</th>
                      <th className="text-end">DISCOUNT</th>
                      <th className="text-end">AMOUNT</th>
                    </>
                  )}
                </tr>
              </thead>
              <tbody>
                {items.map((item, i) => (
                  <tr key={i}>
                    <td>
                      {item.name} - {item?.author} - {item?.publisher}
                    </td>
                    <td className="text-end" style={{ width: "100px" }}>
                      {item.quantity}
                    </td>
                    {title !== "Bon de Transfer" && (
                      <>
                        <td className="text-end" style={{ width: "100px" }}>
                          {item.price} {currency}
                        </td>
                        <td className="text-end" style={{ width: "100px" }}>
                          {item.discount} %
                        </td>
                        <td className="text-end" style={{ width: "100px" }}>
                          {item.price * item.quantity -
                            item.price *
                              item.quantity *
                              (item.discount / 100)}{" "}
                          {currency}
                        </td>
                      </>
                    )}
                  </tr>
                ))}
              </tbody>
            </Table>
            <Table>
              <tbody>
                <tr>
                  <td>&nbsp;</td>
                  <td>&nbsp;</td>
                  <td>&nbsp;</td>
                </tr>
                {title !== "Bon de Transfer" && (
                  <>
                    {" "}
                    <tr className="text-end">
                      <td></td>
                      <td className="fw-bold" style={{ width: "100px" }}>
                        SUBTOTAL
                      </td>
                      <td className="text-end" style={{ width: "100px" }}>
                        {subTotall} {currency}
                      </td>
                    </tr>
                  </>
                )}
                {discountAmount !== "0.00" && (
                  <tr className="text-end">
                    <td></td>
                    <td className="fw-bold" style={{ width: "100px" }}>
                      DISCOUNT
                    </td>
                    <td className="text-end" style={{ width: "100px" }}>
                      {discountAmount} {currency}
                    </td>
                  </tr>
                )}
                {title !== "Bon de Transfer" && (
                  <>
                    <tr className="text-end">
                      <td></td>
                      <td className="fw-bold" style={{ width: "100px" }}>
                        TOTAL
                      </td>
                      <td className="text-end" style={{ width: "100px" }}>
                        {totall} {currency}
                      </td>
                    </tr>
                  </>
                )}
              </tbody>
            </Table>
            {/* { &&
              <div className="bg-light py-3 px-4 rounded">
                {}
              </div>} */}
          </div>
        </div>
        <div className="pb-4 px-4">
          <Row>
            {mode !== "viewer" && (
              <Col md={6}>
                <Button
                  variant="primary"
                  className="d-block w-100"
                  onClick={handleFinishSale}
                >
                  <BiPaperPlane
                    style={{ width: "15px", height: "15px", marginTop: "-3px" }}
                    className="me-2"
                  />
                  Finish Sale
                </Button>
              </Col>
            )}
            <Col md={6}>
              <Button
                variant="outline-primary"
                className="d-block w-100 mt-3 mt-md-0"
                onClick={generateInvoice}
              >
                <BiCloudDownload
                  style={{ width: "16px", height: "16px", marginTop: "-3px" }}
                  className="me-2"
                />
                Download Copy
              </Button>
            </Col>
          </Row>
        </div>
      </Modal>
      <hr className="mt-4 mb-3" />
    </div>
  );
};

export default InvoiceModal;
