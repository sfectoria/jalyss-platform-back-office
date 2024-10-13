import React from "react";
import { Route } from "react-router-dom";
import SalesModule from "../../modules/sales/SaleModule";
import SalesList from "../../modules/sales/views/SalesList";
import AddSales from "../../modules/sales/views/AddSales";


export default function AchatRoutes() {
  return [
    <Route key="achat" path="achat" element={<SalesModule />}>
      <Route key="index" index element={<SalesList />} />
      <Route path="add-achat" element={<AddSales />} />
    </Route>,
  ];
}
