'use client';

import { Grid } from '@mui/material';
import { IllusError } from '@pagopa/mui-italia';
import { useTranslations } from 'next-intl';
import { useEffect } from 'react';
import { FeedbackMessage } from '../../_component/feedbackMessage/feedbackMessage';
import { commonBackground } from '../../_utils/styles';
import { trackEvent } from '../../_utils/mixpanel';
import useLogin from '../../_hooks/useLogin';

const InternalErrordPage = (): React.ReactElement => {
  const t = useTranslations('ioesco');
  const { isLoggedIn } = useLogin();

  useEffect(() => {
    trackEvent('IO_ERROR', {
      reason: 'error_500',
      login_status: isLoggedIn ? 'logged_in' : 'logged_out',
    });
  }, []);

  return (
    <Grid sx={commonBackground} container>
      <Grid item xs={12} justifySelf={'center'}>
        <FeedbackMessage
          topIcon={<IllusError />}
          title={t('error.somethingwrong')}
          summary={<span>{t('error.pagenotfound')}</span>}
          firstButton={{
            goBack: true,
            variant: 'contained',
            text: t('error.retry'),
          }}
        />
      </Grid>
    </Grid>
  );
};

export default InternalErrordPage;
