'use client';

import Script from 'next/script';
import { usePathname } from '@/i18n/navigation';
import { isDevMode, weAreOnEmailValidationFlow } from '../_utils/common';

export const COOKIE_NOTICE_ID = isDevMode()
  ? `${process.env.NEXT_PUBLIC_ONETRUST_COOKIES_CONSENT_OTNOTICE_ID}-test`
  : `${process.env.NEXT_PUBLIC_ONETRUST_COOKIES_CONSENT_OTNOTICE_ID}`;

/**
 * Component that initializes the OneTrust cookie notice script.
 *
 * It uses the Next.js <Script> component to inject the OneTrust SDK into the document.
 * Next.js automatically ensures idempotency, preventing multiple insertions of the script
 * across client-side navigations to avoid duplicate initialization or unexpected behavior.
 *
 * Note: The script injection is intentionally bypassed if the user is currently on the
 * email validation flow.
 */
const OneTrustScript = () => {
  const pathName = usePathname();

  if (weAreOnEmailValidationFlow(pathName)) {
    return null;
  }

  return (
    <Script
      src="/onetrust/scripttemplates/otSDKStub.js"
      strategy="beforeInteractive"
      type="text/javascript"
      data-domain-script={COOKIE_NOTICE_ID}
    />
  );
};

export default OneTrustScript;
