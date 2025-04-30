import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";
import globals from "globals";
import js from "@eslint/js";

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
