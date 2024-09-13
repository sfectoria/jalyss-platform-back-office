import React, { useEffect, useRef, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';
import Modal from 'react-bootstrap/Modal';
import { BiPaperPlane, BiCloudDownload } from "react-icons/bi";
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import axios from 'axios';
import { ip } from '../constants/ip';

const InvoiceModal = ({
  showModal,
  closeModal,
  currency,
  modalId,
  idChannel,
  info,
  itemsData,
  taxAmount,
  subTotal,
  discountAmount,
  finishSale,
  mode
}) => {
  const invoiceCaptureRef = useRef(null);
  const [items,setItems]=useState([])
  const [date,setDate]=useState('')
  const [billTo,setBillTo]=useState({})
  const [billFrom,setBillFrom]=useState({})
  const [amount,setAmount]=useState(0)
  const [title,setTitle]=useState('')
  useEffect(()=>{
    if(mode==="viewer"){
      fetchModalData()
    }
    else if (mode==="creation"){
      setBillTo({
        name:info.billTo,
        address:info.billToAddress,
        email:info.billToEmail
      })
      setBillFrom({
        name:info.billFrom,
        address:info.billFromAddress,
        email:info.billFromEmail
      })
      setItems(itemsData)
      setAmount(subTotal)
      console.log(billTo,billFrom);
      
    }
  },[])
  console.log(idChannel,modalId,mode);
  
  const fetchModalData=async()=>{
    const response=await axios.get(`${ip}/exitNote/${modalId}`)
    let e =response.data
    let itemsData=e.exitNoteLine.reduce((acc,el)=>{
      let {Article,quantity}=el
      acc.data.push({...Article,quantity})
      acc.ids.push(Article.id);
      return acc;
     },{data:[],ids:[]})
    const responsePrices = await axios.get(
      `${ip}/price-By-Channel/getAll`,
      { params: { salesChannelIds: [idChannel],articleIds:itemsData.ids} }
    );
   itemsData.data.forEach((article) => {
    const priceData = responsePrices.data.find(
      (priceItem) => priceItem.idArticle === article.id
    );
    if (priceData) {
      article.price = priceData.price;
    }
  });
     
    if (e.salesDeliveryInvoice.length) {
      setBillTo({
        name:e.salesDeliveryInvoice[0].client.fullName,
        address:e.salesDeliveryInvoice[0].client.address,
        email:e.salesDeliveryInvoice[0].client.email
      })
      setBillFrom({
        name:e.salesDeliveryInvoice[0].salesChannels.name,
        address:e.salesDeliveryInvoice[0].salesChannels.region,
        email:"jalyss@gmail.com",
      })
      setTitle('Bon de Livraison / Facture')
    }
    if (e.salesDeliveryNote.length) {
      setBillTo({
        name:e.salesDeliveryNote[0].client.fullName,
        address:e.salesDeliveryNote[0].client.address,
        email:e.salesDeliveryNote[0].client.email
      })
      setBillFrom({
        name:e.salesDeliveryNote[0].salesChannels.name,
        address:e.salesDeliveryNote[0].salesChannels.region,
        email:"jalyss@gmail.com",
      })
      setTitle('Bon de Livraison')
    }
    if (e.salesInvoice.length) {
      setBillTo({
        name:e.salesInvoice[0].client.fullName,
        address:e.salesInvoice[0].client.address,
        email:e.salesInvoice[0].client.email
      })
      setBillFrom({
        name:e.salesInvoice[0].salesChannels.name,
        address:e.salesInvoice[0].salesChannels.region,
        email:"jalyss@gmail.com",
      })
      setTitle('Facture')
    }
    
    setDate(e.exitDate)
    setAmount(e.totalAmount)
    console.log(itemsData.data,'hello');
    
    setItems(itemsData.data.map((e)=>{
      e.author=e.articleByAuthor.length?e.articleByAuthor[0]?.author?.nameAr:null
      e.publisher=e.articleByPublishingHouse.length?e.articleByPublishingHouse[0]?.publishingHouse?.nameAr:null
      e.image=e?.cover?.path
      e.name=e.title
      return e
    }))
    
  }

  const generateInvoice = () => {
    html2canvas(invoiceCaptureRef.current).then((canvas) => {
      const imgData = canvas.toDataURL('image/png', 1.0);
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'pt',
        format: [612, 792]
      });
      pdf.internal.scaleFactor = 1;
      const imgProps = pdf.getImageProperties(imgData);
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
      pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
      pdf.save('invoice-001.pdf');
    });
  };

  return (
    <div>
      <Modal show={showModal} onHide={closeModal} size="lg" centered>
        <div id="invoiceCapture" ref={invoiceCaptureRef}>
          <div className="d-flex flex-row justify-content-between align-items-start bg-light w-100 p-4">
            <div className="w-100">
              <h4 className="fw-bold my-2">{title}</h4>
              <h6 className="fw-bold text-secondary mb-1">
                Invoice #: {''} </h6>
            </div>
            <div className="text-end ms-4">
              <h6 className="fw-bold mt-1 mb-2">Amount&nbsp;Due:</h6>
              <h5 className="fw-bold text-secondary"> {currency} {amount}</h5>
            </div>
          </div>
          <div className="p-4">
            <Row className="mb-4">
              <Col md={4}>
                <div className="fw-bold">Billed to:</div>
                <div>{billTo?.name || ''}</div>
                <div>{billTo?.address || ''}</div>
                <div>{billTo?.email || ''}</div>
              </Col>
              <Col md={4}>
                <div className="fw-bold">Billed From:</div>
                <div>{billFrom?.name || ''}</div>
                <div>{billFrom?.address || ''}</div>
                <div>{billFrom?.email || ''}</div>
              </Col>
              <Col md={4}>
                <div className="fw-bold mt-2">Date Of Issue:</div>
                <div>{ date.slice(0,10)|| ''}</div>
                <div>{ date.slice(date.indexOf('T')+1,date.indexOf('T')+6)|| ''}</div>
              </Col>
            </Row>
            <Table className="mb-0">
              <thead>
                <tr>
                  <th>QTY</th>
                  <th>Title</th>
                  <th className="text-end">PRICE</th>
                  <th className="text-end">AMOUNT</th>
                </tr>
              </thead>
              <tbody>
                {items.map((item, i) => (
                  <tr key={i}>
                    <td style={{ width: '70px' }}>{item.quantity}</td>
                    <td>{item.name} - {item?.author} - {item?.publisher}</td>
                    <td className="text-end" style={{ width: '100px' }}>{item.price} {currency}</td>
                    <td className="text-end" style={{ width: '100px' }}>{item.price * item.quantity} {currency}</td>
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
                <tr className="text-end">
                  <td></td>
                  <td className="fw-bold" style={{ width: '100px' }}>SUBTOTAL</td>
                  <td className="text-end" style={{ width: '100px' }}>{amount} {currency}</td>
                </tr>
                {taxAmount !== '0.00' &&
                  <tr className="text-end">
                    <td></td>
                    <td className="fw-bold" style={{ width: '100px' }}>TAX</td>
                    <td className="text-end" style={{ width: '100px' }}>{taxAmount} {currency}</td>
                  </tr>
                }
                {discountAmount !== '0.00' &&
                  <tr className="text-end">
                    <td></td>
                    <td className="fw-bold" style={{ width: '100px' }}>DISCOUNT</td>
                    <td className="text-end" style={{ width: '100px' }}>{discountAmount} {currency}</td>
                  </tr>
                }
                <tr className="text-end">
                  <td></td>
                  <td className="fw-bold" style={{ width: '100px' }}>TOTAL</td>
                  <td className="text-end" style={{ width: '100px' }}>{amount} {currency}</td>
                </tr>
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
            {mode!=="viewer"&&<Col md={6}>
              <Button variant="primary" className="d-block w-100" onClick={()=>{finishSale()}}>
                <BiPaperPlane style={{ width: '15px', height: '15px', marginTop: '-3px' }} className="me-2" />Finish Sale
              </Button>
            </Col>}
            <Col md={6}>
              <Button variant="outline-primary" className="d-block w-100 mt-3 mt-md-0" onClick={generateInvoice}>
                <BiCloudDownload style={{ width: '16px', height: '16px', marginTop: '-3px' }} className="me-2" />
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
