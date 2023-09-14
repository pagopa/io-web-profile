import { SpidValueInJWT } from './JWTUser';

export type Privilege = {
  previous: SpidValueInJWT | undefined;
  identity: string;
};
