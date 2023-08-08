import { storageLocaleOps } from './storage';

export const isBrowser = () => typeof window !== 'undefined';
export const localeFromStorage = isBrowser() ? storageLocaleOps.read() : 'it';
