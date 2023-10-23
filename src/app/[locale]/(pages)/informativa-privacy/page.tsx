'use client';

import { styled } from '@mui/system';
import Script from 'next/script';
import { theme } from '@pagopa/mui-italia';
import { onLoadPrivacyPolicy } from '../../_utils/onetrust';
import useLocalePush from '../../_hooks/useLocalePush';
import { ROUTES } from '../../_utils/routes';

const OneTrustPrivacyNotice = styled('div')(() => ({
  padding: theme.spacing(2),
  fontFamily: theme.typography.fontFamily,
  fontSize: theme.typography.fontSize,
  a: {
    color: theme.palette.primary.main,
  },
  backgroundColor: 'transparent',
  '.otnotice-menu': {
    border: 'none',
    position: 'absolute',
    background: 'none',
    'box-shadow': 'none',
  },
  '.otnotice-menu-section': {
    'font-size': 'large !important',
  },
}));

export default function PolicyPage() {
  const POLICY_ID = process.env.NEXT_PUBLIC_ONETRUST_PRIVACY_OTNOTICE_ID || '';
  const pushWithLocale = useLocalePush();

  const handleLoadPrivacyPolicy = () => {
    onLoadPrivacyPolicy(POLICY_ID).catch(() => pushWithLocale(ROUTES.INTERNAL_ERROR));
  };

  return (
    <>
      <OneTrustPrivacyNotice id={`otnotice-${POLICY_ID}`} className="otnotice" />
      <Script
        src="https://privacyportalde-cdn.onetrust.com/privacy-notice-scripts/otnotice-1.0.min.js"
        type="text/javascript"
        id="otprivacy-notice-script"
        onLoad={() => handleLoadPrivacyPolicy()}
      />
    </>
  );
}
