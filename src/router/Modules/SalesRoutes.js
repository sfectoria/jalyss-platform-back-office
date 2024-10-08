import React from "react";
import { Route } from "react-router-dom";
import SalesModule from "../../modules/sales/SaleModule";
import SalesList from "../../modules/sales/views/SalesList";
import AddSales from "../../modules/sales/views/AddSales";


export default function SalesRoutes() {
  return [
    <Route key="sales" path="sales" element={<SalesModule />}>
      <Route key="index" index element={<SalesList />} />
      <Route path="add-sale" element={<AddSales />} />
    </Route>,
  ];
}
