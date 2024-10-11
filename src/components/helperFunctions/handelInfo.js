// handel info function

export const handelInfo = (
  type,
  setInvoiceTitle,
  setReqName,
  setReqLine,
  setReqChannel,
  setReqClient,
  setReqDate
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
  } else if (type === "Bl" || type === "Blf" || type === "f") {
    if (type === "Bl") setInvoiceTitle("Bon de Livraison");
    if (type === "Blf") setInvoiceTitle("Bon de Livraison/Facture");
    if (type === "f") setInvoiceTitle("Facture");
    setReqName("purchase-delivery-note");
    setReqDate("deliveryDate");
  } else if (type === "BLF") {
    setInvoiceTitle("Bon de Livraison/Facture");
    setReqName("salesDeliveryInvoice");
    setReqLine("salesDeliveryInvoicelines");
    setReqChannel("salesChannelsId");
    setReqClient("clientId");
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
};
