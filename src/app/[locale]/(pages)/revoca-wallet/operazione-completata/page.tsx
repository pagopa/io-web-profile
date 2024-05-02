'use client';
import { Alert, Button, Grid, Typography } from '@mui/material';
import { useTranslations } from 'next-intl';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { useCallback, useEffect } from 'react';
import { FAQ } from '../../../_component/accordion/faqDefault';
import { Introduction } from '../../../_component/introduction/introduction';
import { Flows } from '../../../_enums/Flows';
import useLocalePush from '../../../_hooks/useLocalePush';
import { isIdpKnown } from '../../../_utils/idps';
import { ROUTES } from '../../../_utils/routes';
import { commonBackgroundLightWithBack } from '../../../_utils/styles';
import { trackEvent } from '../../../_utils/mixpanel';
import Loader from '../../../_component/loader/loader'
import { usePathname } from 'next/navigation';
import useFetch from '@/api/webProfileApiClient';

const unlockioaccessRich = {
  br: () => <br></br>,
};

const ThankYouPage = (): React.ReactElement => {

  useEffect(() => {
    global.window?.localStorage?.setItem("walletStatus", "deactivated") // todo: simula la disattivazione del wallet
    trackEvent('IO_ITW_DEACTIVATION_UX_SUCCESS', {
      event_category: 'UX',
      event_type: 'screen_view',
    });
    trackEvent('IO_ITW_STATU_PAGE', { event_category: 'UX', event_type: 'screen_view', ITW_status: 'off' });
  }, [])

  const t = useTranslations('ioesco');
  const pushWithLocale = useLocalePush();
  const pathName = usePathname();
  const { isLoading } = useFetch();

  const handleGoProfileBtn = useCallback(() => {
    trackEvent('IO_BACK_TO_PROFILE', {
      page_name: pathName,
      event_category: 'UX',
      event_type: 'exit',
    });
    pushWithLocale(ROUTES.PROFILE);
  }, [pathName, pushWithLocale]);

  const handleLockSession = useCallback(() => {
    pushWithLocale(ROUTES.PROFILE_BLOCK);
  }, [pushWithLocale]);

  const renderSummary = useCallback(
    (isIDPKnown: boolean) => {
      if (isIDPKnown) {
        return <>{t('revokewallet.instanceclosed')}</>;
      }
      return <>{t.rich('revokewallet.instancecloseddescription', unlockioaccessRich)}</>;
    },
    [t]
  );

  const trackAccordionOpen = useCallback((element:  number) => {
    trackEvent('IO_ITW_FAQ_OPENED', { event_category: 'UX', event_type: 'action',faq_opened: element+1 });
  },[])

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
          <Typography fontWeight={600}>{t('revokewallet.lostdeviceshort')}</Typography>
          <Typography>{t('revokewallet.lockaccess')}</Typography>
        </Alert>
      </Grid>
      <FAQ flow={Flows.REVOKEWALLET} onOpenFAQ={trackAccordionOpen}/>
    </>
  );
};

export default ThankYouPage;
