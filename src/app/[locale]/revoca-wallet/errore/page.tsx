'use client';

import { Grid } from '@mui/material';
import { IllusError } from '@pagopa/mui-italia';
import { useTranslations } from 'next-intl';
import { useCallback } from 'react';
import { usePathname } from 'next-intl/client';
import { FeedbackMessage } from '../../_component/feedbackMessage/feedbackMessage';
import { commonBackground } from '../../_utils/styles';
import { ROUTES } from '@/app/[locale]/_utils/routes';
import { trackEvent } from '@/app/[locale]/_utils/mixpanel';

const WalletKo = (): React.ReactElement => {
  const t = useTranslations('ioesco');
  const pathName = usePathname();

  const handleRetryBtn = useCallback(() => {
    trackEvent('IO_ITW_DEACTIVATION_TRY_AGAIN', {
      event_category: 'UX',
      event_type: 'action',
    });
  }, []);

  const goBackToProfile = useCallback(() => {
    trackEvent('IO_BACK_TO_PROFILE', {
      page_name: pathName,
      event_category: 'UX',
      event_type: 'exit',
    });
  }, [pathName]);

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
            onClick: goBackToProfile,
          }}
          secondButton={{
            href: ROUTES.REVOKE_WALLET,
            variant: 'contained',
            text: t('error.retry'),
            onClick: handleRetryBtn,
          }}
        />
      </Grid>
    </Grid>
  );
};

export default WalletKo;
