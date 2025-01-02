import { ukTranslations } from "../src/translations/uk.js";

console.log("Verifying translations during build...");

// More detailed verification
const requiredKeys = {
  landing: [
    'mainTitle',
    'mainSubtitle',
    'findSolution',
    'consultation',
    'noObligation',
    'stats',
    'benefits',
    'specialOffer'
  ]
};

function verifyTranslations(translations, required) {
  for (const [section, keys] of Object.entries(required)) {
    if (!translations[section]) {
      console.error(`Missing section: ${section}`);
      return false;
    }
    
    for (const key of keys) {
      if (!translations[section][key]) {
        console.error(`Missing translation: ${section}.${key}`);
        return false;
      }
    }
  }
  return true;
}

if (!verifyTranslations(ukTranslations, requiredKeys)) {
  console.error("Translations verification failed");
  process.exit(1);
}

console.log("Translations verified successfully:", {
  mainTitle: ukTranslations.landing.mainTitle,
  environment: process.env.NODE_ENV
});
