/*import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: "dist",       // <-- NECESARIO PARA VERCEL
  },
});*/

import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],

  server: {
    port: 5173,     // PUERT0 LOCAL — PUEDES CAMBIARLO a 3000, 8080, etc.
    host: true,     // Permite ver tu frontend desde el móvil en la misma red
  },

  build: {
    outDir: "dist", // NECESARIO PARA VERCEL
  },
});