import { GoogleOAuthProvider } from "@react-oauth/google";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import App from "./app/routes/App";
import { store } from "./app/store/store";
import "./i18n/i18n.js";
// const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;

// ЗАМЕНИ 'YOUR_GOOGLE_CLIENT_ID' на настоящий ID
const clientId =
  "203521326818-sj08epri3mrj1bmht5e1aj8fvut6neuv.apps.googleusercontent.com";

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
