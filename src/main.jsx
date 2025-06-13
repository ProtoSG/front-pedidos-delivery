import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.jsx";
import "./index.css";
import { FavoritosProvider } from "./hooks/useFavoritos.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <FavoritosProvider>
        <App />
      </FavoritosProvider>
    </BrowserRouter>
  </React.StrictMode>
);
