import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { ukTranslations } from "./translations/uk";

// Verify translations at app startup
console.log("App Initialization - Translation Check:", {
  hasTranslations: !!ukTranslations,
  mainTitle: ukTranslations?.landing?.mainTitle,
  environment: import.meta.env.MODE,
});

if (!ukTranslations?.landing?.mainTitle) {
  console.error("Critical: Translations missing at app startup");
}

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
