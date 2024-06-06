'use client';

import { Grid } from '@mui/material';
import { useTranslations } from 'next-intl';
import { commonBackgroundLightFullHeight } from '../../../_utils/styles';
import { EmailValidationContainer } from '../../../_component/emailValidationContainer/emailValidationContainer';
import { IllusError } from '@pagopa/mui-italia';
import { backToIo } from '@/app/[locale]/_utils/common';

const EmailNotConfirmed = (): React.ReactElement => {
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
          icon={<IllusError />}
          title={t('emailvalidation.genricerrortitle')}
          subtitle={t('emailvalidation.genricerrorsubtitle')}
          button={{
            variant: 'contained',
            text: t('emailvalidation.backtoio'),
            onClick: () => backToIo(1000),
          }}
        />
      </Grid>
    </Grid>
  );
};

export default EmailNotConfirmed;
