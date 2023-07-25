'use client';

import { Grid } from '@mui/material';
import { IllusError } from '@pagopa/mui-italia';
import { useTranslations } from 'next-intl';
import { FeedbackMessage } from '../../_component/feedbackMessage/feedbackMessage';
import { ROUTES } from '../../_utils/routes';
import { commonBackground } from '../../_utils/styles';

const LoginKo = (): React.ReactElement => {
  const t = useTranslations('ioesco');
  return (
    <>
      <Grid sx={commonBackground} container>
        <Grid item xs={12} justifySelf={'center'}>
          <FeedbackMessage
            topIcon={<IllusError />}
            title={t('error.somewrong')}
            summary={<span>{t('error.systemerror')}</span>}
            button={{
              href: ROUTES.LOGIN,
              isVisible: true,
              variant: 'contained',
              text: t('common.backtohome'),
            }}
          />
        </Grid>
      </Grid>
    </>
  );
};

export default LoginKo;
