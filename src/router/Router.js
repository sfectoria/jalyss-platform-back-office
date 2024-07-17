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
import ChannelModule from "../modules/channels/ChannelModule";
import StockList from "../modules/stocks/views/StockList";
import StockDetails from "../modules/stocks/views/StockDetails";
import Admin from "../apps/Admin";
import ClientsList from "../modules/clients/views/ClientsList";
import EmployerModule from "../modules/employers/EmployerModule";
import EmployersList from "../modules/employers/views/EmployersList";

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
            <Route path="admin"  element={<Admin />}>
            <Route path="stock"  element={<StockModule />}>
              <Route index element={<StockList />} />
              <Route path="location" element={<StockDetails />} />
            </Route>
            <Route path="clients"  element={<ClientModule />}>
              <Route index element={<ClientsList />} />
            </Route>
            <Route path="employers"  element={<EmployerModule />}>
              <Route index element={<EmployersList />} />
            </Route>
            <Route path="channels"  element={<ChannelModule />}>
              {/* <Route index element={<ClientsList />} /> */}
            </Route>
            </Route>
          </Route>
        </Routes>
      )}
    </BrowserRouter>
  );
}
