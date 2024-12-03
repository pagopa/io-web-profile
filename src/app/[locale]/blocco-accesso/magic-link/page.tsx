'use client';
import { Button, Grid, Typography } from '@mui/material';
import { useTranslations } from 'next-intl';
import { useEffect, useState } from 'react';
import { COMMON_PADDING_HERO } from '../../_utils/styles';
import HourglassIcon from '../../_icons/hourglass';
import { extractToken, userFromJwtToken } from '@/app/[locale]/_utils/jwt';
import { isBrowser } from '@/app/[locale]/_utils/common';
import useFetch, { WebProfileApi } from '@/api/webProfileApiClient';
import useLocalePush from '@/app/[locale]/_hooks/useLocalePush';
import { ROUTES } from '@/app/[locale]/_utils/routes';
import {
  storageJweOps,
  storageMagicLinkOps,
  storageTokenOps,
  storageUserOps,
} from '@/app/[locale]/_utils/storage';
import Loader from '@/app/[locale]/_component/loader/loader';

const ExpiredMagicLink = () => {
  const jwe = isBrowser() ? extractToken() : undefined;
  const t = useTranslations('ioesco');
  const pushWithLocale = useLocalePush();
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const { callFetchWithRetries, isLoading } = useFetch();

  useEffect(() => {
    if (jwe) {
      storageJweOps.write(jwe);
      storageMagicLinkOps.write({ value: true });
    }
  }, [jwe]);

  const handleContinue = () => {
    setIsButtonDisabled(true);
    if (jwe) {
      callFetchWithRetries(WebProfileApi, 'exchangeToken', [], [500])
        .then(res => {
          if (res.jwt) {
            storageJweOps.delete();
            storageTokenOps.write(res.jwt);
            storageUserOps.write(userFromJwtToken(res.jwt));
          }
        })
        .then(() => {
          callFetchWithRetries(WebProfileApi, 'getUserSessionState', [], [500])
            .then(res => {
              if (!res.access_enabled) {
                pushWithLocale(ROUTES.ALREADY_LOCKED);
              } else {
                pushWithLocale(ROUTES.PROFILE_BLOCK);
              }
            })
            .catch(() => {
              pushWithLocale(ROUTES.INTERNAL_ERROR);
            });
        })
        .catch(() => {
          pushWithLocale(ROUTES.EXPIRED_MAGIC_LINK);
        });
    } else {
      pushWithLocale(ROUTES.INTERNAL_ERROR);
    }
  };

  if (isLoading) {
    return <Loader />;
  }

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
              <Button
                variant={'contained'}
                onClick={() => handleContinue()}
                disabled={isButtonDisabled}
              >
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
