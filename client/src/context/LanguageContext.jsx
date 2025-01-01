import { createContext, useContext, useState, useEffect } from "react";
import PropTypes from "prop-types";
import { ukTranslations } from "../translations/uk";

const LanguageContext = createContext();

export function LanguageProvider({ children }) {
  const [translations, setTranslations] = useState(null);

  useEffect(() => {
    console.warn("FORCE-DEBUG: Setting translations in provider");
    setTranslations(ukTranslations);

    // Force re-render after a small delay
    const timer = setTimeout(() => {
      console.warn("FORCE-DEBUG: Forcing re-render");
      setTranslations({ ...ukTranslations });
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  if (!translations) {
    console.warn("FORCE-DEBUG: Translations not yet loaded");
    return <div>Loading translations...</div>;
  }

  console.warn("FORCE-DEBUG: Rendering provider with translations:", {
    hasTranslations: !!translations,
    mainTitle: translations?.landing?.mainTitle,
  });

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

  if (!context) {
    console.warn("FORCE-DEBUG: No translations in context!");
    throw new Error("useTranslations must be used within a LanguageProvider");
  }

  console.warn("FORCE-DEBUG: Translations accessed:", {
    hasTranslations: !!context,
    mainTitle: context?.landing?.mainTitle,
  });

  return context;
}
