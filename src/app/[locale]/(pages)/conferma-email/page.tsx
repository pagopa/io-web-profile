'use client';

import { Grid } from '@mui/material';
// import { useTranslations } from 'next-intl';
import { commonBackgroundFullHeight } from '../../_utils/styles';
import { EmailValidationContainer } from '../../_component/emailValidationContainer/emailValidationContainer';
import { useEffect, useState } from 'react';

type UrlParams = {
  token: string;
  email: string;
};

const EmailConfirmationPage = (): React.ReactElement => {
  // const t = useTranslations('ioesco');
  const [urlParams, setUrlParams] = useState<UrlParams | undefined>(undefined);

  function extractParams() {
    try {
        const urlParams = new URLSearchParams(window.location.search);
        const token = urlParams.get('token');
        const encodedEmail = urlParams.get('email');

        if (encodedEmail && token) {
          const email = Buffer.from(decodeURIComponent(encodedEmail), 'base64').toString('utf-8');
          setUrlParams({ token, email });
        }
    } catch (error) {
        console.error(error);
    }
    return null;
  }

  useEffect(() => {
    extractParams();
  },[])

  
  return (
    <Grid sx={commonBackgroundFullHeight} container>
      <Grid item xs={12} justifySelf={'center'} marginTop={5}>
        <EmailValidationContainer
          title={'È la tua email?'}
          subtitle={urlParams && urlParams.email}
          summary={
            <span>
              {'Se confermi, useremo questo indirizzo per inviarti le comunicazioni di IO.'}
            </span>
          }
          button={{
            variant: 'contained',
            text: 'Sì, confermo',
          }}
        />
      </Grid>
    </Grid>
  );
};

export default EmailConfirmationPage;
