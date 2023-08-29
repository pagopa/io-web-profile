'use client';

import { Grid } from '@mui/material';
import { IllusError } from '@pagopa/mui-italia';
import { useTranslations } from 'next-intl';
import { FeedbackMessage } from '../../_component/feedbackMessage/feedbackMessage';
import { commonBackground } from '../../_utils/styles';

const LoginKo = (): React.ReactElement => {
  const t = useTranslations('ioesco');

  return (
    <Grid sx={commonBackground} container>
      <Grid item xs={12} justifySelf={'center'}>
        <FeedbackMessage
          topIcon={<IllusError />}
          title={'Qui non c’è nulla!'}
          summary={<span>Questa pagina non esiste o non c’è più.</span>}
          firstButton={{
            href: process.env.NEXT_PUBLIC_URL_IO,
            variant: 'contained',
            text: t('common.backtohome'),
          }}
        />
      </Grid>
    </Grid>
  );
};

export default LoginKo;
