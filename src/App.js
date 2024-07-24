
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
      <Box>
        <Header isCollapsed={isCollapsed} setIsCollapsed={setIsCollapsed} />
        <Stack direction="row">
          <Navbar isCollapsed={isCollapsed} />
          <Router />
        </Stack>
      </Box>
    </Provider>
  );
}

export default App;
