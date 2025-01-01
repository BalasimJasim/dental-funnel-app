import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { LanguageProvider } from "./context/LanguageContext";
import "./index.css";

// Force enable console logs in production
if (import.meta.env.PROD) {
  const originalConsoleLog = console.log;
  const originalConsoleError = console.error;
  
  console.log = (...args) => {
    originalConsoleLog.apply(console, args);
  };
  
  console.error = (...args) => {
    originalConsoleError.apply(console, args);
  };
}

console.log("DEPLOYMENT-TEST: Application starting", {
  mode: import.meta.env.MODE,
  debug: import.meta.env.VITE_DEBUG,
  apiUrl: import.meta.env.VITE_API_URL
});

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error("Error caught by boundary:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return <h1>Something went wrong.</h1>;
    }

    return this.props.children;
  }
}

const root = ReactDOM.createRoot(document.getElementById("root"));
console.log("9. Root element found");

root.render(
  <React.StrictMode>
    <ErrorBoundary>
      <LanguageProvider>
        <App />
      </LanguageProvider>
    </ErrorBoundary>
  </React.StrictMode>
);

console.log("10. Render initiated");
