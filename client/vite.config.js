import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  console.log("Building for mode:", mode);

  return {
    plugins: [react()],
    build: {
      sourcemap: true,
      minify: true,
    },
    define: {
      __TRANSLATIONS_ENABLED__: true,
      // Force production to use the same behavior as development
      "process.env.NODE_ENV": JSON.stringify(mode),
      "import.meta.env.PROD": mode === "production",
      "import.meta.env.DEV": mode === "development",
    },
  };
});
