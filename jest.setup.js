// Optional: configure or set up a testing framework before each test.
// If you delete this file, remove `setupFilesAfterEnv` from `jest.config.js`

// Used for __tests__/testing-library.js
// Learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom/extend-expect';

jest.mock('next-intl/client', () => ({
  useRouter() {
    return {
      push: () => jest.fn(),
      replace: () => jest.fn(),
    };
  },
  usePathname() {
    return '';
  },
}));

// Mock Link component globally
jest.mock('next-intl/link', () => {
  return {
    __esModule: true,
    default: ({ children }) => children, // Mocking Link as a simple wrapper around its children
  };
});
