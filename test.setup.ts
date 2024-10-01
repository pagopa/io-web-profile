/* eslint-disable functional/immutable-data */
/* eslint-disable @typescript-eslint/no-explicit-any */
// Optional: configure or set up a testing framework before each test.
// If you delete this file, remove `setupFilesAfterEnv` from `vitest.config.mts`

// Used for __tests__/testing-library.js
// Learn more: https://github.com/testing-library/jest-dom
import { vi, type Mock } from 'vitest';
import '@testing-library/jest-dom/extend-expect';
import { useRouter } from 'next-intl/client';
import * as storageUtils from './src/app/[locale]/_utils/storage';

vi.mock('next-intl/client', () => ({
  useRouter: vi.fn(),
  usePathname: () => vi.fn(),
}));

export const pushMock = vi.fn();

beforeEach(() => {
  (useRouter as Mock).mockReturnValue({
    push: pushMock,
  });
});

// Mock Link component globally
vi.mock('next-intl/link', () => ({
  __esModule: true,
  default: ({ children }: { children: any }) => children, // Mocking Link as a simple wrapper around its children
}));

// Mock localStorage

const localStorageMock = (() => {
  // eslint-disable-next-line functional/no-let
  let store: { [key: string]: any } = {};

  return {
    getItem: (key: any): any => store[key] || null,
    setItem: (key: string | number, value: any) => {
      store[key] = value;
    },
    removeItem: (key: string | number) => {
      delete store[key];
    },
    clear: () => {
      store = {};
    },
  };
})();

// Mock SessionStorage

const sessionStorageMock = (() => {
  // eslint-disable-next-line functional/no-let
  let store: { [key: string]: any } = {};

  return {
    getItem: (key: string | number) => store[key] || null,
    setItem: (key: string | number, value: any) => {
      store[key] = value;
    },
    removeItem: (key: string | number) => {
      delete store[key];
    },
    clear: () => {
      store = {};
    },
  };
})();

beforeAll(() => {
  // Mock localStorage
  vi.spyOn(window, 'localStorage', 'get').mockImplementation(() => localStorageMock as any);
  // Mock SessionStorage
  vi.spyOn(window, 'sessionStorage', 'get').mockImplementation(() => sessionStorageMock as any);

  // Mock token for tests
  const mockToken = 'testToken';
  vi.spyOn(storageUtils.storageTokenOps, 'read').mockReturnValue(mockToken);
});

afterEach(() => {
  // Clear All mocks before each test
  vi.clearAllMocks();
  localStorageMock.clear();
  sessionStorageMock.clear();
});

// Mock the _utils/common module
vi.mock('./src/app/[locale]/_utils/common', async () => ({
  ...(await vi.importActual('./src/app/[locale]/_utils/common')),
  localeFromStorage: 'it',
}));
