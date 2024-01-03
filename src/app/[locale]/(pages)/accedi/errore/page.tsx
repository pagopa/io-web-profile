'use client';
import { Button, Grid, Typography } from '@mui/material';
import { IllusError } from '@pagopa/mui-italia';
import { useTranslations } from 'next-intl';
import { useSearchParams } from 'next/navigation';
import { useEffect } from 'react';
import { getLoginFlow, isBrowser } from '../../../_utils/common';
import { ROUTES } from '../../../_utils/routes';
import useLocalePush from '@/app/[locale]/_hooks/useLocalePush';
import { trackEvent } from '@/app/[locale]/_utils/mixpanel';
import { storageLoginInfoOps } from '@/app/[locale]/_utils/storage';
const LoginErrorPage = () => {
  const searchParams = useSearchParams();
  const t = useTranslations('ioesco');
  const errorCode = searchParams.get('errorCode');
  const pushWithLocale = useLocalePush();
  const loginInfo = storageLoginInfoOps.read();
  const DEFAULT_ERROR_TITLE = 'common.noaccesspossible';

  type errorMessage = {
    title: string;
    message: string;
    hasClose: boolean;
    hasRetry: boolean;
  };

  const renderErrorMessage = (errorCode: string | null): errorMessage => {
    if (errorCode == null) {
      return {
        title: t(DEFAULT_ERROR_TITLE),
        message: t('error.loginerrorretry'),
        hasClose: true,
        hasRetry: true,
      }; // Generic error
    }

    switch (errorCode) {
      case '19':
        return {
          title: t('error.toomanytries'),
          message: t('error.credentialerror'),
          hasClose: true,
          hasRetry: true,
        };
      case '20':
        return {
          title: t(DEFAULT_ERROR_TITLE),
          message: t('error.twofactorneed'),
          hasClose: true,
          hasRetry: false,
        };
      case '21':
        return {
          title: t('error.toomuchtime'),
          message: t('error.sessionexpired'),
          hasClose: true,
          hasRetry: true,
        };
      case '22':
        return {
          title: t('error.noconsents'),
          message: t('error.portalconsents'),
          hasClose: true,
          hasRetry: true,
        };
      case '23':
        return {
          title: t('error.identityrevoked'),
          message: t('error.spidrevoked'),
          hasClose: false,
          hasRetry: true,
        };
      case '25':
        return {
          title: t('error.cancelaccess'),
          message: t('error.cancellogin'),
          hasClose: true,
          hasRetry: true,
        };
      default:
        return {
          title: t(DEFAULT_ERROR_TITLE),
          message: t('error.loginerrorretry'),
          hasClose: true,
          hasRetry: true,
        };
    }
  };

  useEffect(() => {
    if (errorCode) {
      trackEvent('IO_LOGIN_ERROR', {
        reason: errorCode,
        Flow: getLoginFlow(loginInfo),
        event_category: 'KO',
      });
      storageLoginInfoOps.delete();
    }
  }, [errorCode]);

  const handleCancelBtn = () => {
    if (isBrowser()) {
      history?.back();
    }
  };
  return (
    <Grid
      sx={{
        backgroundColor: 'background.default',
        padding: {
          xs: 4,
          sm: 3,
          md: '87px',
        },
        paddingBottom: {
          sm: 8,
        },
      }}
      container
    >
      <Grid item sm={4} />
      <Grid item xs={12} sm={4} justifySelf={'center'}>
        <Grid container justifyContent="center">
          <Grid item xs={12} textAlign={'center'} pb={4}>
            {<IllusError />}
          </Grid>
          <Grid item xs={12} pb={1}>
            <Typography
              variant="h4"
              py={0}
              px={0}
              color="textPrimary"
              sx={{
                textAlign: 'center',
              }}
            >
              {renderErrorMessage(errorCode).title}
            </Typography>
          </Grid>
          <Grid item xs={12} pb={4}>
            <Typography
              variant="body1"
              py={0}
              px={0}
              color="textPrimary"
              sx={{
                textAlign: 'center',
              }}
            >
              {renderErrorMessage(errorCode).message}
            </Typography>
          </Grid>
          {typeof errorCode === 'string' && errorCode === '1001' ? (
            <Grid item xs={12} textAlign={'center'}>
              <Button onClick={() => pushWithLocale(ROUTES.LOGIN)} variant="contained">
                {t('common.backtohome')}
              </Button>
            </Grid>
          ) : (
            <Grid display={'flex'} justifyContent="space-around" flexDirection={'column'}>
              {renderErrorMessage(errorCode).hasRetry && !renderErrorMessage(errorCode).hasClose ? (
                <Grid item xs={6} justifySelf="center">
                  <Button onClick={() => pushWithLocale(ROUTES.LOGIN)} variant="contained">
                    {t('error.retry')}
                  </Button>
                </Grid>
              ) : !renderErrorMessage(errorCode).hasRetry &&
                renderErrorMessage(errorCode).hasClose ? (
                <Grid item xs={6} justifySelf="center">
                  <Button onClick={() => pushWithLocale(ROUTES.LOGIN)} variant="contained">
                    {t('common.close')}
                  </Button>
                </Grid>
              ) : (
                <Grid item xs={12} container justifyContent="center">
                  <Grid item xs={6} justifySelf="center" pr={3}>
                    <Button variant="outlined" onClick={handleCancelBtn}>
                      {t('common.close')}
                    </Button>
                  </Grid>
                  <Grid item xs={6} justifySelf="center">
                    <Button onClick={() => pushWithLocale(ROUTES.LOGIN)} variant="contained">
                      {t('error.retry')}
                    </Button>
                  </Grid>
                </Grid>
              )}
            </Grid>
          )}
        </Grid>
      </Grid>
      <Grid item sm={4} />
    </Grid>
  );
};

export default LoginErrorPage;
