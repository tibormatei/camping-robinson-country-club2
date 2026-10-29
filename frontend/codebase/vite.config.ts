import path from "node:path";

import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";


const __dirname = import.meta.dirname;


export default defineConfig({
  base: "/",
  build: {
    chunkSizeWarningLimit: 512,  // Adjust the chunk size warning limit if needed
  },
  plugins: [
    react(),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },
  server: {
    host: "0.0.0.0",  // Required in Docker, otherwise the server is not reachable from outside.
    port: Number(process.env.APP_PORT) || 3000,
    strictPort: true, // Stop if the port is already in use, instead of trying the next available port.
    watch: {
      // File change events often do not reach the container through a bind mount
      // (Docker Desktop, WSL), so check the files periodically instead.
      usePolling: true,
      interval: 1000,
    },
    proxy: {
      // Development only: the browser calls the relative "/api/..." URLs, Vite forwards them to the backend.
      // In production does the same, so no frontend code depends on this block.
      "/api": {
        target: process.env.API_PROXY_TARGET || "http://localhost:4000",
        changeOrigin: true,
      },
    },
  }
});
