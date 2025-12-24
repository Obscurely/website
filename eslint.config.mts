import { fixupPluginRules } from "@eslint/compat";
import js from "@eslint/js";
import nextPlugin from "@next/eslint-plugin-next";
import tsParser from "@typescript-eslint/parser";
import type { ESLint } from "eslint";
import prettierConfig from "eslint-config-prettier";
import { flatConfigs as importXConfigs } from "eslint-plugin-import-x";
import jsxA11y from "eslint-plugin-jsx-a11y";
import prettierPlugin from "eslint-plugin-prettier";
import reactPlugin from "eslint-plugin-react";
import hooksPlugin from "eslint-plugin-react-hooks";
import securityPlugin from "eslint-plugin-security";
import unusedImports from "eslint-plugin-unused-imports";
import globals from "globals";
import { configs as tseslintConfigs } from "typescript-eslint";

// Helper to cast legacy plugins to the new strict plugin type
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const legacyPlugin = (plugin: any) => fixupPluginRules(plugin) as ESLint.Plugin;

export default [
  {
    ignores: [
      "node_modules",
      ".next",
      "out",
      "build",
      "dist",
      "next-env.d.ts",
      "coverage",
      "public",
    ],
  },

  // Global Settings
  // Placing these settings here ensures they are visible to all plugins/rules
  {
    settings: {
      react: { version: "detect" },
      "import-x/resolver": {
        typescript: {
          alwaysTryTypes: true,
          project: "./tsconfig.json",
        },
        node: true,
      },
    },
  },

  // Base Configs
  js.configs.recommended,
  ...tseslintConfigs.recommended,
  reactPlugin.configs.flat.recommended,
  jsxA11y.flatConfigs.recommended,
  importXConfigs.recommended,
  importXConfigs.typescript,

  // Custom Config
  {
    files: ["**/*.{js,mjs,cjs,ts,jsx,tsx}"],
    languageOptions: {
      parser: tsParser,
      ecmaVersion: "latest",
      sourceType: "module",
      parserOptions: {
        ecmaFeatures: { jsx: true },
      },
      globals: {
        ...globals.browser,
        ...globals.node,
      },
    },
    plugins: {
      "@next/next": nextPlugin,
      "react-hooks": legacyPlugin(hooksPlugin),
      security: legacyPlugin(securityPlugin),
      "unused-imports": unusedImports,
      prettier: prettierPlugin,
    },
    rules: {
      // Next.js & React Hooks
      // eslint-disable-next-line import-x/no-named-as-default-member
      ...nextPlugin.configs.recommended.rules,
      // eslint-disable-next-line import-x/no-named-as-default-member
      ...nextPlugin.configs["core-web-vitals"].rules,

      ...hooksPlugin.configs.recommended.rules,

      // Custom Overrides
      "react/prop-types": "off",
      "react/react-in-jsx-scope": "off",
      "react/no-unescaped-entities": "off", // just makes code unreadable
      "jsx-a11y/anchor-is-valid": "off",

      // Unused Imports
      "unused-imports/no-unused-imports": "error",
      "unused-imports/no-unused-vars": [
        "warn",
        {
          vars: "all",
          varsIgnorePattern: "^_",
          args: "after-used",
          argsIgnorePattern: "^_",
        },
      ],

      // Import Rules
      "import-x/order": "off",

      // Security
      "security/detect-object-injection": "warn",
      "security/detect-non-literal-fs-filename": "warn",
      "security/detect-unsafe-regex": "error",
      "security/detect-buffer-noassert": "error",
      "security/detect-child-process": "warn",
      "security/detect-disable-mustache-escape": "error",
      "security/detect-eval-with-expression": "error",
      "security/detect-no-csrf-before-method-override": "error",
      "security/detect-non-literal-regexp": "error",
      "security/detect-non-literal-require": "warn",
      "security/detect-possible-timing-attacks": "warn",
      "security/detect-pseudoRandomBytes": "error",

      // Prettier
      "prettier/prettier": "error",
    },
  },

  // Must be last to turn off rules that conflict with Prettier
  prettierConfig,
];
