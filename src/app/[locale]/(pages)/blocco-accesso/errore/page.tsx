'use client';

import { Grid } from '@mui/material';
import { IllusError } from '@pagopa/mui-italia';
import { useTranslations } from 'next-intl';
import { FeedbackMessage } from '../../../_component/feedbackMessage/feedbackMessage';
import { commonBackground } from '../../../_utils/styles';

const LoginKo = (): React.ReactElement => {
  const t = useTranslations('ioesco.error');

  return (
    <>
      <Grid sx={commonBackground} container>
        <Grid item xs={12} justifySelf={'center'}>
          <FeedbackMessage
            topIcon={<IllusError />}
            title={t('somewrong')}
            summary={<span>{t('systemerrorcontactassistence')}</span>}
            button={{
              href: '/',
              isVisible: true,
              variant: 'contained',
              text: t('retry'),
            }}
          />
        </Grid>
      </Grid>
    </>
  );
};

export default LoginKo;
