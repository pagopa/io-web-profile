'use client';

import { Grid } from '@mui/material';
import { IllusError } from '@pagopa/mui-italia';
import { useTranslations } from 'next-intl';
import { FeedbackMessage } from '../../_component/feedbackMessage/feedbackMessage';
import { ROUTES } from '../../_utils/routes';
import { commonBackground } from '../../_utils/styles';

const LogOutKo = (): React.ReactElement => {
  const t = useTranslations('ioesco.error');
  return (
    <>
      <Grid sx={commonBackground} container>
        <Grid item xs={12} justifySelf={'center'}>
          <FeedbackMessage
            topIcon={<IllusError />}
            title={t('somewrong')}
            summary={<span>{t('systemerrorlogout')}</span>}
            button={{
              href: ROUTES.SESSION,
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

export default LogOutKo;
