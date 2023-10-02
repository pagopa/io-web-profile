import { LoginInfo } from '../_model/LoginInfo';
import { MagicLink } from '../_model/MagicLink';
import { storageLocaleOps } from './storage';
import { SessionState } from '@/api/generated/webProfile/SessionState';

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

export const getLoginFlow = (loginInfo: LoginInfo): string => {
  if (loginInfo) {
    switch (loginInfo.idpSecurityLevel.type) {
      case 'L1':
        return 'login_to_SessionExit';
      case 'L2':
        return 'login_to_Profile';
      case 'L3':
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
