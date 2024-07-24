
import "./App.css";
import Router from "./router/Router";
import { Provider } from "react-redux";
import { store } from "./store/store";
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from "./layouts/Header";

function App() {
  return (
    <Provider store={store}>
      <Header/>
      <Router />
    </Provider>
  );
}

export default App;
