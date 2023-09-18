'use client';

import { Grid } from '@mui/material';
import { IllusError } from '@pagopa/mui-italia';
import { useTranslations } from 'next-intl';
import { FeedbackMessage } from '../../_component/feedbackMessage/feedbackMessage';
import { commonBackground } from '../../_utils/styles';

const InternalErrordPage = (): React.ReactElement => {
  const t = useTranslations('ioesco');
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
