'use client';

import { Grid } from '@mui/material';
import { IllusError } from '@pagopa/mui-italia';
import { useTranslations } from 'next-intl';
import { useEffect } from 'react';
import { FeedbackMessage } from '../../../_component/feedbackMessage/feedbackMessage';
import { commonBackground } from '../../../_utils/styles';
import { ROUTES } from '@/app/[locale]/_utils/routes';
import { trackEvent } from '@/app/[locale]/_utils/mixpanel';

const LoginKo = (): React.ReactElement => {
  const t = useTranslations('ioesco');

  useEffect(() => {
    trackEvent('IO_PROFILE_UNLOCK_ACCESS_ERROR', { event_category: 'KO' });
  }, []);

  const handleRetryBtn = () => {
    trackEvent('IO_PROFILE_UNLOCK_ACCESS_TRY_AGAIN', {
      event_category: 'UX',
      event_type: 'action',
    });
  };

  return (
    <Grid sx={commonBackground} container>
      <Grid item xs={12} justifySelf={'center'}>
        <FeedbackMessage
          topIcon={<IllusError />}
          title={t('error.somewrong')}
          summary={<span>{t('error.systemerrorcontactassistence')}</span>}
          firstButton={{
            variant: 'outlined',
            href: ROUTES.PROFILE,
            text: t('common.backtoprofile'),
          }}
          secondButton={{
            href: ROUTES.PROFILE_RESTORE,
            variant: 'contained',
            text: t('error.retry'),
            onClick: () => handleRetryBtn(),
          }}
        />
      </Grid>
    </Grid>
  );
};

export default LoginKo;
