import { ukTranslations } from "../src/translations/uk.js";

console.log("Verifying translations during build...");

if (!ukTranslations?.landing?.mainTitle) {
  console.error("Translations verification failed");
  process.exit(1);
}

console.log("Translations verified successfully");
