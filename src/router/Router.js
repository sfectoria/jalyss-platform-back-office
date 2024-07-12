import React from "react";
import { useSelector } from "react-redux";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Main from "../apps/Main";
import ClientModule from "../modules/clients/ClientModule";

export default function Router() {
  const user = useSelector((state) => state.auth.me);

  return (
    <BrowserRouter>
      {user ? (
        <Routes>
          <Route path="/" element={<Main />}>
            <Route path="client" element={<ClientModule />} />
          </Route>
        </Routes>
      ) : (
        <Routes></Routes>
      )}
    </BrowserRouter>
  );
}
