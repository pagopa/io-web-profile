'use client';

import { Grid } from '@mui/material';
import { IllusError } from '@pagopa/mui-italia';
import { useTranslations } from 'next-intl';
import { FeedbackMessage } from '../../../_component/feedbackMessage/feedbackMessage';
import { commonBackground } from '../../../_utils/styles';
import { ROUTES } from '@/app/[locale]/_utils/routes';

const LoginKo = (): React.ReactElement => {
  const t = useTranslations('ioesco.error');

  return (
    <Grid sx={commonBackground} container>
      <Grid item xs={12} justifySelf={'center'}>
        <FeedbackMessage
          topIcon={<IllusError />}
          title={t('somewrong')}
          summary={<span>{t('systemerrorcontactassistence')}</span>}
          firstButton={{
            href: ROUTES.SESSION,
            variant: 'contained',
            text: t('error.retry'),
          }}
          secondButton={{
            variant: 'outlined',
            href: ROUTES.PROFILE,
            text: t('common.backtoprofile'),
          }}
        />
      </Grid>
    </Grid>
  );
};

export default LoginKo;
