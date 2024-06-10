'use client';

import { Grid } from '@mui/material';
import { useTranslations } from 'next-intl';
import { commonBackgroundLightFullHeight } from '../../../_utils/styles';
import { EmailValidationContainer } from '../../../_component/emailValidationContainer/emailValidationContainer';
import HourglassIcon from '@/app/[locale]/_icons/hourglass';
import { backToIo } from '@/app/[locale]/_utils/common';

const EmailConfirmationLinkExpired = (): React.ReactElement => {
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
          icon={<HourglassIcon />}
          title={t('emailvalidation.expiredlinkerrortitle')}
          summary={t('emailvalidation.expiredlinkerrorsubtitle')}
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

export default EmailConfirmationLinkExpired;
