import {
    storageDelete,
    storageRead,
    storageWrite,
    storageOpsBuilder,
    StorageOps,
  } from './../storage-utils';
  
  describe('Storage Functions', () => {
    const key = 'testKey';
    const value = 'testValue';
  
    beforeEach(() => {
      localStorage.clear();
      sessionStorage.clear();
    });
  
    test('storageDelete deletes the correct key', () => {
      localStorage.setItem(key, value);
      storageDelete(key, true);
      expect(localStorage.getItem(key)).toBeNull();
    });
  
    test('storageWrite writes value to localStorage', () => {
      storageWrite(key, value, 'string', true);
      expect(localStorage.getItem(key)).toBe(value);
    });
  
    test('storageWrite writes value to sessionStorage', () => {
      storageWrite(key, value, 'string', false);
      expect(sessionStorage.getItem(key)).toBe(value);
    });
  
    test('storageRead reads value from localStorage', () => {
      localStorage.setItem(key, JSON.stringify(value));
      const result = storageRead(key, 'string', true);
      expect(result).toMatch(value);
    });
  
    test('storageRead reads value from sessionStorage', () => {
      sessionStorage.setItem(key, JSON.stringify(value));
      const result = storageRead(key, 'string', false);
      expect(result).toMatch(value);
    });
  
    test('storageOpsBuilder returns correct storage operations', () => {
      const ops: StorageOps<string> = storageOpsBuilder(key, 'string', true);
      ops.write(value);
      const result = ops.read();
      expect(result).toBe(value);
      ops.delete();
      expect(localStorage.getItem(key)).toBeNull();
    });
  });
  