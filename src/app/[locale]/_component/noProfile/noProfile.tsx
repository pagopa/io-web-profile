'use client';

import AppleIcon from '@mui/icons-material/Apple';
import { Button, Grid } from '@mui/material';
import { useTranslations } from 'next-intl';
import { useEffect } from 'react';
import { Introduction } from '../../_component/introduction/introduction';
import { commonBackground } from '../../_utils/styles';
import useLocalePush from '../../_hooks/useLocalePush';
import { storageUserOps } from '../../_utils/storage';
import { trackEvent } from '../../_utils/mixpanel';
import { ROUTES } from '../../_utils/routes';
import PlayStoreIcon from '@/app/[locale]/_icons/playstore';

export const NoProfile = (): React.ReactElement => {
  const t = useTranslations('ioesco');
  const pushWithLocale = useLocalePush();
  const userFromStorage = storageUserOps.read();

  useEffect(() => {
    trackEvent('IO_NO_PROFILE_AVAILABLE', { event_category: 'UX', event_type: 'screen_view' });
  }, []);

  const handleBtnContinue = () => {
    pushWithLocale(ROUTES.LOGIN);
    trackEvent('IO_NO_PROFILE_AVAILABLE_USER_EXIT', {
      cta_type: 'back_to_home',
      event_category: 'UX',
      event_type: 'exit',
    });
  };

  return (
    <Grid sx={commonBackground} container spacing={2}>
      <Grid item xs={12} justifySelf={'center'}>
        <Introduction
          title={t('common.hello', { nome: userFromStorage?.name })}
          summary={t('common.noprofile')}
          summaryColumns={{ xs: 12, md: 10 }}
        />
      </Grid>
      <Grid item xs={12} sm={4} md={3} display={{ xs: 'block', sm: 'none' }}>
        <Button fullWidth sx={{ mr: 2 }} variant="outlined" startIcon={<AppleIcon />}>
          {t('common.appstore')}
        </Button>
      </Grid>
      <Grid item xs={12} sm={4} md={3} display={{ xs: 'block', sm: 'none' }}>
        <Button fullWidth sx={{ mr: 2 }} variant="outlined" startIcon={<PlayStoreIcon />}>
          {t('common.playstore')}
        </Button>
      </Grid>
      <Grid item xs={12} sm={4} md={3} display={{ xs: 'none', sm: 'block' }}>
        <Button variant="outlined" onClick={() => handleBtnContinue()}>
          {t('common.backtohome')}
        </Button>
      </Grid>
    </Grid>
  );
};
