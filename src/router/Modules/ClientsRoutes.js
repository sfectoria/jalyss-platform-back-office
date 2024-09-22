import React from "react";
import ClientModule from "../../modules/clients/ClientModule";
import ClientsList from "../../modules/clients/views/ClientsList";
import ClientDetails from "../../modules/clients/views/ClientDetails";
import AddClient from "../../modules/clients/views/AddClient";
import { Route } from "react-router-dom";

function ClientsRoutes() {
  return [
    <Route path="clients" key="client-module" element={<ClientModule />}>
      <Route index key="client-list" element={<ClientsList />} />
      <Route path="add-client" key="add-client" element={<AddClient />} />
      <Route path=":id" key="client-details" element={<ClientDetails />} />
    </Route>,
  ];
}

export default ClientsRoutes;
