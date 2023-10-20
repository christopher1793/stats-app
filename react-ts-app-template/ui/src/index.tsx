import { isEnvBrowser } from "./utils/misc";
import ReactDOM from "react-dom/client";
import React from "react";
import App from "./App";
import "./colors.css";
import "./index.css";

const root = ReactDOM.createRoot(document.getElementById("root"));

if (window.name === "" || isEnvBrowser()) {
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
}
