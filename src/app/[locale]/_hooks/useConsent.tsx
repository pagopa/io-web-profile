/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect } from 'react';
import { initAnalytics } from '../_utils/mixpanel';

declare const OneTrust: any;
declare const OnetrustActiveGroups: string;

// target cookies (Mixpanel)
const targCookiesGroup = 'C0002';

declare global {
  interface Window {
    OptanonWrapper: () => void;
  }
}

export function useConsent() {
  useEffect(() => {
    // eslint-disable-next-line functional/immutable-data
    window.OptanonWrapper = function () {
      OneTrust.OnConsentChanged(function () {
        if (OnetrustActiveGroups.indexOf(targCookiesGroup) > -1) {
          initAnalytics();
        }
      });
    };
    if (hasConsent()) {
      initAnalytics();
    }
  }, []);
}

export const hasConsent = () => {
  const OTCookieValue: string =
    document.cookie.split('; ').find((row) => row.startsWith('OptanonConsent=')) || '';
  const checkValue = `${targCookiesGroup}%3A1`;
  return OTCookieValue.indexOf(checkValue) > -1;
};
