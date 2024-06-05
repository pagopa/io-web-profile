import { storageOpsBuilder } from '../storage-utils'; // Update the path to point to your actual module
import { User } from '../../_model/User'; // Update the path to point to your actual User model

describe('Storage Utils', () => {
  const mockUser: User = {
    uid: '001',
    taxCode: 'ISPXXXLLMMSSS88',
    email: 'mario@rossi.com',
    name: 'Carla',
    surname: 'Rossi',
    spidLevel: {
      value: 'SPIDLevel2',
    },
  };

  beforeEach(() => {
    localStorage.clear();
    sessionStorage.clear();
  });

  test('storageTokenOps works correctly', () => {
    const token = 'test-token';
    const tokenOps = storageOpsBuilder<string>('token', 'string', false);

    tokenOps.write(token);
    const retrievedToken = tokenOps.read();
    expect(retrievedToken).toBe(token);

    tokenOps.delete();
    const deletedToken = tokenOps.read();
    expect(deletedToken).toBeUndefined();
  });

  test('storageUserOps works correctly', () => {
    const userOps = storageOpsBuilder<User>('user', 'object', false);

    userOps.write(mockUser);
    const retrievedUser = userOps.read();
    expect(retrievedUser).toEqual(mockUser);

    userOps.delete();
    const deletedUser = userOps.read();
    expect(deletedUser).toBeUndefined();
  });

  test('storageLocaleOps works correctly', () => {
    const locale = 'it';
    const localeOps = storageOpsBuilder<string>('locale', 'string', true);

    localeOps.write(locale);
    const retrievedLocale = localeOps.read();
    expect(retrievedLocale).toBe(locale);

    localeOps.delete();
    const deletedLocale = localeOps.read();
    expect(deletedLocale).toBeUndefined();
  });
});
