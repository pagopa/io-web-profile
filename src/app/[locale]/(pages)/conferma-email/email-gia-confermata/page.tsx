'use client';

import { Grid } from '@mui/material';
// import { useTranslations } from 'next-intl';
import { commonBackgroundFullHeight } from '../../../_utils/styles';
import { EmailValidationContainer } from '../../../_component/emailValidationContainer/emailValidationContainer';
import { IllusEmailValidation } from '@pagopa/mui-italia';


const EmailAlreadyConfirmedPage = (): React.ReactElement => {
  //const t = useTranslations('ioesco');

  // const summaryEnrich = {
  //   b: (chunks: React.ReactNode) => (
  //     <b>
  //       {chunks}
  //     </b>
  //   )
  // }
  
  return (
    <Grid sx={commonBackgroundFullHeight} container>
      <Grid item xs={12} justifySelf={'center'} marginTop={5}>
        <EmailValidationContainer
          icon={<IllusEmailValidation />}
          title={'Hai già confermato questa email'}
          summary={
            <span>
              L’email <b> nome.cognome@pagopa.it </b> è già stata confermata. Torna su IO per continuare a usare l’app o per modificare la tua email.
              {// t.rich('', summaryEnrich)
              }
            </span>
          }
          button={{
            variant: 'contained',
            text: 'Torno su IO',
          }}
        />
      </Grid>
    </Grid>
  );
};

export default EmailAlreadyConfirmedPage;
