import React from "react";
import { Route } from "react-router-dom";
import StockModule from "../../modules/stocks/StockModule";
import StockDetails from "../../modules/stocks/views/StockDetails";
import StockList from "../../modules/stocks/views/StockList";

export default function StockRoutes() {
    return[
        <Route key="stock" path="stock" element={<StockModule />}>
          <Route key="index" index element={<StockList />} />
          <Route key="details" path=":id" element={<StockDetails />} />
        </Route>
    ]
}
