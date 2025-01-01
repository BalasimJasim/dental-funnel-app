import { createContext, useContext, useState } from "react";
import PropTypes from "prop-types";
import { ukTranslations } from "../translations/uk";

const LanguageContext = createContext();

export function LanguageProvider({ children }) {
  const [translations] = useState(ukTranslations);

  console.log("LanguageProvider translations:", translations);

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

  console.log("useTranslations context:", context);

  if (context === undefined) {
    throw new Error("useTranslations must be used within a LanguageProvider");
  }
  return context;
}
