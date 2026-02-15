/*
 * ============================================
 * VITE CONFIG — ÄNDRA INTE UTAN ATT PRATA MED GRUPPEN
 * ============================================
 * Inställningar för Vite (byggverktyget).
 * base: "./" gör att sökvägar fungerar på GitHub Pages.
 */

import { defineConfig } from "vite";

export default defineConfig({
  base: "./",
  build: {
    outDir: "dist",
  },
});
