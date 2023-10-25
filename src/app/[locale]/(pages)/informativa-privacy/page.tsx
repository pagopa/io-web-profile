'use client';

import { styled } from '@mui/system';
import Script from 'next/script';
import { theme } from '@pagopa/mui-italia';
import { onLoadPrivacyPolicy } from '../../_utils/onetrust';
import useLocalePush from '../../_hooks/useLocalePush';
import { ROUTES } from '../../_utils/routes';

// eslint-disable-next-line sonarjs/no-duplicate-string
const addImportanttoCssProp = (property: string) => property + ' !important';

const OneTrustPrivacyNotice = styled('div')(() => ({
  padding: theme.spacing(2),
  fontFamily: theme.typography.fontFamily,
  fontSize: theme.typography.fontSize,
  a: {
    color: theme.palette.primary.main,
  },
  button: {
    backgroundColor: addImportanttoCssProp(theme.palette.primary.dark),
    borderColor: addImportanttoCssProp(theme.palette.primary.dark),
    color: addImportanttoCssProp(theme.palette.background.paper),
    fontFamily: theme.typography.fontFamily,
    fontSize: theme.typography.fontSize,
  },
  backgroundColor: 'transparent',
  '.otnotice-menu': {
    border: 'none',
    position: 'absolute',
    background: 'none',
    boxShadow: 'none',
  },
  '.otnotice-menu-section': {
    fontSize: addImportanttoCssProp('large'),
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
        src="/onetrust/otnotice-1.0.min.js"
        type="text/javascript"
        id="otprivacy-notice-script"
        onLoad={() => handleLoadPrivacyPolicy()}
      />
    </>
  );
}
