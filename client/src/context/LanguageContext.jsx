import { createContext, useContext, useState } from "react";
import PropTypes from "prop-types";
import { ukTranslations } from "../translations/uk";

console.log("DEPLOYMENT: LanguageContext initialization");

const LanguageContext = createContext();

export function LanguageProvider({ children }) {
  console.log("DEPLOYMENT: LanguageProvider mounting");
  const [translations] = useState(() => {
    console.log("DEPLOYMENT: Setting initial translations");
    return ukTranslations;
  });

  // Add deployment check
  if (import.meta.env.MODE === "production") {
    console.log("DEPLOYMENT: Provider translations:", {
      hasTranslations: !!translations,
      mainTitle: translations?.landing?.mainTitle,
    });
  }

  return (
    <LanguageContext.Provider value={translations}>
      {children}
    </LanguageContext.Provider>
  );
}

LanguageProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export function useTranslations() {
  console.log("DEPLOYMENT: useTranslations called");
  const context = useContext(LanguageContext);

  if (!context) {
    console.error("DEPLOYMENT: No translations in context!");
    throw new Error("useTranslations must be used within a LanguageProvider");
  }

  return context;
}
