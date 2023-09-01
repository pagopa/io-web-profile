import { act, renderHook } from '@testing-library/react';
import useLogin from '../useLogin'; // Adjust the import path as needed
import * as commonUtils from '../../_utils/common'; // Adjust the import path as needed
import * as storageUtils from '../../_utils/storage';
import { User } from '../../_model/User';
import { ROUTES } from '../../_utils/routes';
import { pushMock } from '../../../../../jest.setup';

describe('useLogin hook', () => {
  beforeEach(() => {
    // Mock the behavior of the isBrowser function
    jest.spyOn(commonUtils, 'isBrowser').mockReturnValue(true);
  });

  test('should set isLoggedIn to true and userLogged when token exists', () => {

    const mockUser: User = {
      uid: '12232',
      name: 'Carla',
      taxCode: 'XXXXXXXXXXXXXX',
      surname: 'Rossi',
      email: 'mail@mail.com',
      spidLevel: {
        value: 'L1',
      },
    };

    const mockToken = 'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6Imp3dF84Njo3NDoxZTozNTphZTphNjpkODo0YjpkYzplOTpmYzo4ZTphMDozNTo2ODpiNSJ9.eyJlbWFpbCI6InBpcHBvQHRlc3QuZW1haWwuaXQiLCJmYW1pbHlfbmFtZSI6InF3ZXJ0eSIsImZpc2NhbF9udW1iZXIiOiJRV1JQUFA4MEEwMUg1MDFGIiwibmFtZSI6InBpcHBvIiwiZnJvbV9hYSI6ZmFsc2UsInVpZCI6IjgzODQzODY0LWYzYzAtNGRlZi1iYWRiLTdmMTk3NDcxYjcyZSIsImxldmVsIjoiTDIiLCJpYXQiOjE2ODk2OTI4ODcsImV4cCI6MTY4OTcyNTI4NywiYXVkIjoiYXBpLmRldi5zZWxmY2FyZS5wYWdvcGEuaXQiLCJpc3MiOiJTUElEIiwianRpIjoiXzk0ZDJmZTYyMDQ2NTUyODRjMGRjIn0.EDbsdpQgXlJSzyVgRqZy7yuUILe5FUlaerC3n1gv6SQrNvljXJxgm3GTv0912UQ6VV85e4oxGgc4LrcvpyLYZcgVe-5-2gNfbYNIPbIWqicaX4GPucQrSq47H0NEIaAv6-3qI2l1IhdH--72zUls_911RoAg_JdINr7em0vxy7wEoqjWOxgEsfQhEauT8oyRV6dDDied5zA9YQPy7a7KlhvI6juwS4sCdFnaonNzhBcZnqW4qzpec2NaAb1xJuHnnTp_tdMz6zExEhupeopmYdtIzYHUvxfohHr1L7eDRzi5RKEUfnRIldajfQEX_NUL9UTU4EkCcwUs-rSIKskQog';

    jest.spyOn(storageUtils.storageTokenOps, 'read').mockReturnValue(mockToken);
    jest.spyOn(storageUtils.storageUserOps, 'read').mockReturnValue(mockUser);

    const { result } = renderHook(() => useLogin());

    expect(result.current.isLoggedIn).toBe(true);
    expect(result.current.userLogged).toEqual(mockUser);
  });

  test('should set isLoggedIn to false and userLogged to undefined when token does not exist', () => {
    jest.spyOn(commonUtils, 'isBrowser').mockReturnValue(false);

    // @ts-expect-error need to mock return value undefined to test token is missing
    jest.spyOn(storageUtils.storageTokenOps, 'read').mockReturnValue(undefined);

    const { result } = renderHook(() => useLogin());

    expect(result.current.isLoggedIn).toBe(false);
    expect(result.current.userLogged).toBe(undefined);
  });

  test('should call logOut, clear session storage and redirect to login page', () => {
    const sessionStorageClearMock = jest.spyOn(sessionStorage, 'clear');

    const { result } = renderHook(() => useLogin());

    act(() => {
      result.current.logOut();
    });

    expect(result.current.isLoggedIn).toBe(false);
    expect(result.current.userLogged).toBeUndefined(); 

    expect(sessionStorageClearMock).toHaveBeenCalled();
    expect(pushMock).toHaveBeenCalledWith(ROUTES.LOGIN, { locale: 'it' });

    sessionStorageClearMock.mockRestore();
  });
});