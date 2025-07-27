/**
 * @see https://prettier.io/docs/configuration
 * @type {import("prettier").Config}
 */
const config = {
  trailingComma: "es5",
  tabWidth: 2,
  useTabs: false,
  semi: true,
  singleQuote: false,
  bracketSpacing: true,
  bracketSameLine: false,
  arrowParens: "always",
  proseWrap: "always",
  endOfLine: "lf",
  plugins: [
    "prettier-plugin-tailwindcss", // Keep this last for compatibility
    "@trivago/prettier-plugin-sort-imports",
    "prettier-plugin-organize-attributes",
  ],
  printWidth: 80,
  quoteProps: "as-needed",
  // Import sorting configuration
  importOrder: [
    "^react",
    "^next",
    "<THIRD_PARTY_MODULES>",
    "^@/(.*)$",
    "^[./]",
  ],
  importOrderSeparation: true,
  importOrderSortSpecifiers: true,
};

export default config;
