import { LoginInfo } from '../_model/LoginInfo';
import { MagicLink } from '../_model/MagicLink';
import { Privilege } from '../_model/Privilege';
import { User } from '../_model/User';
import { storageOpsBuilder } from './storage-utils';

/** An object containing a complete set of operation on the storage regarding the key used to store in the storage the loggedUser jwt in projects */
export const storageTokenOps = storageOpsBuilder<string>('token', 'string', false);
/** An object containing a complete set of operation on the storage regarding the key used to store in the storage the magic-link jwe used for exchenge token */
export const storageJweOps = storageOpsBuilder<string>('jwe', 'string', false);
/** An object containing a complete set of operation on the storage regarding the key used to store in the storage the loggedUser in projects */
export const storageUserOps = storageOpsBuilder<User>('user', 'object', false);
/** An object containing a complete set of operation on the storage regarding the key used to store in the storage the language in projects */
export const storageLocaleOps = storageOpsBuilder<string>('locale', 'string', true);
/** This object contain a complete set of operations related to addressing cases where the user attempts to elevate privileges */
export const storagePrivilegeOps = storageOpsBuilder<Privilege>(
  'previousSecurityLevel',
  'object',
  true
);
/** This object contain a complete set of operations related to addressing cases where the user attempts to login using idp */
export const storageLoginInfoOps = storageOpsBuilder<LoginInfo>('loginInfo', 'object', true);
/** This object contain a complete set of operations related to addressing cases where the user attempts to login using magic-link */
export const storageMagicLinkOps = storageOpsBuilder<MagicLink>('magicLink', 'object', true);
