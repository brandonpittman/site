module.exports = {
  root: true,
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: "module",
    ecmaFeatures: {
      jsx: true,
    },
  },
  env: {
    browser: true,
    amd: true,
    node: true,
  },
  extends: [
    "next",
    "next/core-web-vitals",
    "plugin:prettier/recommended", // Make sure this is always the last element in the array.
  ],
  rules: {
    "react/no-unescaped-entities": "off",
  },
};
