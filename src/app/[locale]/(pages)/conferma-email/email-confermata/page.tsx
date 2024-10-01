'use client';

import { Grid } from '@mui/material';
import { useTranslations } from 'next-intl';
import { commonBackgroundLightFullHeight } from '../../../_utils/styles';
import { EmailValidationContainer } from '../../../_component/emailValidationContainer/emailValidationContainer';
import { IllusCompleted } from '@pagopa/mui-italia';
import { backToIOTimeDelay, backToIo } from '@/app/[locale]/_utils/common';

const EmailConfirmedPage = (): React.ReactElement => {
  const t = useTranslations('ioesco');

  return (
    <Grid
      sx={commonBackgroundLightFullHeight}
      alignItems="center"
      justifyContent="center"
      container
    >
      <Grid item xs={12} justifySelf={'center'} marginTop={5}>
        <EmailValidationContainer
          icon={<IllusCompleted />}
          title={
            t.rich('emailvalidation.done', {
              strong: chunks => <strong>{chunks}</strong>,
            }) as string
          }
          subtitle={t('emailvalidation.emailconfirmed')}
          button={{
            variant: 'contained',
            text: t('emailvalidation.backtoio'),
            onClick: () => backToIo(backToIOTimeDelay),
          }}
        />
      </Grid>
    </Grid>
  );
};

export default EmailConfirmedPage;
