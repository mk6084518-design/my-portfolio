import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  // GitHub Pages par deploy karna ho to "/Portfolio/" kar dena. Vercel ke liye "/".
  base: "/",
  server: { port: 5173, open: true },
  build: { outDir: "dist" },
});
