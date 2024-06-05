'use client';

import { Grid } from '@mui/material';
import { useTranslations } from 'next-intl';
import { commonBackgroundLightFullHeight } from '../../_utils/styles';
import { EmailValidationContainer } from '../../_component/emailValidationContainer/emailValidationContainer';
import { useCallback, useEffect, useState } from 'react';
import useFetchEmailValidation , { EmailValidationApi } from '@/api/emailValidationApiClient';
import { ValidationToken } from '@/api/generated/ioFunction/ValidationToken';
import Loader from '../../_component/loader/loader';
import { ROUTES } from '../../_utils/routes';
import useLocalePush from '../../_hooks/useLocalePush';

type UrlParamsType = {
  token: ValidationToken | null;
  email?: string;
};

const EmailConfirmationPage = (): React.ReactElement => {
  const t = useTranslations('ioesco');
  const [urlParams, setUrlParams] = useState<UrlParamsType | undefined>(undefined);
  const { callFetchEmailValidationWithRetries, isLoading } = useFetchEmailValidation();
  const pushWithLocale = useLocalePush();

  const extractParams = useCallback(()=> {
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
            pushWithLocale(ROUTES.EMAIL_NOT_CONFIRMED);
          });
      } else {
        pushWithLocale(ROUTES.EMAIL_NOT_CONFIRMED);
      }
    } catch (error) {
      pushWithLocale(ROUTES.EMAIL_NOT_CONFIRMED);
    }
    return null;
  }, [callFetchEmailValidationWithRetries, pushWithLocale]);

  useEffect(() => {
    extractParams();
  }, [extractParams]);

  const handleConfirmEmail = () => {
    if (urlParams && urlParams.token) {
      callFetchEmailValidationWithRetries(EmailValidationApi, 'validateEmail', urlParams.token, [500])
        .then(() => {
          pushWithLocale(ROUTES.EMAIL_CONFIRMED);
        })
        .catch(() => {
          pushWithLocale(ROUTES.EMAIL_NOT_CONFIRMED);
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
          title={t.rich('emailvalidation.confirmisyouremail', {
            strong: chunks => <strong>{chunks}</strong>,
          }) as string}
          subtitle={urlParams && urlParams.email}
          summary={
            <span>
              {t('emailvalidation.confirmsubtitle')}
            </span>
          }
          button={{
            variant: 'contained',
            text: t('emailvalidation.confirm'),
            onClick: () => handleConfirmEmail(),
          }}
        />
      </Grid>
    </Grid>
  );
};

export default EmailConfirmationPage;
