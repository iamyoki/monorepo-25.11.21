import js from "@eslint/js";
import json from "@eslint/json";
import markdown from "@eslint/markdown";
import checkFile from "eslint-plugin-check-file";
import react from "eslint-plugin-react";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import { defineConfig, globalIgnores } from "eslint/config";
import globals from "globals";
import tseslint from "typescript-eslint";

export default defineConfig([
  globalIgnores(["**/dist", "**/build", "**/coverage", "**/next", "**/*cache"]),

  {
    files: ["**/*.{js,mjs,cjs,ts,mts,cts,jsx,tsx}"],
    extends: [
      js.configs.recommended,
      tseslint.configs.recommended,
      react.configs.flat.recommended,
      react.configs.flat["jsx-runtime"],
      reactHooks.configs.flat.recommended,
      reactRefresh.configs.vite,
    ],
    languageOptions: {
      globals: { ...globals.browser, ...globals.node },
      parserOptions: { tsconfigRootDir: import.meta.dirname },
    },
    settings: {
      react: { version: ">=19.0.0" },
    },
    rules: {
      "@typescript-eslint/no-unused-vars": [
        "error",
        { varsIgnorePattern: "^([iI][A-Z]|__)" },
      ],
    },
  },

  {
    files: ["**/*.jsonc"],
    extends: [json.configs.recommended],
  },

  {
    files: ["**/*.json5"],
    extends: [json.configs.recommended],
  },

  {
    files: ["**/*.md"],
    extends: [markdown.configs.recommended],
  },

  // {
  //   files: ["**/*.css"],
  // extends: [css.configs.recommended],
  // },

  {
    ignores: ["**/*.md"],
    plugins: {
      "check-file": checkFile,
    },
    rules: {
      "check-file/filename-naming-convention": [
        "error",
        { "**/!(__)*": "KEBAB_CASE" },
        { ignoreMiddleExtensions: true },
      ],
      "check-file/folder-naming-convention": [
        "error",
        { "**/!(__tests__)": "PASCAL_CASE" },
      ],
    },
  },
]);
