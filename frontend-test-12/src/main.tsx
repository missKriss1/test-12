import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "bootstrap/dist/css/bootstrap.min.css";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { BrowserRouter } from "react-router-dom";
import { GOOGLE_CLIENT_ID } from "../globalConstants.ts";
import { persistor, store } from "./app/store.ts";

createRoot(document.getElementById("root")!).render(
  <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <BrowserRouter>
          <StrictMode>
            <App />
          </StrictMode>
        </BrowserRouter>
      </PersistGate>
    </Provider>
  </GoogleOAuthProvider>,
);
