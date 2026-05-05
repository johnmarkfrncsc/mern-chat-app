import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./context/authContext.jsx";
import { SocketProvider } from "./context/socketContext.jsx";
import { themes } from "./config/themes.js";

const savedId = localStorage.getItem("tsika-theme");
const saved = themes.find((t) => t.id === savedId) || themes[0];
document.documentElement.style.setProperty("--color-accent", saved.accent);
document.documentElement.style.setProperty("--color-hover", saved.hover);
document.documentElement.style.setProperty("--color-banner", saved.banner);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <SocketProvider>
          <App />
        </SocketProvider>
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>,
);
