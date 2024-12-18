// handel info function

export const handelInfo = (
  state,
  type,
  setInvoiceTitle,
  setReqName,
  setReqLine,
  setReqChannel,
  setReqClient,
  setReqDate,
  setInvoiceState
) => {
  if (type === "BR") {
    setInvoiceTitle("Bon de Reception");
    setReqName();
    setReqLine();
  } else if (type === "BS") {
    setInvoiceTitle("Bon de Sortie");
    setReqName();
    setReqLine();
  } else if (type === "BT") {
    setInvoiceTitle("Bon de Transfer");
    setReqName();
    setReqLine();
  } else if (type === "BL") {
    setInvoiceTitle("Bon de Livraison");
    setReqName("salesDeliveryNote");
    setReqLine("salesDeliveryNoteLine");
    setReqDate("deliveryDate");
  } else if (type === "Bl") {
    setInvoiceTitle("Bon de Livraison");
    setReqName("purchase-delivery-note");
  } else if (type === "Blf") {
    setInvoiceTitle("Bon de Livraison/Facture");
    setReqName("purchase-delivery-invoices");
  } else if (type === "f") {
    setInvoiceTitle("Facture");
    setReqName("purchase-invoices");
  }
  //  else if (type === "ticket") {
  //   setInvoiceTitle("Ticket");
  //   setReqName("purchase-delivery-note");
  // } 
  else if (type === "BLF") {
    setInvoiceTitle("Bon de Livraison/Facture");
    setReqName("salesDeliveryInvoice");
    setReqLine("salesDeliveryInvoicelines");
    setReqChannel("salesChannelsId");
    setReqClient("idClient");
    setReqDate("deliveryDate");
  } else if (type === "F") {
    setInvoiceTitle("Facture");
    setReqName("sales-invoices");
    setReqLine("salesInvoiceLine");
  } else if (type === "Ticket") {
    setInvoiceTitle("Ticket");
    setReqName("sales-receipt");
    setReqLine("salesReceiptLine");
    setReqChannel("salesChannelId");
    setReqDate("deliveryDate");
  } else if (type === "BC") {
    setInvoiceTitle("Bon de Commande");
  } else if (type === "BRe") {
    setInvoiceTitle("Bon de Retour");
    setReqName();
    setReqLine();
  } else if (type === "Devis") {
    setInvoiceTitle("Devis");
  }

  if (state==='sale'){
    setInvoiceState('Vente')
  }
  if (state==='purchase'){
    setInvoiceState('Achat')
  }
};
