import React from "react";
import { Route } from "react-router-dom";
import FournisseurModule from "../../modules/fournisseur/FournisseurModule";
import FournisseursList from "../../modules/fournisseur/views/FournisseursList";
import AddFournisseur from "../../modules/fournisseur/views/AddFournisseur";

function FornisseursRoutes() {
  return [
    <Route
      path="fournisseurs"
      key="fournisseurs-module"
      element={<FournisseurModule />}
    >
      <Route index key="fournisseurs-list" element={<FournisseursList />} />
      <Route
        path="add-fournisseur"
        key="add-fournisseur"
        element={<AddFournisseur />}
      />
    </Route>,
  ];
}

export default FornisseursRoutes;
