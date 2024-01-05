import { LoginInfo } from '../_model/LoginInfo';
import { MagicLink } from '../_model/MagicLink';
import { ROUTES } from './routes';
import { storageLocaleOps } from './storage';
import { SessionState } from '@/api/generated/webProfile/SessionState';

export type LoginTypes =
  | 'login_to_SessionExit'
  | 'login_to_Profile'
  | 'login_to_UnlockAccessL3'
  | '';

export const localeList = ['it'];
export const defaultLocale = 'it';

export const isBrowser = () => typeof window !== 'undefined';

export const addSpacesEvery3Chars = (input: string, startIndex = 0): string => {
  const chunkSize = 3;

  if (startIndex >= input.length) {
    return '';
  }

  const chunk = input.slice(startIndex, startIndex + chunkSize);
  const remainingFormatted = addSpacesEvery3Chars(input, startIndex + chunkSize);

  return chunk + (remainingFormatted === '' ? '' : ' ' + remainingFormatted);
};
export const localeFromStorage = isBrowser() ? storageLocaleOps.read() : 'it';

export const getSessionStatus = (sessionData: SessionState | null): 'on' | 'off' =>
  sessionData?.session_info.active ? 'on' : 'off';

export const getAccessStatus = (sessionData: SessionState | null): 'unlocked' | 'locked' =>
  sessionData?.access_enabled ? 'unlocked' : 'locked';

export const getLoginFlow = (loginInfo: LoginInfo): LoginTypes => {
  if (loginInfo) {
    switch (loginInfo.loginPage) {
      case ROUTES.LOGOUT_INIT:
        return 'login_to_SessionExit';
      case ROUTES.LOGIN || ROUTES.EXPIRED_MAGIC_LINK:
        return 'login_to_Profile';
      case ROUTES.LOGIN_L3:
        return 'login_to_UnlockAccessL3';
      default:
        return '';
    }
  } else {
    return '';
  }
};

export const getReferralLockProfile = (isMagicLink: MagicLink): string => {
  if (isMagicLink && isMagicLink.value) {
    return 'email';
  } else {
    return 'profile';
  }
};

export const decodeObfuscatedEmail = (encodedEmail: string): string =>
  encodedEmail.replace(/&#@!(\d+);/g, function (match, dec) {
    return String.fromCharCode(dec);
  });

export const isEnvConfigEnabled = (envVariable: string | undefined): boolean =>
  envVariable === 'true' ? true : false;

export const isDevMode = (): boolean => process.env.NEXT_PUBLIC_DEV_MODE === 'true';

const encodedEmail =
  '&#@!105;&#@!111;&#@!64;assi%73ten&#@!37;7&#@!65;a&#@!46;&#@!112;%&#@!54;&#@!49;g&#@!111;p%6&#@!49;%&#@!50;&#@!69;it';

export const assistenceEmail = decodeObfuscatedEmail(encodedEmail);
