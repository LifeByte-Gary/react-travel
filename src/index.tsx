import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import "antd/dist/antd.css";
import "./i18n/configs";
import { Provider } from "react-redux";
import { store, persistor } from "./redux/store";
import axios from "axios";
import { PersistGate } from "redux-persist/integration/react";

axios.defaults.headers["x-icode"] = "E40A03079E8E37D5";

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <App />
      </PersistGate>
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
