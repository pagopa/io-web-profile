'use client';

import { Button, Grid } from '@mui/material';
import { useTranslations } from 'next-intl';
import useLocalePush from '../../_hooks/useLocalePush';
import { ROUTES } from '../../_utils/routes';
import { commonBackgroundLight, commonBackgroundLightWithBack } from '../../_utils/styles';
import { FAQ } from '../accordion/faqDefault';
import { BackButton } from '../backButton/backButton';
import { Introduction } from '../introduction/introduction';
import { trackEvent } from '../../_utils/mixpanel';
import { storageUserOps } from '../../_utils/storage';
import { localeFromStorage } from '../../_utils/common';
import Loader from '../loader/loader';
import useFetch, { WebProfileApi } from '@/api/webProfileApiClient';

type SessionProps = {
  title: string;
  showArrowBackBtn: boolean;
  expirationDate: Date;
};

const SessionActiveComp = ({
  title,
  showArrowBackBtn,
  expirationDate,
}: SessionProps): React.ReactElement => {
  const t = useTranslations('ioweb');
  const pushWithLocale = useLocalePush();
  const userFromStorage = storageUserOps.read();
  const isL1 = userFromStorage?.spidLevel === process.env.NEXT_PUBLIC_JWT_SPID_LEVEL_VALUE_L1;
  const { callFetchWithRetries, isLoading } = useFetch();

  const handleLogout = () => {
    trackEvent(isL1 ? 'IO_SESSION_EXIT_UX_CONVERSION' : 'IO_PROFILE_SESSION_EXIT_UX_CONVERSION', {
      event_category: 'UX',
      event_type: 'action',
    });

    callFetchWithRetries(WebProfileApi, 'logoutFromIOApp', [], [500])
      .then(() => {
        pushWithLocale(ROUTES.THANK_YOU);
      })
      .catch(() => pushWithLocale(ROUTES.LOGOUT_KO));
  };

  if (isLoading) {
    return <Loader />;
  }
  return (
    <>
      <Grid sx={showArrowBackBtn ? commonBackgroundLightWithBack : commonBackgroundLight} container>
        {showArrowBackBtn && <BackButton />}
        <Grid item xs={12} justifySelf={'center'}>
          <Introduction
            title={title}
            summary={t('lplogout.activesession', {
              date: expirationDate?.toLocaleDateString(localeFromStorage),
            })}
            summaryColumns={{ xs: 12, md: 6 }}
          />
        </Grid>
        {/* FIXME: https://pagopa.atlassian.net/browse/IOPID-710
        <Grid item xs={12} sm={6} md={4} justifySelf={'center'}>
          <Card
            sx={{
              display: 'flex',
              p: 2,
              boxShadow: '0px 0px 0px 1px #E0E0E0',
              borderRadius: '16px',
            }}
          >
            <Box>
              <IllusSms size={72} />
            </Box>
            <Box sx={{ ml: 2 }} alignSelf={'center'}>
              <Box>
                <Typography
                  fontSize={18}
                  fontWeight={700}
                  py={0}
                  px={0}
                  color="textPrimary"
                  sx={{
                    textAlign: 'left',
                  }}
                >
                  <strong>{t('common.devicemodel', { deviceModel: 'iPhone 12 Pro' })}</strong>
                </Typography>
              </Box>
              <Box>
                <Typography
                  fontSize={14}
                  fontWeight={400}
                  py={0}
                  px={0}
                  color="textPrimary"
                  sx={{
                    textAlign: 'left',
                  }}
                >
                  {t('lplogoutpostlogin.lastdateactivation', { date: '01/01/2022' })}
                </Typography>
              </Box>
            </Box>
          </Card>
        </Grid>
        */}
        <Grid item xs={12} mt={4}>
          <Button sx={{ mr: 2 }} variant="contained" onClick={handleLogout}>
            {t('common.logout')}
          </Button>
        </Grid>
      </Grid>
      <FAQ />
    </>
  );
};

export default SessionActiveComp;
