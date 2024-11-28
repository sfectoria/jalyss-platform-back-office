import React from "react";
import { Route } from "react-router-dom";
import StockModule from "../../modules/stocks/StockModule";
import StockDetails from "../../modules/stocks/views/StockDetails";
import StockList from "../../modules/stocks/views/StockList";
import AddStock from "../../modules/stocks/views/AddStock";
import NewInventaire from "../../modules/Inventaire/views/NewInventaire";
import ArticleHistory from "../../modules/articles/component/ArticleHistory";
import UnarchiveStock from "../../modules/stocks/component/UnarchiveStock";

export default function StockRoutes() {
  return [
    <Route key="stock" path="stock" element={<StockModule />}>
      <Route key="index" index element={<StockList />} />
      <Route path="Archived-Stock" element={<UnarchiveStock />} />
      <Route path="add-stock" element={<AddStock />} />
      <Route key="details" path=":id" element={<StockDetails />} />
      <Route key="inv" path=":id/inv/:idInv" element={<NewInventaire />} />
      <Route key="index" path=":stocksIds/articles/:articleId/full-history" element={<ArticleHistory />} />
    </Route>,
  ];
}
