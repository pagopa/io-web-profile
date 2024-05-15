'use client';

import { Grid } from '@mui/material';
// import { useTranslations } from 'next-intl';
import { commonBackgroundFullHeight } from '../../../_utils/styles';
import { EmailValidationContainer } from '../../../_component/emailValidationContainer/emailValidationContainer';
import { IllusCompleted } from '@pagopa/mui-italia';

const EmailConfirmedPage = (): React.ReactElement => {
  // const t = useTranslations('ioesco');
  
  return (
    <Grid sx={commonBackgroundFullHeight} container>
      <Grid item xs={12} justifySelf={'center'} marginTop={5}>
              <EmailValidationContainer
            icon={<IllusCompleted />}
            title={'Fatto!'}
            subtitle={'Hai confermato la tua email! Torna su IO per continuare a usare l’app.'}
            button={{
                variant: 'contained',
                text: 'Torna su IO',
            }}
        />
      </Grid>
    </Grid>
  );
};

export default EmailConfirmedPage;
