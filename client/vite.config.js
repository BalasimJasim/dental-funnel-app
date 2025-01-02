import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  console.log("Building for mode:", mode);

  return {
    plugins: [
      react(),
      {
        name: "debug-config",
        configResolved(config) {
          console.log("Build Config:", {
            mode: config.mode,
            env: process.env.VITE_LANGUAGE,
          });
        },
      },
    ],
    build: {
      sourcemap: true,
    },
    define: {
      __LANG__: JSON.stringify("uk"),
      "process.env.VITE_LANGUAGE": JSON.stringify("uk"),
      "import.meta.env.VITE_LANGUAGE": JSON.stringify("uk"),
    },
  };
});
