import { createContext, useContext, useState } from "react";
import PropTypes from "prop-types";
import { ukTranslations } from "../translations/uk";

console.log("3. Setting up LanguageContext");

const LanguageContext = createContext();

export function LanguageProvider({ children }) {
  console.log("4. LanguageProvider rendering");
  const [translations] = useState(ukTranslations);
  console.log("5. Translations in provider:", {
    mainTitle: translations.landing.mainTitle,
    appointmentTitle: translations.appointment.title,
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
  console.log("6. useTranslations hook called");
  const context = useContext(LanguageContext);
  console.log("7. Context value:", {
    mainTitle: context?.landing?.mainTitle,
    appointmentTitle: context?.appointment?.title,
  });

  if (context === undefined) {
    console.error("8. Context is undefined!");
    throw new Error("useTranslations must be used within a LanguageProvider");
  }
  return context;
}
