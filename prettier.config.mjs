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
  plugins: ["prettier-plugin-tailwindcss"],
  printWidth: 80,
  quoteProps: "as-needed",
};

export default config;
