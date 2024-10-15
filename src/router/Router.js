import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
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
import AuthorModule from "./Modules/AuthorRoutes";
import NewInventaire from "../modules/Inventaire/views/NewInventaire";
import ArticleHistory from "../modules/articles/component/ArticleHistory";
import { getMe } from "../store/slices/authSlice";
import VentRoutes from "./Modules/VenteRoutes";
import SalesRoutes from "./Modules/SalesRoutes";
import AuthorRoutes from "./Modules/AuthorRoutes";

export default function Router() {
  const user = useSelector((store) => store.auth.me);

  const dispatch = useDispatch();
  useEffect(() => {
    let token = localStorage.getItem("token");
    if (token)
      dispatch(getMe()).then((res) => {
      });
  }, [dispatch]);
  return (
    <BrowserRouter>
      {user ? (
        <Routes>
          <Route path="/" key="main" element={<Main/>}>
            {DashboardRoutes()}
            {StockRoutes()}
            {AuthorRoutes()}
            {InventaireRoutes()}
            {ClientsRoutes()}
            {EmployeesRoutes()}
            {ProfileRoutes()}
            {ArticleRoutes()}
            {FornisseursRoutes()}
            {ChannelsRoutes()}
            {VentRoutes()}
            {SalesRoutes()}
            <Route
              path="invoice/:type/:sender/:receiver"
              key="invoice"
              element={<InvoiceContainer />}
            />
          </Route>
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
