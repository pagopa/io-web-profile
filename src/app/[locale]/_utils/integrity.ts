import { SHA256 } from 'crypto-js';
import { isBrowser } from './common';
import { userFromJwtToken } from './jwt';
import { storagePrivilegeOps, storageTokenOps } from './storage';

export const checkElevationIntegrity = () => {
  const currentTaxCode = isBrowser()
    ? storageTokenOps.read()
      ? userFromJwtToken(storageTokenOps.read()).taxCode
      : undefined
    : undefined;
  const previousPrivileges = isBrowser() ? storagePrivilegeOps.read() : undefined;

  const isPrivilegeElevation =
    previousPrivileges &&
    previousPrivileges.previousSecurityLevel === process.env.NEXT_PUBLIC_JWT_SPID_LEVEL_VALUE_L2 &&
    currentTaxCode &&
    SHA256(currentTaxCode).toString() === previousPrivileges.identity;
  storagePrivilegeOps.delete();
  return isPrivilegeElevation;
};
