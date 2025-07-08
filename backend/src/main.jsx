import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { AuthProvider } from "./Context/authContext.jsx";

import { Toaster } from "react-hot-toast";
import { ThemeProvider } from "./Context/themeContext.jsx";


createRoot(document.getElementById("root")).render(
  <ThemeProvider>
    <StrictMode>
      <Toaster position="top-center" />
      <AuthProvider>
          <App />
      </AuthProvider>
    </StrictMode>
  </ThemeProvider>
);
