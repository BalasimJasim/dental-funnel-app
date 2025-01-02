import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { CONTENT, DEFAULT_LANGUAGE } from "./config/language";

// Verify content is available
if (!CONTENT[DEFAULT_LANGUAGE]) {
  console.error("Missing content for language:", DEFAULT_LANGUAGE);
}

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
