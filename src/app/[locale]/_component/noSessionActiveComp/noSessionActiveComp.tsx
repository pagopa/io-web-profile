'use client';

import { Button, Grid } from '@mui/material';
import { useTranslations } from 'next-intl';
import { commonBackgroundLight } from '../../_utils/styles';
import { FAQ } from '../accordion/faqDefault';
import { Introduction } from '../introduction/introduction';
import { trackEvent } from '../../_utils/mixpanel';
import { storageUserOps } from '../../_utils/storage';
import { ROUTES } from '@/app/[locale]/_utils/routes';
import useLocalePush from '@/app/[locale]/_hooks/useLocalePush';

type NoSessionProps = {
  title: string;
};

const NoSessionActiveComp = ({ title }: NoSessionProps): React.ReactElement => {
  const t = useTranslations('ioesco');
  const pushWithLocale = useLocalePush();
  const userFromStorage = storageUserOps.read();
  const isL1 = userFromStorage?.spidLevel === process.env.NEXT_PUBLIC_JWT_SPID_LEVEL_VALUE_L1;

  const handleCloseBtn = () => {
    trackEvent(isL1 ? 'IO_SESSION_EXIT_USER_EXIT' : 'IO_PROFILE_SESSION_EXIT_UX_CONVERSION', {
      event_category: 'UX',
      event_type: 'action',
    });
    pushWithLocale(ROUTES.LOGIN);
  };

  return (
    <>
      <Grid sx={commonBackgroundLight} container>
        <Grid item xs={12} justifySelf={'center'}>
          <Introduction
            title={title}
            summary={t('lplogoutpostlogin.noactivesession')}
            summaryColumns={{ xs: 12, md: 6 }}
          />
        </Grid>
        <Grid item xs={12}>
          <Button onClick={() => handleCloseBtn()} sx={{ mr: 2 }} variant="outlined">
            {t('common.backtohome')}
          </Button>
        </Grid>
      </Grid>
      <FAQ />
    </>
  );
};

export default NoSessionActiveComp;
