import { test, vi } from 'vitest';
import { renderHook } from '@testing-library/react';
import useToken from '../useToken';
import * as storageUtils from '../../_utils/storage';
import * as commonUtils from '../../_utils/common';

// Mock the isBrowser function
vi.mock('../../_utils/common');

//Mock storage ops
vi.mock('../../_utils/storage');

afterAll(() => {
  vi.clearAllMocks();
});

describe('useToken hook', () => {
  beforeEach(() => {
    // Mock the behavior of the isBrowser function
    vi.spyOn(commonUtils, 'isBrowser').mockReturnValue(true);
    // Mock the behavior of storageTokenOps
    vi.spyOn(storageUtils.storageTokenOps, 'read').mockReturnValue('testToken');
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
    vi.spyOn(storageUtils.storageTokenOps, 'read').mockReturnValue(undefined);
    const { result } = renderHook(() => useToken());

    expect(result.current.isTokenValid()).toBe(false);
  });

  test('removeToken should delete token and user data from storage', () => {
    const deleteTokenSpy = vi.spyOn(storageUtils.storageTokenOps, 'delete');
    const deleteUserSpy = vi.spyOn(storageUtils.storageUserOps, 'delete');

    const { result } = renderHook(() => useToken());
    result.current.removeToken();

    expect(deleteTokenSpy).toHaveBeenCalled();
    expect(deleteUserSpy).toHaveBeenCalled();

    // Restore original implementations after the test
    deleteTokenSpy.mockRestore();
    deleteUserSpy.mockRestore();
  });
});
