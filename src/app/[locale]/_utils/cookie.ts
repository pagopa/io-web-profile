import { User } from '../_model/User';
import { cookieOpsBuilder } from './cookie-utils';

export const cookieTokenOps = cookieOpsBuilder<string>('token', 'string');
export const cookieUserOps = cookieOpsBuilder<User>('user', 'object');
