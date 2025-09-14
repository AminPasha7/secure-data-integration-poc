/** Shared root ESLint config */
module.exports = {
  root: true,
  env: { node: true, es2022: true, browser: true },
  parser: "@typescript-eslint/parser",
  parserOptions: { ecmaVersion: "latest", sourceType: "module" },
  plugins: ["@typescript-eslint"],
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/strict",
    "plugin:@typescript-eslint/recommended-type-checked",
  ],
  ignorePatterns: ["**/dist/**", "**/.encore/**"],
  rules: {
    "no-console": ["warn", { "allow": ["info", "warn", "error"] }],
    "@typescript-eslint/no-misused-promises": ["error", { "checksVoidReturn": false }],
    "@typescript-eslint/consistent-type-imports": "warn"
  }
};
