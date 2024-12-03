'use client';

import { Grid } from '@mui/material';
import { IllusError } from '@pagopa/mui-italia';
import { useTranslations } from 'next-intl';
import { useEffect } from 'react';
import { FeedbackMessage } from '../../_component/feedbackMessage/feedbackMessage';
import { ROUTES } from '../../_utils/routes';
import { commonBackground } from '../../_utils/styles';
import { trackEvent } from '@/app/[locale]/_utils/mixpanel';
import { storageUserOps } from '@/app/[locale]/_utils/storage';

const LogOutKo = (): React.ReactElement => {
  const t = useTranslations('ioesco');
  const userFromStorage = storageUserOps.read();
  const isL1 = userFromStorage?.spidLevel === process.env.NEXT_PUBLIC_JWT_SPID_LEVEL_VALUE_L1;

  useEffect(() => {
    trackEvent(isL1 ? 'IO_SESSION_EXIT_ERROR' : 'IO_PROFILE_SESSION_EXIT_ERROR', {
      reason: '',
      event_category: 'KO',
    });
  }, [isL1]);

  const richText = {
    br: () => <br />,
  };
  return (
    <>
      <Grid sx={commonBackground} container>
        <Grid item xs={12} justifySelf={'center'}>
          <FeedbackMessage
            topIcon={<IllusError />}
            title={t('error.somewrong')}
            summary={t.rich('error.systemerrorlogout', richText)}
            firstButton={{
              variant: 'outlined',
              href: isL1 ? ROUTES.LOGIN : ROUTES.PROFILE,
              text: isL1 ? t('common.close') : t('common.backtoprofile'),
              onClick: () =>
                isL1
                  ? trackEvent('IO_SESSION_EXIT_USER_EXIT', {
                      event_category: 'UX',
                      event_type: 'action',
                    })
                  : trackEvent('IO_BACK_TO_PROFILE', { event_category: 'UX', event_type: 'exit' }),
            }}
            secondButton={{
              href: ROUTES.LOGOUT_CONFIRM,
              variant: 'contained',
              text: t('error.retry'),
              onClick: () =>
                trackEvent(
                  isL1 ? 'IO_SESSION_EXIT_TRY_AGAIN' : 'IO_PROFILE_SESSION_EXIT_TRY_AGAIN',
                  { event_category: 'UX', event_type: 'action' }
                ),
            }}
          />
        </Grid>
      </Grid>
    </>
  );
};

export default LogOutKo;
