import { createContext, useContext, useState } from "react";
import PropTypes from "prop-types";
import { ukTranslations } from "../translations/uk";

// Force translations to be available immediately and log the process
console.log("Initializing LanguageContext...", {
  environment: import.meta.env.MODE,
  hasTranslations: !!ukTranslations
});

const TRANSLATIONS = ukTranslations;

// Verify translations at context creation
if (!TRANSLATIONS?.landing?.mainTitle) {
  console.error("Critical: Translations missing at context creation");
  throw new Error("TRANSLATIONS_MISSING");
}

const LanguageContext = createContext(null);

export function LanguageProvider({ children }) {
  // Force translations check on provider mount
  console.log("LanguageProvider mounting...", {
    hasTranslations: !!TRANSLATIONS?.landing?.mainTitle,
    mainTitle: TRANSLATIONS?.landing?.mainTitle
  });

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
