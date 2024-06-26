import { JWTUser } from '../_model/JWTUser';
import { User } from '../_model/User';

export const extractToken = (): string | undefined => {
  const URL = window.location.href;
  const tokenIndex = URL.indexOf('#token=');
  if (tokenIndex !== -1) {
    return URL.substring(tokenIndex + 7);
  } else {
    return undefined;
  }
};

export const parseJwt = (token: string) => {
  try {
    return JSON.parse(atob(token.split('.')[1]));
  } catch (e) {
    return undefined;
  }
};

export const userFromJwtToken: (token: string) => User = function(token: string) {
  const jwtUser: JWTUser = parseJwt(token);
  return {
    uid: jwtUser.uid,
    taxCode: jwtUser.fiscal_number,
    name: jwtUser.name,
    surname: jwtUser.family_name,
    email: jwtUser.email,
    spidLevel: jwtUser.spid_level,
  };
};
