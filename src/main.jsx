import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./app/routes/App";
import { Provider } from "react-redux";
import { store } from "./app/store/store";
import "./i18n/i18n.js";
import { BrowserRouter } from "react-router-dom";

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <Provider store={store}>
      <App />
    </Provider>
  </BrowserRouter>
);
