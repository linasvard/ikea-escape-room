/*
 * ============================================
 * ESLINT — KODSTANDARD — ÄNDRA INTE UTAN ATT PRATA MED GRUPPEN
 * ============================================
 * Regler som gäller för all TypeScript-kod i projektet.
 * ESLint varnar/ger fel om koden bryter mot reglerna.
 */

import js from "@eslint/js";
import tseslint from "typescript-eslint";
import globals from "globals";

export default tseslint.config(
  { ignores: ["dist"] },
  {
    extends: [js.configs.recommended, ...tseslint.configs.recommended],
    files: ["**/*.ts"],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },
    rules: {
      /* Tillåt variabler som börjar med _ (t.ex. _unused) */
      "@typescript-eslint/no-unused-vars": [
        "error",
        { argsIgnorePattern: "^_" },
      ],
      /* Kräv === istället för == */
      eqeqeq: "error",
      /* Varna vid console.log (ta bort innan produktion) */
      "no-console": "warn",
      /* Kräv semicolons */
      semi: ["error", "always"],
    },
  },
);
