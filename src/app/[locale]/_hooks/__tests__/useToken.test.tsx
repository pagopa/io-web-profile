import { renderHook } from '@testing-library/react';
import useToken from '../useToken';
import * as storageUtils from '../../_utils/storage';
import * as commonUtils from '../../_utils/common';

// Mock the isBrowser function
jest.mock('../../_utils/common');

//Mock storage ops
jest.mock('../../_utils/storage');

afterAll(() => {
    jest.clearAllMocks();
})

describe('useToken hook', () => {
  beforeEach(() => {
    // Mock the behavior of the isBrowser function
    jest.spyOn(commonUtils, 'isBrowser').mockReturnValue(true);
    // Mock the behavior of storageTokenOps
    jest.spyOn(storageUtils.storageTokenOps, 'read').mockReturnValue('testToken');
  });

  test('should initialize token with value from storage', () => {
    const { result } = renderHook(() => useToken());

    expect(result.current.token).toBe('testToken');
  });

  test('isTokenValid should return true when token exists', () => {
    const { result } = renderHook(() => useToken());

    expect(result.current.isTokenValid()).toBe(true);
  });

  test('isTokenValid should return false when token is missing', () => {
    // @ts-expect-error need to mock return value undefined to test token is missing
    jest.spyOn(storageUtils.storageTokenOps, 'read').mockReturnValue(undefined);
    const { result } = renderHook(() => useToken());

    expect(result.current.isTokenValid()).toBe(false);
  });

  test('removeToken should delete token and user data from storage', () => {
    const deleteTokenSpy = jest.spyOn(storageUtils.storageTokenOps, 'delete');
    const deleteUserSpy = jest.spyOn(storageUtils.storageUserOps, 'delete');

    const { result } = renderHook(() => useToken());
    result.current.removeToken();

    expect(deleteTokenSpy).toHaveBeenCalled();
    expect(deleteUserSpy).toHaveBeenCalled();

    // Restore original implementations after the test
    deleteTokenSpy.mockRestore();
    deleteUserSpy.mockRestore();
  });
});
