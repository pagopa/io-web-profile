// Optional: configure or set up a testing framework before each test.
// If you delete this file, remove `setupFilesAfterEnv` from `jest.config.js`

// Used for __tests__/testing-library.js
// Learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom/extend-expect';
import { useRouter } from 'next-intl/client';
import * as storageUtils from './src/app/[locale]/_utils/storage';

jest.mock('next-intl/client', () => ({
  useRouter: jest.fn(),
  usePathname: () => jest.fn(),
}));

export const pushMock = jest.fn();

beforeEach(() => {
  useRouter.mockReturnValue({
    push: pushMock,
  });
});

// Mock Link component globally
jest.mock('next-intl/link', () => {
  return {
    __esModule: true,
    default: ({ children }) => children, // Mocking Link as a simple wrapper around its children
  };
});

// Mock localStorage

const localStorageMock = (() => {
  let store = {};

  return {
    getItem: (key) => store[key] || null,
    setItem: (key, value) => {
      store[key] = value;
    },
    removeItem: (key) => {
      delete store[key];
    },
    clear: () => {
      store = {};
    },
  };
})();

// Mock SessionStorage

const sessionStorageMock = (() => {
  let store = {};

  return {
    getItem: (key) => store[key] || null,
    setItem: (key, value) => {
      store[key] = value;
    },
    removeItem: (key) => {
      delete store[key];
    },
    clear: () => {
      store = {};
    },
  };
})();

beforeAll(() => {
  // Mock localStorage
  jest.spyOn(window, 'localStorage', 'get').mockImplementation(() => localStorageMock);
  // Mock SessionStorage
  jest.spyOn(window, 'sessionStorage', 'get').mockImplementation(() => sessionStorageMock);

  // Mock token for tests
  const mockToken = 'testToken';
    jest.spyOn(storageUtils.storageTokenOps, 'read').mockReturnValue(mockToken);
});

afterEach(() => {
  // Clear All mocks before each test
  jest.clearAllMocks();
  localStorageMock.clear();
  sessionStorageMock.clear();
});

// Mock the _utils/common module
jest.mock('./src/app/[locale]/_utils/common', () => ({
  ...jest.requireActual('./src/app/[locale]/_utils/common'),
  localeFromStorage: 'it',
}));
