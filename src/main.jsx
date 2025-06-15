import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { AuthProvider } from "./context/AuthContext";
import { SnackbarProvider } from "notistack";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
      <SnackbarProvider maxSnack={3 } autoHideDuration={3000}>
        <App />
      </SnackbarProvider>
    </AuthProvider>
  </React.StrictMode>
);
