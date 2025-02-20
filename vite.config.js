import react from "@vitejs/plugin-react";
import { defineConfig, loadEnv } from "vite";

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd());
  return {
    base: "/",
    define: {
      "import.meta.env": JSON.stringify(env),
    },
    plugins: [react()],
    server: {
      port: 3000,
    },
    preview: {
      port: 3000,
    },
    build: {
      chunkSizeWarningLimit: 1200,
    },
  };
});
