'use client';

import { Grid } from '@mui/material';
import { IllusError } from '@pagopa/mui-italia';
import { useTranslations } from 'next-intl';
import { useEffect } from 'react';
import { FeedbackMessage } from '../../_component/feedbackMessage/feedbackMessage';
import { commonBackground } from '../../_utils/styles';
import useLogin from '../../_hooks/useLogin';
import { ROUTES } from '../../_utils/routes';
import { trackEvent } from '../../_utils/mixpanel';
import { isBrowser, localeFromStorage } from '../../_utils/common';

const NotFoundPage = (): React.ReactElement => {
  const t = useTranslations('ioesco');
  const { isLoggedIn } = useLogin();
  const baseUrl = isBrowser() && window.location.origin;

  useEffect(() => {
    trackEvent('IO_ERROR', {
      reason: 'error_404',
      login_status: isLoggedIn ? 'logged_in' : 'logged_out',
      event_category: 'KO',
    });
  }, [isLoggedIn]);

  return (
    <Grid sx={commonBackground} container>
      <Grid item xs={12} justifySelf={'center'}>
        <FeedbackMessage
          topIcon={<IllusError />}
          title={'Qui non c’è nulla!'}
          summary={<span>{t('error.notlogged404')}</span>}
          firstButton={{
            href: isLoggedIn ? ROUTES.PROFILE : `${baseUrl}/${localeFromStorage}${ROUTES.LOGIN}`,
            variant: 'contained',
            text: isLoggedIn ? t('common.backtoprofile') : t('common.backtohome'),
          }}
        />
      </Grid>
    </Grid>
  );
};

export default NotFoundPage;
