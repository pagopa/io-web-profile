export interface JWTUser {
  uid: string;
  fiscal_number: string;
  name: string;
  family_name: string;
  email: string;
  spid_level: SpidValueInJWT;
}

export type SpidValueInJWT = {
  value?: string;
};
