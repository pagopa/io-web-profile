'use client';

import { Grid } from '@mui/material';
// import { useTranslations } from 'next-intl';
import { commonBackgroundLightFullHeight } from '../../_utils/styles';
import { EmailValidationContainer } from '../../_component/emailValidationContainer/emailValidationContainer';
import { useEffect, useState } from 'react';
import useFetch, { EmailValidationApi } from '@/api/emailValidationApiClient';
import { ValidationToken } from '@/api/generated/ioFunction/ValidationToken';
import Loader from '../../_component/loader/loader';
// import { ROUTES } from '../../_utils/routes';
// import useLocalePush from '../../_hooks/useLocalePush';

type UrlParamsType = {
  token: ValidationToken | null;
  email?: string;
};

const EmailConfirmationPage = (): React.ReactElement => {
  // const t = useTranslations('ioesco');
  const [urlParams, setUrlParams] = useState<UrlParamsType | undefined>(undefined);
  const { callFetchEmailValidationWithRetries, isLoading } = useFetch();
  // const pushWithLocale = useLocalePush();

  function extractParams() {
    try {
      const urlParams = new URLSearchParams(window.location.search);
      const token: ValidationToken | null = urlParams.get('token') as ValidationToken;

      if (token) {
        callFetchEmailValidationWithRetries(EmailValidationApi, 'emailValidationTokenInfo', token, [500])
          .then(data => {
            setUrlParams({ token, email: data.profile_email });
            console.log('OK', data);
          })
          .catch(() => {
            console.log('KO');
            // TO ADD CORRECT EMAIL VALIDATION ERROR PAGE
            // IOPID 1559
            // pushWithLocale(ROUTES.PROFILE_BLOCK_KO);
          });
      }
      {
        // TO ADD CORRECT EMAIL VALIDATION ERROR PAGE
        // IOPID 1559
      }
    } catch (error) {
      console.error(error);
    }
    return null;
  }

  useEffect(() => {
    extractParams();
  }, []);

  const handleConfirmEmail = () => {
    if (urlParams && urlParams.token) {
      callFetchEmailValidationWithRetries(EmailValidationApi, 'validateEmail', urlParams.token, [500])
        .then(data => {
          // TO ADD CORRECT EMAIL VALIDATION ERROR PAGE
          // IOPID 1559/60/61
          // pushWithLocale(ROUTES.PROFILE_BLOCK_KO);
          console.log('OK', data);
        })
        .catch(() => {
          console.log('KO');
          // TO ADD CORRECT EMAIL VALIDATION ERROR PAGE
          // IOPID 1559/60/61
          // pushWithLocale(ROUTES.PROFILE_BLOCK_KO);
        });
    }
  };

  if (isLoading) {
    return <Loader />;
  }

  return (
    <Grid sx={commonBackgroundLightFullHeight} alignItems="center" 
      justifyContent="center" 
      container>
      <Grid item xs={12} justifySelf={'center'}>
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
            onClick: () => handleConfirmEmail(),
          }}
        />
      </Grid>
    </Grid>
  );
};

export default EmailConfirmationPage;
