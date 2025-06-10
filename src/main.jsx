import { GoogleOAuthProvider } from "@react-oauth/google";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import App from "./app/routes/App.jsx";
import { store } from "./app/store/store.js";
import "./i18n/i18n.js";

const clientId =
  "291405677974-3m3sqatr2rukrt4hikd96s14u2b81do2.apps.googleusercontent.com";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <GoogleOAuthProvider clientId={clientId}>
        <Provider store={store}>
          <App />
        </Provider>
      </GoogleOAuthProvider>
    </BrowserRouter>
  </StrictMode>
);
