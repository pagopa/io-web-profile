'use client';

import { Grid } from '@mui/material';
// import { useTranslations } from 'next-intl';
import { commonBackgroundFullHeight } from '../../../_utils/styles';
import { EmailValidationContainer } from '../../../_component/emailValidationContainer/emailValidationContainer';
import HourglassIcon from '@/app/[locale]/_icons/hourglass';

const EmailConfirmationLinkExpired = (): React.ReactElement => {
  // const t = useTranslations('ioesco');
  return (
    <Grid sx={commonBackgroundFullHeight} container>
      <Grid item xs={12} justifySelf={'center'} marginTop={5}>
        <EmailValidationContainer
          icon={<HourglassIcon />}
          title={'Il link è scaduto'}
          summary={
            <span>
              {'Torna su IO e chiedi l’invio di una nuova email di conferma per il tuo indirizzo.'}
            </span>
          }
          button={{
            variant: 'contained',
            text: 'Torna su IO',
          }}
        />
      </Grid>
    </Grid>
  );
};

export default EmailConfirmationLinkExpired;
