'use client';
import { Button, Grid, Link, Typography } from '@mui/material';
import { IllusError } from '@pagopa/mui-italia';
import { useTranslations } from 'next-intl';
import { useSearchParams } from 'next/navigation';
import { ROUTES } from '../../../_utils/routes';
import { isBrowser } from '../../../_utils/common';

const LoginErrorPage = () => {
  const searchParams = useSearchParams();
  const t = useTranslations('ioesco');
  const errorCode = searchParams.get('errorCode');
  const ERROR_TITLE = t('error.loginerror');

  const renderErrorSummary = (errorCode: string | null) => {
    if (errorCode == null) {
      return t('error.loginerrorretry'); // Generic error
    }

    switch (errorCode) {
      case '19':
        return t('error.credentialerror');
      case '20':
        return t('error.twofactorneed');
      case '21':
        return t('error.sessionexpired');
      case '22':
        return t('error.portalconsents');
      case '23':
        return t('error.spidrevoked');
      case '25':
        return t('error.cancellogin');
      case '1001':
        return t('error.minage');
      default:
        return t('error.loginerrorretry');
    }
  };

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
              {ERROR_TITLE}
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
              {renderErrorSummary(errorCode)}
            </Typography>
          </Grid>
          {typeof errorCode === 'string' && errorCode === '1001' ? (
            <Grid item xs={12} textAlign={'center'}>
              <Link href={process.env.NEXT_PUBLIC_URL_IO}>
                <Button variant="contained">Torna alla home</Button>
              </Link>
            </Grid>
          ) : (
            <Grid display={'flex'} justifyContent="space-around" flexDirection={'column'}>
              <Grid item xs={12} container justifyContent="center">
                <Grid item xs={6} justifySelf="center" pr={3}>
                  <Button variant="outlined" onClick={handleCancelBtn}>
                    {t('common.cancel')}
                  </Button>
                </Grid>
                <Grid item xs={6} justifySelf="center">
                  <Link href={ROUTES.LOGIN}>
                    <Button variant="contained">{t('error.retry')}</Button>
                  </Link>
                </Grid>
              </Grid>
            </Grid>
          )}
        </Grid>
      </Grid>
      <Grid item sm={4} />
    </Grid>
  );
};

export default LoginErrorPage;