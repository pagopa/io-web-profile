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
