import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    {
      name: "debug-build",
      configResolved(config) {
        console.log("Build mode:", config.mode);
        console.log("Base URL:", config.base);
      },
    },
  ],
  build: {
    sourcemap: true,
    minify: false, // Temporarily disable minification for debugging
  },
  define: {
    __DEBUG__: JSON.stringify(true),
  },
});
