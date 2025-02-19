import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { BrowserRouter } from "react-router";
import App from "./app/components/App";
import { AuthProvider } from "./app/routes/AuthProvider";
import { Provider } from "react-redux";
import store from "./redux/components/Store";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <AuthProvider>
          <App />
        </AuthProvider>
      </BrowserRouter>{" "}
    </Provider>
  </React.StrictMode>
);
