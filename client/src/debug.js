export function logTranslationLoad(location) {
  console.log(
    `[${location}] Loading translations at:`,
    new Date().toISOString()
  );
  console.log(`[${location}] Environment:`, {
    NODE_ENV: process.env.NODE_ENV,
    MODE: import.meta.env.MODE,
    BASE_URL: import.meta.env.BASE_URL,
  });
}
