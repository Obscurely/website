import { FlatCompat } from "@eslint/eslintrc";
import js from "@eslint/js";
import globals from "globals";
import { dirname } from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  // JavaScript recommended rules
  js.configs.recommended,

  // Next js
  ...compat.config({
    extends: ["next/core-web-vitals", "next/typescript"],
  }),

  // TypeScript recommended rules
  ...compat.config({
    plugins: ["@typescript-eslint"],
    extends: ["plugin:@typescript-eslint/recommended"],
  }),

  // React specific rules
  ...compat.config({
    extends: ["plugin:react/recommended", "plugin:react-hooks/recommended"],
    rules: {
      "react/prop-types": "off", // Turn off prop-types as we use TypeScript
      "react/react-in-jsx-scope": "off", // Not needed in Next.js
      "react-hooks/rules-of-hooks": "error",
      "react-hooks/exhaustive-deps": "warn",
    },
  }),

  // Import management
  ...compat.config({
    plugins: ["import", "unused-imports"],
    extends: ["plugin:import/recommended", "plugin:import/typescript"],
    rules: {
      // Import rules - DISABLE import/order since Prettier handles it
      "import/order": "off",
      "unused-imports/no-unused-imports": "error",
      "unused-imports/no-unused-vars": "warn",
    },
  }),

  // Accessibility
  ...compat.config({
    extends: ["plugin:jsx-a11y/recommended"],
    rules: {
      "jsx-a11y/anchor-is-valid": "off", // Next.js Link component handling
    },
  }),

  // Security
  ...compat.config({
    plugins: ["security"],
    rules: {
      "security/detect-buffer-noassert": "error",
      "security/detect-child-process": "warn",
      "security/detect-disable-mustache-escape": "error",
      "security/detect-eval-with-expression": "error",
      "security/detect-no-csrf-before-method-override": "error",
      "security/detect-non-literal-fs-filename": "warn",
      "security/detect-non-literal-regexp": "error",
      "security/detect-non-literal-require": "warn",
      "security/detect-object-injection": "warn",
      "security/detect-possible-timing-attacks": "warn",
      "security/detect-pseudoRandomBytes": "error",
      "security/detect-unsafe-regex": "error",
    },
  }),

  // Prettier integration
  ...compat.config({
    plugins: ["prettier"],
    extends: ["prettier"],
    rules: {
      "prettier/prettier": "error",
      "react/no-unescaped-entities": "off",
      "react/display-name": "off",
    },
  }),

  // Add browser globals
  {
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
      },
    },
  },
];

export default eslintConfig;
