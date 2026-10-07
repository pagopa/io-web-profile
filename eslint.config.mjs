import { defineConfig } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTypescript from "eslint-config-next/typescript";
import prettier from "eslint-config-prettier";
import functional from "eslint-plugin-functional";

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
  ...nextVitals,
  ...nextTypescript,
  {
    languageOptions: {
      parserOptions: {
        projectService: true,
      }
    },
  },
  {
    plugins: {
      functional,
    },
    rules: {
      'functional/immutable-data': 'error',
      // react-hooks v7 (bundled transitively by eslint-config-next) flags
      // "read from storage, then setState in useEffect" as an error. This
      // is an established hydration pattern used across this codebase
      // (useLogin, useToken, sessionProvider, selectIdp); keep it as a
      // warning rather than blocking lint/CI.
      'react-hooks/set-state-in-effect': 'warn',
    }
  },
  prettier
]);
