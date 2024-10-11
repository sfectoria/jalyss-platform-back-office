import React from "react";
import { Route } from "react-router-dom";
import AddVent from "../../modules/vente/views/AddVente";
import VentList from "../../modules/vente/views/VenteList";
import VenteModule from "../../modules/vente/VenteModule";

export default function VentRoutes() {
  return [
    <Route key="vent" path="vente" element={<VenteModule />}>
      <Route key="index" index element={<VentList />} />
      <Route path="add-vente" element={<AddVent />} />
    </Route>
  ];
}
