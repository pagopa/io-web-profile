import { CookieValueTypes, deleteCookie, getCookie, setCookie } from 'cookies-next';

// eslint-disable-next-line @typescript-eslint/ban-types
type CookieValue = string | object;
type CookieValueType = 'string' | 'object';

/** Delete cookie */
export function cookieDelete(key: string) {
  deleteCookie(key);
}

/** Write value into cookie */
export function cookieWrite(key: string, value: CookieValue, type: CookieValueType) {
  const stringifyFn: { [key in CookieValueType]: () => string } = {
    string: () => value as string,
    object: () => JSON.stringify(value),
  };
  const stringified = stringifyFn[type]();
  setCookie(key, stringified);
}

/** Read value from cookie */
export function cookieRead(key: string, type: CookieValueType) {
  const value: CookieValueTypes = getCookie(key);
  if (typeof value === 'boolean' || value === null || value === undefined) {
    return;
  }
  const parseFn = {
    string: () => value,
    object: () => JSON.parse(value),
  };
  return parseFn[type]();
}

export type CookieOps<T> = {
  delete: () => void;
  read: () => T;
  write: (value: T) => void;
};

/** Build an object with a complete set of operation */
export function cookieOpsBuilder<T extends CookieValue>(
  key: string,
  type: CookieValueType
): CookieOps<T> {
  return {
    delete: () => cookieDelete(key),
    read: () => cookieRead(key, type),
    write: (value) => cookieWrite(key, value, type),
  };
}
