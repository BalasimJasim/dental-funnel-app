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
      "import.meta.env.VITE_FORCE_TRANSLATIONS": JSON.stringify(true),
      "process.env.NODE_ENV": JSON.stringify(mode),
    },
  };
});
