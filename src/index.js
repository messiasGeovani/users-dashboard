import React from "react";
import ReactDOM from "react-dom";
import App from "./App";

import { Provider } from "react-redux";

import store from "./store";
import UserProvider from "./context/UserContext";

import CssBaseline from "@mui/material/CssBaseline";

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <UserProvider>
        <CssBaseline />
        <App />
      </UserProvider>
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
