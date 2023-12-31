import { storageLocaleOps } from './../storage';
import { addSpacesEvery3Chars, localeFromStorage, isBrowser } from '../common';
import * as common from '../common';

afterEach(() => {
  jest.clearAllMocks();
});

describe('Utilities', () => {
  describe('addSpacesEvery3Chars function', () => {
    test('given a string of digits, should insert spaces at every group of 3 characters, resulting in a formatted string', () => {
      const result = addSpacesEvery3Chars('1234567890');
      expect(result).toBe('123 456 789 0');
    });

    test('given a empty string, should return empty string', () => {
      const result = addSpacesEvery3Chars('');
      expect(result).toBe('');
    });
  });

  describe('localeFromStorage', () => {
    test('returns value from storage if available', () => {
      const mockLocale = 'it';
      storageLocaleOps.write(mockLocale);

      const result = localeFromStorage;
      expect(result).toBe(mockLocale);
    });

    test('returns default value if storage is not available', () => {
      jest.spyOn(window, 'localStorage', 'get');
      const result = localeFromStorage;
      expect(result).toBe('it');
    });
  });

  describe('isBrowser', () => {
    test('returns true when running in a browser environment', () => {
      const result = isBrowser();
      expect(result).toBe(true);
    });


  test('returns false when running in a non-browser environment', () => {  
    jest.spyOn(common,"isBrowser").mockReturnValue(false);
    const result = isBrowser();
    expect(result).toBe(false);
    });
  });
});
