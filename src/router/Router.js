import React from "react";
import { useSelector } from "react-redux";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Main from "../apps/Main";
import ClientModule from "../modules/clients/ClientModule";
import Auth from "../apps/Auth";
import AuthModule from "../modules/auth/AuthModule";
import Login from "../modules/auth/views/Login";
import ForgetPassword from "../modules/auth/views/ForgetPassword";
import ConfirmPassword from "../modules/auth/views/ConfirmPassword";
import SixDigitCode from "../modules/auth/views/SixDigitCode";
import StockModule from "../modules/stocks/StockModule";
import StockList from "../modules/stocks/views/StockList";

export default function Router() {
  const user = useSelector((state) => state.authSlice.me);

  return (
    <BrowserRouter>
      {user ? (
        <Routes>
          <Route path="/" element={<Main />}>
            <Route path="client" element={<ClientModule />} />
          </Route>
        </Routes>
      ) : (
        <Routes>
          <Route path="/" element={<Auth />}>
            <Route path=""  element={<AuthModule />}>
              <Route index element={<Login />} />
              <Route path="forget-password" element={<ForgetPassword />} />
              <Route path="confirmation-code" element={<SixDigitCode />} />
              <Route path="confirm-password" element={<ConfirmPassword />} />
            </Route>
            <Route path="stock"  element={<StockModule />}>
              <Route index element={<StockList />} />
            </Route>
          </Route>
        </Routes>
      )}
    </BrowserRouter>
  );
}
