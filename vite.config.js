import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  // For GitHub Pages, use "/Portfolio/"; for Vercel, use "/".
  base: "/",
  server: { port: 5173, open: true },
  build: { outDir: "dist" },
});
