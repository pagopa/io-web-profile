import { defineConfig } from "eslint/config";
import nextPlugin from "@next/eslint-plugin-next";
import eslintConfigPrettier from "eslint-config-prettier";
import typescriptEslintPlugin from "@typescript-eslint/eslint-plugin";
import functional from "eslint-plugin-functional";
import globals from "globals";

export default defineConfig([
  {
    ignores: [
      '**/node_modules/**',
      '**/generated/**',
      '**/__tests__/**',
      '**/__mocks__/**',
      '**/__integrations__/**',
      '**/*.d.ts',
      '**/*.js',
      '**/*.mts',
    ],
  },
  {
    plugins: {
      "@next/next": nextPlugin,
    },
    rules: {
      ...nextPlugin.configs.recommended.rules,
      ...nextPlugin.configs["core-web-vitals"].rules,
    },
  },
  ...typescriptEslintPlugin.configs['flat/recommended'],
  {
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
      },
      parserOptions: {
        projectService: true,
      }
    },
    plugins: {
      functional,
    },
    rules: {
      'functional/immutable-data': 'error',
    }
  },
  eslintConfigPrettier
]);
