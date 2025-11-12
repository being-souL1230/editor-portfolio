import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig(({ mode }) => {
  return {
    plugins: [react()],
    resolve: {
      alias: {
        "@": path.resolve(import.meta.dirname, "client/src"),
        "@assets": path.resolve(import.meta.dirname, "assets"),
      },
    },
    base: '/',
    root: path.resolve(import.meta.dirname, "client"),
    build: {
      outDir: path.resolve(import.meta.dirname, "dist"),
      emptyOutDir: true,
      sourcemap: mode === 'development',
      chunkSizeWarningLimit: 1600,
    },
    server: {
      host: "0.0.0.0",
      port: 3000,
      strictPort: true,
      open: true,
    },
  };
});
