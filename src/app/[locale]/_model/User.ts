import { SpidValueInJWT } from './JWTUser';

export interface User {
  uid: string;
  taxCode: string;
  name: string;
  surname: string;
  email: string;
  spidLevel: SpidValueInJWT;
}
