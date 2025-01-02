import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    {
      name: "verify-translations",
      configResolved(config) {
        console.log("Build Mode:", config.mode);
        console.log("Environment Variables:", {
          VITE_FORCE_TRANSLATIONS: process.env.VITE_FORCE_TRANSLATIONS,
          NODE_ENV: process.env.NODE_ENV,
        });
      },
    },
  ],
  build: {
    sourcemap: true,
    minify: true,
  },
  define: {
    "process.env.VITE_FORCE_TRANSLATIONS": JSON.stringify(true),
    "process.env.NODE_ENV": JSON.stringify(
      process.env.NODE_ENV || "production"
    ),
  },
});
