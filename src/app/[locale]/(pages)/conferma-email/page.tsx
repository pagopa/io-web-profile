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
import { ReasonEnum as EmailValidationErrorStatusEnum } from '@/api/generated/ioFunction/ValidationErrorsObject';
import { setEmailValidation } from '../../_redux/slices/emailValidationSlice';
import { useDispatch } from 'react-redux';

type UrlParamsType = {
  token: ValidationToken | null;
  email?: string;
};

const EmailConfirmationPage = (): React.ReactElement => {
  const t = useTranslations('ioesco');
  const [urlParams, setUrlParams] = useState<UrlParamsType | undefined>(undefined);
  const { callFetchEmailValidationWithRetries, isLoading } = useFetchEmailValidation();
  const pushWithLocale = useLocalePush();
  const dispatch = useDispatch();

  interface ValidationError {
    value: string;
    context: Array<{
      key: string;
      actual: {
        profile_email: string;
      };
    }>;
  }

  const findEmailInResponse = useCallback((response: ValidationError[]): string | undefined => {
    const contextItem = response.find(item =>
      item.context.some(ctx => ctx.actual && ctx.actual.profile_email)
    );
    return contextItem
      ? contextItem.context.find(ctx => ctx.actual && ctx.actual.profile_email)?.actual
          .profile_email
      : undefined;
  }, []);
  
  const handleEmailValidationError = useCallback((error: { left: ValidationError[] },) => {
    const errorHandlers: Record<string, () => void> = {
      [EmailValidationErrorStatusEnum.TOKEN_EXPIRED]: () => pushWithLocale(ROUTES.EMAIL_CONFIRMATION_LINK_EXPIRED),
      [EmailValidationErrorStatusEnum.EMAIL_ALREADY_TAKEN]: () => pushWithLocale(ROUTES.EMAIL_CONFIRMATION_ALREADY_COMPLETED),
    };
    if (error.left && error.left.length > 0) {
      const matchingError = error.left.find((e) => errorHandlers[e.value]);
      dispatch(setEmailValidation(findEmailInResponse(error.left)));
      if (matchingError) {
        errorHandlers[matchingError.value]();
      } else {
        pushWithLocale(ROUTES.EMAIL_NOT_CONFIRMED);
      }
    } else {
      pushWithLocale(ROUTES.EMAIL_NOT_CONFIRMED);
    }
  }, [dispatch, findEmailInResponse, pushWithLocale]);

  const extractParams = useCallback(()=> {
    try {
      const urlParams = new URLSearchParams(window.location.search);
      const token: ValidationToken | null = urlParams.get('token') as ValidationToken;

      if (token) {
        callFetchEmailValidationWithRetries(EmailValidationApi, 'emailValidationTokenInfo', token, [500])
          .then(data => {
            setUrlParams({ token, email: data.profile_email });
          })
          .catch((error) => {
            handleEmailValidationError(error)
          });
      } else {
        pushWithLocale(ROUTES.EMAIL_NOT_CONFIRMED);
      }
    } catch (error) {
      pushWithLocale(ROUTES.EMAIL_NOT_CONFIRMED);
    }
    return null;
  }, [callFetchEmailValidationWithRetries, handleEmailValidationError, pushWithLocale]);

  useEffect(() => {
    extractParams();
  }, [extractParams]);

  const handleConfirmEmail = () => {
    if (urlParams && urlParams.token) {
      callFetchEmailValidationWithRetries(EmailValidationApi, 'validateEmail', urlParams.token, [500])
        .then(() => {
          pushWithLocale(ROUTES.EMAIL_CONFIRMED);
        })
        .catch((error) => {
          handleEmailValidationError(error)
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
