'use client';

import { Grid } from '@mui/material';
import { useTranslations } from 'next-intl';
import { commonBackgroundLightFullHeight } from '../../_utils/styles';
import { EmailValidationContainer } from '../../_component/emailValidationContainer/emailValidationContainer';
import { IllusEmailValidation } from '@pagopa/mui-italia';
import { backToIOTimeDelay, backToIo } from '@/app/[locale]/_utils/common';
import { emailValidationSelector } from '@/app/[locale]/_redux/slices/emailValidationSlice';
import { useSelector } from 'react-redux';

const EmailAlreadyConfirmedPage = (): React.ReactElement => {
  const t = useTranslations('ioesco');
  const emailValidation = useSelector(emailValidationSelector);

  return (
    <Grid
      sx={commonBackgroundLightFullHeight}
      alignItems="center"
      justifyContent="center"
      container
    >
      <Grid item xs={12} justifySelf={'center'} marginTop={5}>
        <EmailValidationContainer
          icon={<IllusEmailValidation />}
          title={t('emailvalidation.emailalreadytakenerrortitle')}
          summary={
            t.rich('emailvalidation.emailalreadytakenerrorsubtitle', {
              email: emailValidation,
              strong: chunks => <strong>{chunks}</strong>,
            }) as string
          }
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

export default EmailAlreadyConfirmedPage;
