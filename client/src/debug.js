export const logTranslationLoad = (module) => {
  console.log(`[DEBUG] Loading translations from ${module}`, {
    time: new Date().toISOString(),
    environment: import.meta.env.MODE,
    forceTranslations: import.meta.env.VITE_FORCE_TRANSLATIONS,
  });
};
