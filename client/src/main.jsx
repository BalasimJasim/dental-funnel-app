import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";

// Add version to force cache busting
const version = new Date().getTime();
console.log(`[DEBUG] App initializing. Version: ${version}`);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App key={version} />
  </React.StrictMode>
);
