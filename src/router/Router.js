import React from "react";
import { useSelector } from "react-redux";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Main from "../apps/Main";
import Auth from "../apps/Auth";
import AuthModule from "../modules/auth/AuthModule";
import Login from "../modules/auth/views/Login";
import ForgetPassword from "../modules/auth/views/ForgetPassword";
import ConfirmPassword from "../modules/auth/views/ConfirmPassword";
import SixDigitCode from "../modules/auth/views/SixDigitCode";
import InvoiceContainer from "../components/InvoiceContainer";
import StockRoutes from "./Modules/StockRoutes";
import InventaireRoutes from "./Modules/InventaireRoutes";
import ArticleRoutes from "./Modules/ArticlesRoutes";
import ProfileRoutes from "./Modules/ProfileRoutes";
import ClientsRoutes from "./Modules/ClientsRoutes";
import EmployeesRoutes from "./Modules/EmployeesRoutes";
import FornisseursRoutes from "./Modules/FornisseursRoutes";
import ChannelsRoutes from "./Modules/ChannelsRoutes";
import DashboardRoutes from "./Modules/DashboardRoutes";
import NewInventaire from "../modules/Inventaire/views/NewInventaire";

export default function Router() {
  const user = useSelector((state) => state.authSlice.user);

  return (
    <BrowserRouter>
      {user ? (
        <Routes>
          <Route path="/" key='main' element={<Main />}>
            {DashboardRoutes()}
            {StockRoutes()}
            {InventaireRoutes()}
            {ClientsRoutes()}
            {EmployeesRoutes()}
            {ProfileRoutes()}
            {ArticleRoutes()}
            {FornisseursRoutes()}
            {ChannelsRoutes()}
            <Route path="invoice" key='invoice' element={<InvoiceContainer />} />
          </Route>
          <Route key="index" path="inventaires" element={<NewInventaire />} />
        </Routes>
      ) : (
        <Routes>
          <Route path="/" element={<Auth />}>
            <Route path="" element={<AuthModule />}>
              <Route index element={<Login />} />
              <Route path="forget-password" element={<ForgetPassword />} />
              <Route path="confirmation-code" element={<SixDigitCode />} />
              <Route path="confirm-password" element={<ConfirmPassword />} />
            </Route>
          </Route>
        </Routes>
      )}
    </BrowserRouter>
  );
}
