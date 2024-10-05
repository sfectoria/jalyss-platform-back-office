
import "./App.css";
import Router from "./router/Router";
import { Provider } from "react-redux";
import { store } from "./store/store";
import 'bootstrap/dist/css/bootstrap.min.css';
import { PrimeReactProvider } from 'primereact/api';

import "primereact/resources/themes/lara-light-cyan/theme.css";


function App() {
  return (
    <PrimeReactProvider>

    <Provider store={store}>
          <Router />
    </Provider>
            </PrimeReactProvider>

  );
}

export default App;
