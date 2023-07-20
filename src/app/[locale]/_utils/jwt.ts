import { JWTUser } from '../_model/JWTUser';
import { User } from '../_model/User';

export const extractToken = (): string => {
  const URL = window.location.href;
  const tokenIndex = URL.indexOf('#Token=');
  if (tokenIndex !== -1) {
    return URL.substring(tokenIndex + 7);
  } else {
    return '';
  }
};

export const parseJwt = (token: string) => {
  try {
    return JSON.parse(atob(token.split('.')[1]));
  } catch (e) {
    return null;
  }
};

export const userFromJwtToken: (token: string) => User = function (token: string) {
  const jwtUser: JWTUser = parseJwt(token);
  return {
    uid: jwtUser.uid,
    taxCode: jwtUser.fiscal_number,
    name: jwtUser.name,
    surname: jwtUser.family_name,
    email: jwtUser.email,
    authLevel: jwtUser.level,
  };
};
