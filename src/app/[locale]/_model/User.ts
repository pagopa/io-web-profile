import { SpidValueInJWT } from './JWTUser';

export type User = {
  uid: string;
  taxCode: string;
  name: string;
  surname: string;
  email: string;
  spidLevel: SpidValueInJWT;
};
