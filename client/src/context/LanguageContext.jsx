import { createContext, useContext, useState } from "react";
import PropTypes from "prop-types";
import { ukTranslations } from "../translations/uk";
import { FORCE_UKRAINIAN } from "../config/language";

const LanguageContext = createContext();

// Force initialize translations
const TRANSLATIONS = ukTranslations;

if (!TRANSLATIONS || !TRANSLATIONS.landing) {
  throw new Error("Translations failed to load!");
}

export function LanguageProvider({ children }) {
  const [translations] = useState(TRANSLATIONS);

  if (!translations || !translations.landing) {
    throw new Error("Translations not available in provider!");
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
  const context = useContext(LanguageContext);

  if (!context || !context.landing) {
    throw new Error("Translations not available in component!");
  }

  return context;
}
