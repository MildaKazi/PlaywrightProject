import playwright from "eslint-plugin-playwright";
import tseslint from "typescript-eslint";
import eslintJs from "@eslint/js";

export default tseslint.config(
  // 1. GLOBAL IGNORES (Must be the first object)
  {
    ignores: [
      "node_modules/**",
      "playwright-report/**",
      "test-results/**",
      "dist/**",
      "**/*.d.ts",
    ],
  },

  // 2. BASE TYPESCRIPT & JS RULES
  eslintJs.configs.recommended,
  ...tseslint.configs.recommended,

  // 3. PLAYWRIGHT SPECIFIC RULES
  {
    files: ["tests/**/*.ts", "**/tests/*.ts"],
    languageOptions: {
      parserOptions: {
        project: ["./tsconfig.json"],
        tsconfigRootDir: import.meta.dirname,
      },
    },
    plugins: {
      playwright,
    },
    rules: {
      // Includes recommended playwright rules
      ...playwright.configs["flat/recommended"].rules,

      // --- CRITICAL ASYNC SAFETY ---
      "@typescript-eslint/no-floating-promises": "error",
      "playwright/missing-playwright-await": "error",
      "playwright/no-useless-await": "warn",

      // --- CI & CLEANLINESS ---
      "playwright/no-focused-test": "error", // No test.only
      "playwright/no-skipped-test": "warn", // Reminder for test.skip
      "playwright/no-page-pause": "error", // No page.pause()

      // --- BEST PRACTICES ---
      "playwright/no-wait-for-timeout": "error", // No hardcoded sleeps
      "playwright/prefer-web-first-assertions": "error", // Use expect(loc).toBeVisible()
    },
  },
);
