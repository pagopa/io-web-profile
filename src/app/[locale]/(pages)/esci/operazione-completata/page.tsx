'use client';

import { Button, Grid } from '@mui/material';
import { useTranslations } from 'next-intl';
import { useEffect } from 'react';
import { Introduction } from '../../../_component/introduction/introduction';
import { ROUTES } from '../../../_utils/routes';
import { commonBackground } from '../../../_utils/styles';
import { storageUserOps } from '@/app/[locale]/_utils/storage';
import useLocalePush from '@/app/[locale]/_hooks/useLocalePush';
import { trackEvent } from '@/app/[locale]/_utils/mixpanel';

const ThankYouPage = (): React.ReactElement => {
  const t = useTranslations('ioesco');
  const pushWithLocale = useLocalePush();
  const userFromToken = storageUserOps.read();
  const isL2 = userFromToken?.spidLevel === process.env.NEXT_PUBLIC_JWT_SPID_LEVEL_VALUE_L2;
  const isL1 = userFromToken?.spidLevel === process.env.NEXT_PUBLIC_JWT_SPID_LEVEL_VALUE_L1;

  useEffect(() => {
    trackEvent(isL1 ? 'IO_SESSION_EXIT_UX_SUCCESS' : 'IO_PROFILE_SESSION_EXIT_UX_SUCCESS');
  }, []);

  const handleSpidLevelRedirect = () => {
    trackEvent(isL1 ? 'IO_SESSION_EXIT_USER_EXIT' : 'IO_BACK_TO_PROFILE');
    if (isL2) {
      return pushWithLocale(ROUTES.PROFILE);
    }
    return pushWithLocale(ROUTES.LOGIN);
  };
  return (
    <>
      <Grid sx={commonBackground} container>
        <Grid item xs={12} justifySelf={'center'} maxWidth="100%">
          <Introduction
            title={t('common.iologouttitle')}
            summary={t('thankyoupage.enterbackio')}
            summaryColumns={{ xs: 12, md: 10 }}
          />
        </Grid>
        <Grid item xs={12} pt={2}>
          <Button onClick={handleSpidLevelRedirect} sx={{ mr: 2 }} variant="outlined">
            {isL2 ? t('common.backtoprofile') : t('common.backtohome')}
          </Button>
        </Grid>
      </Grid>
    </>
  );
};

export default ThankYouPage;
