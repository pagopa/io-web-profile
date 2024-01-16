import { JWTUser } from '../../_model/JWTUser';
import { User } from '../../_model/User';
import { extractToken, parseJwt, userFromJwtToken } from '../jwt';

describe('Utilities', () => {
  describe('extractToken', () => {
    test('given a URL containing a token as a fragment identifier, should successfully extract and return the token', () => {
      const mockURL = 'http://example.com/#token=mytesttoken';
      const mockLocation = { href: mockURL } as Location;
      const originalLocation = window.location;
      Object.defineProperty(window, 'location', { value: mockLocation });

      const result = extractToken();
      expect(result).toBe('mytesttoken');

      Object.defineProperty(window, 'location', { value: originalLocation });
    });
  });

  describe('parseJwt', () => {
    test('given a jwt token, should parse it', () => {
      const mockToken =
        'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6Imp3dF84Njo3NDoxZTozNTphZTphNjpkODo0YjpkYzplOTpmYzo4ZTphMDozNTo2ODpiNSJ9.eyJlbWFpbCI6InBpcHBvQHRlc3QuZW1haWwuaXQiLCJmYW1pbHlfbmFtZSI6InF3ZXJ0eSIsImZpc2NhbF9udW1iZXIiOiJRV1JQUFA4MEEwMUg1MDFGIiwibmFtZSI6InBpcHBvIiwiZnJvbV9hYSI6ZmFsc2UsInVpZCI6IjgzODQzODY0LWYzYzAtNGRlZi1iYWRiLTdmMTk3NDcxYjcyZSIsImxldmVsIjoiTDIiLCJpYXQiOjE2ODk2OTI4ODcsImV4cCI6MTY4OTcyNTI4NywiYXVkIjoiYXBpLmRldi5zZWxmY2FyZS5wYWdvcGEuaXQiLCJpc3MiOiJTUElEIiwianRpIjoiXzk0ZDJmZTYyMDQ2NTUyODRjMGRjIn0.EDbsdpQgXlJSzyVgRqZy7yuUILe5FUlaerC3n1gv6SQrNvljXJxgm3GTv0912UQ6VV85e4oxGgc4LrcvpyLYZcgVe-5-2gNfbYNIPbIWqicaX4GPucQrSq47H0NEIaAv6-3qI2l1IhdH--72zUls_911RoAg_JdINr7em0vxy7wEoqjWOxgEsfQhEauT8oyRV6dDDied5zA9YQPy7a7KlhvI6juwS4sCdFnaonNzhBcZnqW4qzpec2NaAb1xJuHnnTp_tdMz6zExEhupeopmYdtIzYHUvxfohHr1L7eDRzi5RKEUfnRIldajfQEX_NUL9UTU4EkCcwUs-rSIKskQog';

      const result = parseJwt(mockToken);
      expect(result).toEqual({
        email: 'pippo@test.email.it',
        family_name: 'qwerty',
        fiscal_number: 'QWRPPP80A01H501F',
        name: 'pippo',
        from_aa: false,
        uid: '83843864-f3c0-4def-badb-7f197471b72e',
        level: 'L2',
        iat: 1689692887,
        exp: 1689725287,
        aud: 'api.dev.selfcare.pagopa.it',
        iss: 'SPID',
        jti: '_94d2fe6204655284c0dc',
      });
    });

    test('returns null if token cannot be parsed', () => {
      const mockToken = 'invalidToken';

      const result = parseJwt(mockToken);
      expect(result).toBeUndefined();
    });
  });
});
