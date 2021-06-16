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
    // "prettier/prettier": ["error", {}, { usePrettierrc: true }],
    // "react/display-name": "off",
    // "prefer-const": "off",
    // "@typescript-eslint/explicit-function-return-type": "off",
    // "@typescript-eslint/explicit-module-boundary-types": "off",
    // "@typescript-eslint/no-explicit-any": "off",
    //"react/no-unescaped-entities": "off",
    // "jsx-a11y/anchor-is-valid": [
    //   "error",
    //   {
    //     components: ["Link"],
    //     specialLink: ["hrefLeft", "hrefRight"],
    //     aspects: ["invalidHref", "preferButton"],
    //   },
    // ],
  },
};
