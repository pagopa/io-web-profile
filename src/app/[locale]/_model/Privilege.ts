import { SpidValueInJWT } from './JWTUser';

export type Privilege = {
  previousSecurityLevel: SpidValueInJWT | undefined;
  identity: string;
};
