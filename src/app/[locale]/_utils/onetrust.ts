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

/**
 * Initializes the OneTrust cookie notice script by dynamically injecting it into the document head.
 *
 * The function first checks if a script element with the specific `data-domain-script` attribute
 * (matching `COOKIE_NOTICE_ID`) already exists in the DOM. This check is necessary to prevent
 * multiple insertions of the OneTrust script, which could lead to duplicate initialization,
 * unexpected behavior, or performance issues. If the script is not present, it creates and appends
 * the script element to load the OneTrust SDK.
 */
export function initOneTrust() {
  if (!document.querySelector(`script[data-domain-script="${COOKIE_NOTICE_ID}"]`)) {
    const scriptEl = document.createElement('script');
    scriptEl.setAttribute('src', '/onetrust/scripttemplates/otSDKStub.js');
    scriptEl.setAttribute('type', 'text/javascript');
    scriptEl.setAttribute('charset', 'UTF-8');
    scriptEl.setAttribute('data-domain-script', COOKIE_NOTICE_ID);
    document.head.appendChild(scriptEl);
  }
}
