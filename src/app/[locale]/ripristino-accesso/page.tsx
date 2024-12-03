'use client';
import { Button, Grid, Typography } from '@mui/material';
import { useTranslations } from 'next-intl';
import { useEffect } from 'react';
import { FAQ } from '../_component/accordion/faqDefault';
import CommonLayoutRestore from '../_component/commonLayoutRestore/commonLayoutRestore';
import { Flows } from '../_enums/Flows';
import useLocalePush from '../_hooks/useLocalePush';
import { ROUTES } from '../_utils/routes';
import { storageUserOps } from '../_utils/storage';
import { commonBackgroundLightWithBack } from '../_utils/styles';
import { trackEvent } from '../_utils/mixpanel';
import Loader from '../_component/loader/loader';
import useFetch, { WebProfileApi } from '@/api/webProfileApiClient';

const RestoreProfile = (): React.ReactElement => {
  const t = useTranslations('ioesco');
  const pushWithLocale = useLocalePush();
  const userFromStorage = storageUserOps.read();
  const isL3 = userFromStorage?.spidLevel === process.env.NEXT_PUBLIC_JWT_SPID_LEVEL_VALUE_L3;
  const { callFetchWithRetries, isLoading } = useFetch();
  useEffect(() => {
    trackEvent(isL3 ? 'IO_PROFILE_UNLOCK_ACCESS_L3_CONFIRM' : 'IO_PROFILE_UNLOCK_ACCESS_CONFIRM', {
      event_category: 'UX',
      event_type: 'screen_view',
    });
  }, [isL3]);

  const handleRestore = () => {
    if (isL3) {
      callFetchWithRetries(WebProfileApi, 'unlockUserSession', { unlock_code: undefined }, [500])
        .then(() => {
          pushWithLocale(ROUTES.RESTORE_THANK_YOU);
        })
        .catch(() => {
          pushWithLocale(ROUTES.PROFILE_RESTORE_KO);
        });
    } else {
      trackEvent('IO_PROFILE_UNLOCK_ACCESS_CONFIRMED', {
        event_category: 'UX',
        event_type: 'action',
      });
      pushWithLocale(ROUTES.RESTORE_CODE);
    }
  };

  if (isLoading) {
    return <Loader />;
  }

  return (
    <>
      <Grid sx={commonBackgroundLightWithBack} item xs={12} sm={12}>
        <CommonLayoutRestore
          title={t('restore.restoreaccess')}
          summary={t('common.identitysecurityrestore')}
        />
        {!isL3 && (
          <Grid item sm={10} md={7}>
            <Typography mb={5} fontSize={'20px'}>
              {t.rich('restore.needrestorecode', {
                strong: chunks => <strong>{chunks}</strong>,
              })}
            </Typography>
          </Grid>
        )}
        <Grid>
          <Button variant="contained" size="medium" onClick={handleRestore}>
            {t('common.restoreioaccess')}
          </Button>
        </Grid>
      </Grid>
      <FAQ flow={isL3 ? Flows.RESTOREL3 : Flows.RESTORE} />
    </>
  );
};

export default RestoreProfile;
