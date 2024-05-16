'use client';

import { Grid } from '@mui/material';
// import { useTranslations } from 'next-intl';
import { commonBackgroundFullHeight } from '../../../_utils/styles';
import { EmailValidationContainer } from '../../../_component/emailValidationContainer/emailValidationContainer';
import { IllusError } from '@pagopa/mui-italia';

const EmailNotConfirmed = (): React.ReactElement => {
  // const t = useTranslations('ioesco');
  
  return (
    <Grid sx={commonBackgroundFullHeight} container>
      <Grid item xs={12} justifySelf={'center'} marginTop={5}>
        <EmailValidationContainer
          icon={<IllusError />}
          title={'Non siamo riusciti a confermare la tua email'}
          summary={
            <span>
              {'Riprova o torna su IO per chiedere una nuova conferma.'}
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

export default EmailNotConfirmed;
