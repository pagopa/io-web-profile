'use client';

import { Grid } from '@mui/material';
import { IllusError } from '@pagopa/mui-italia';
import { useTranslations } from 'next-intl';
import { FeedbackMessage } from '../../../_component/feedbackMessage/feedbackMessage';
import { commonBackground } from '../../../_utils/styles';
import { ROUTES } from '@/app/[locale]/_utils/routes';

const LoginKo = (): React.ReactElement => {
  const t = useTranslations('ioesco');

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
          }}
        />
      </Grid>
    </Grid>
  );
};

export default LoginKo;
