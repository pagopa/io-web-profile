'use client';
import { Alert, Button, Grid, Typography } from '@mui/material';
import { useTranslations } from 'next-intl';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { useCallback, useEffect } from 'react';
import { FAQ } from '../../_component/accordion/faqDefault';
import { Introduction } from '../../_component/introduction/introduction';
import { Flows } from '../../_enums/Flows';
import useLocalePush from '../../_hooks/useLocalePush';
import { isIdpKnown } from '../../_utils/idps';
import { ROUTES } from '../../_utils/routes';
import { commonBackgroundLightWithBack } from '../../_utils/styles';
import { trackEvent } from '../../_utils/mixpanel';
import { getReferralLockProfile } from '../../_utils/common';
import { storageMagicLinkOps } from '../../_utils/storage';
import Loader from '../../_component/loader/loader';
import useFetch from '@/api/webProfileApiClient';

const ThankYouPage = (): React.ReactElement => {
  const t = useTranslations('ioesco');
  const pushWithLocale = useLocalePush();
  const isFromMagicLink = storageMagicLinkOps.read();
  const referral = getReferralLockProfile(isFromMagicLink);
  const { isLoading } = useFetch();

  useEffect(() => {
    trackEvent('IO_PROFILE_LOCK_ACCESS_UX_SUCCESS', {
      event_category: 'UX',
      event_type: 'screen_view',
    });
  }, []);

  const handleGoProfileBtn = useCallback(() => {
    pushWithLocale(ROUTES.PROFILE);
  }, [pushWithLocale]);

  const handleLockSession = useCallback(() => {
    trackEvent('IO_PROFILE_LOCK_ACCESS_UX_CONVERSION', {
      referral,
      event_category: 'UX',
      event_type: 'action',
    });
    pushWithLocale(ROUTES.PROFILE_BLOCK);
  }, [pushWithLocale, referral]);

  const renderSummary = useCallback(
    (isIDPKnown: boolean) => {
      if (isIDPKnown) {
        return <>{t('revokewallet.instanceclosed')}</>;
      }
      return <>{t('revokewallet.instancecloseddescription')}</>;
    },
    [t]
  );

  if (isLoading) {
    return <Loader />;
  }

  return (
    <>
      <Grid sx={commonBackgroundLightWithBack}>
        <Introduction
          title={t('revokewallet.instanceclosed')}
          summary={renderSummary(isIdpKnown())}
          summaryColumns={{ xs: 12, md: 7.5 }}
        />
        <Grid sx={{ maxWidth: '576px' }}>
          <Typography mb={5}>{t('revokewallet.instanceclosedconfirm')}</Typography>
          <Button variant="outlined" size="medium" onClick={handleGoProfileBtn}>
            {t('common.backtoprofile')}
          </Button>
        </Grid>
      </Grid>
      <Grid sx={commonBackgroundLightWithBack}>
        <Alert
          title="asdasdasdasd"
          variant="outlined"
          severity="info"
          action={
            <Button
              variant="naked"
              size="medium"
              onClick={handleLockSession}
              endIcon={<ArrowForwardIcon />}
            >
              {t('profile.lockaccess')}
            </Button>
          }
        >
          <Typography fontWeight={600}>{t('revokewallet.lostdevice')}</Typography>
          <Typography>{t('revokewallet.lockaccess')}</Typography>
        </Alert>
      </Grid>
      <FAQ flow={Flows.REVOKEWALLET} />
    </>
  );
};

export default ThankYouPage;
