
import "./App.css";
import Router from "./router/Router";
import { Provider } from "react-redux";
import { store } from "./store/store";
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from "./layouts/Header";
import Navbar from "./layouts/Navbar";
import { useState } from "react";
import { Box, Stack } from "@mui/material";

function App() {
  const [isCollapsed, setIsCollapsed] = useState(false)
  return (
    <Provider store={store}>
          <Router />
    </Provider>
  );
}

export default App;
