import { createContext, useContext, useState } from "react";
import PropTypes from "prop-types";
import { ukTranslations } from "../translations/uk";

// Force translations to be available immediately
const TRANSLATIONS = ukTranslations;

// Verify translations at context creation
if (!TRANSLATIONS?.landing?.mainTitle) {
  console.error("Translation check failed:", {
    hasTranslations: !!TRANSLATIONS,
    hasLanding: !!TRANSLATIONS?.landing,
    environment: import.meta.env.MODE,
  });
  throw new Error("Translations not available at context creation");
}

const LanguageContext = createContext(TRANSLATIONS);

export function LanguageProvider({ children }) {
  // Log the environment and translations state
  if (import.meta.env.PROD) {
    console.log("Provider running in production mode");
  }

  return (
    <LanguageContext.Provider value={TRANSLATIONS}>
      {children}
    </LanguageContext.Provider>
  );
}

LanguageProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export function useTranslations() {
  const context = useContext(LanguageContext);

  if (!context?.landing?.mainTitle) {
    console.error("Translation context check failed:", {
      hasContext: !!context,
      hasLanding: !!context?.landing,
      environment: import.meta.env.MODE,
    });
    throw new Error("Translations not available in component");
  }

  return context;
}
