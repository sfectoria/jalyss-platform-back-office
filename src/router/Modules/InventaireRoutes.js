import React from "react";
import { Route } from "react-router-dom";
import InventaireModule from "../../modules/Inventaire/InventaireModule";
import InventaireDetails from "../../modules/Inventaire/views/InventaireDetails";

export default function InventaireRoutes() {
    return[
        <Route key="inventaire" path="inventaire" element={<InventaireModule />}>
          <Route key="index" path=":id" element={<InventaireDetails />} />
        </Route>
    ]
}
