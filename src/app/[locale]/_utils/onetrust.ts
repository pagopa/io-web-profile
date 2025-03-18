import { isDevMode } from './common';

declare const OneTrust: {
  NoticeApi: {
    Initialized: Promise<unknown>;
    LoadNotices: (urls: unknown[]) => void;
  };
};

export const onLoadPrivacyPolicy = (otNoticeId: string) =>
  new Promise((resolve, reject) => {
    OneTrust.NoticeApi.Initialized.then(function() {
      OneTrust.NoticeApi.LoadNotices([
        `https://privacyportalde-cdn.onetrust.com/77f17844-04c3-4969-a11d-462ee77acbe1/privacy-notices/${otNoticeId}.json`,
      ]);
      resolve(true);
    }).catch(() => {
      reject(false);
    });
  });

export const COOKIE_NOTICE_ID = isDevMode()
  ? `${process.env.NEXT_PUBLIC_ONETRUST_COOKIES_CONSENT_OTNOTICE_ID}-test`
  : `${process.env.NEXT_PUBLIC_ONETRUST_COOKIES_CONSENT_OTNOTICE_ID}`;

export function initOneTrust() {
  const scriptEl = document.createElement('script');
  scriptEl.setAttribute('src', 'https://cdn.cookielaw.org/scripttemplates/otSDKStub.js');
  scriptEl.setAttribute('type', 'text/javascript');
  scriptEl.setAttribute('charset', 'UTF-8');
  scriptEl.setAttribute('data-domain-script', COOKIE_NOTICE_ID);
  document.head.appendChild(scriptEl);
}
