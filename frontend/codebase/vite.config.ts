import path from "node:path";

import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";


const __dirname = import.meta.dirname;


export default defineConfig({
  base: "/",
  build: {
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
  }
});