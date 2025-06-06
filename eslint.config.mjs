import js from "@eslint/js";
import globals from "globals";
import tseslint from "typescript-eslint";
import pluginReact from "eslint-plugin-react";

export default [
  {
    files: ["**/*.{js,mjs,cjs,ts,jsx,tsx}"],
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node
      }
    }
  },
  js.configs.recommended,
  ...tseslint.configs.recommended,
  {
    files: ["**/*.{jsx,tsx}"],
    plugins: {
      react: pluginReact
    },
    rules: {
      ...pluginReact.configs.recommended.rules,
      "react/react-in-jsx-scope": "off",
      "react/no-unknown-property": "off"
    },
    settings: {
      react: {
        version: "detect"
      }
    }
  },
  {
    ignores: [
      "node_modules/**",
      "dist/**",
      "build/**",
      "*.min.js",
      "coverage/**",
      ".next/**",
      "out/**"
    ]
  }
];
