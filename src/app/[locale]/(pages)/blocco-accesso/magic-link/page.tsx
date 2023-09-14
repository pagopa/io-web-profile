'use client';
import { Button, Grid, Typography } from '@mui/material';
import { useTranslations } from 'next-intl';
import { useEffect } from 'react';
import { COMMON_PADDING_HERO } from '../../../_utils/styles';
import HourglassIcon from '../../../_icons/hourglass';
import { extractToken, userFromJwtToken } from '@/app/[locale]/_utils/jwt';
import { isBrowser } from '@/app/[locale]/_utils/common';
import { WebProfileApi } from '@/api/webProfileApiClient';
import useLocalePush from '@/app/[locale]/_hooks/useLocalePush';
import { ROUTES } from '@/app/[locale]/_utils/routes';
import { storageTokenOps, storageUserOps } from '@/app/[locale]/_utils/storage';

const ExpiredMagicLink = () => {
  const token = isBrowser() ? extractToken() : undefined;
  const t = useTranslations('ioesco');
  const pushWithLocale = useLocalePush();

  useEffect(() => {
    if (!token) {
      pushWithLocale(ROUTES.INTERNAL_ERROR);
    } else {
      storageTokenOps.write(token);
    }
  }, [pushWithLocale, token]);

  const handleContinue = () => {
    if (token) {
      WebProfileApi.exchangeToken()
        .then((res) => {
          if (res.jwt) {
            storageTokenOps.write(res.jwt);
            storageUserOps.write(userFromJwtToken(res.jwt));
            pushWithLocale(ROUTES.PROFILE_BLOCK);
          }
        })
        .catch(() => {
          pushWithLocale(ROUTES.EXPIRED_MAGIC_LINK);
        });
    } else {
      pushWithLocale(ROUTES.INTERNAL_ERROR);
    }
  };

  return (
    <Grid sx={COMMON_PADDING_HERO} container bgcolor="background.default">
      <Grid item xs={12} justifySelf={'center'}>
        <Grid container justifyContent="center">
          <Grid item xs={12} textAlign={'center'} pb={4}>
            {<HourglassIcon />}
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
              {t('common.lockio')}
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
              {t('lockaccess.continuetolock')}
            </Typography>
          </Grid>
          <Grid item xs={12} textAlign={'center'}>
            <Grid display={'flex'} justifyContent="center">
              <Button variant={'contained'} onClick={() => handleContinue()}>
                {t('common.continue')}
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default ExpiredMagicLink;
