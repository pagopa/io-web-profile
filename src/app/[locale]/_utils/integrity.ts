import MD5 from 'crypto-js/md5';
import { userFromJwtToken } from './jwt';
import { storagePrivilegeOps, storageTokenOps } from './storage';
import { isBrowser } from './common';

const currentTaxCode = isBrowser()
  ? storageTokenOps.read()
    ? userFromJwtToken(storageTokenOps.read()).taxCode
    : undefined
  : undefined;
const previousPrivileges = isBrowser() ? storagePrivilegeOps.read() : undefined;

export const checkElevationIntegrity = () => {
  const isPrivilegeElevation =
    previousPrivileges &&
    previousPrivileges.previousSecurityLevel === process.env.NEXT_PUBLIC_JWT_SPID_LEVEL_VALUE_L2 &&
    currentTaxCode &&
    MD5(currentTaxCode).toString() === previousPrivileges.identity;
  storagePrivilegeOps.delete();
  return isPrivilegeElevation;
};
