/* eslint-disable no-console */
'use client';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import { Divider, Grid, Tooltip, Typography } from '@mui/material';
import { useTranslations } from 'next-intl';
import { useEffect, useState } from 'react';
import { ProfileData } from '../../api/generated/webProfile/ProfileData';
import { Introduction } from './_component/introduction/introduction';
import { ProfileCards } from './_component/profileCards/profileCards';
import { RestoreSessionCard } from './_component/profileCards/restoreSessionCard';
import { commonBackground } from './_utils/styles';
import { storageUserOps } from './_utils/storage';
import { NoProfile } from './_component/noProfile/noProfile';
import { trackEvent } from './_utils/mixpanel';
import { getAccessStatus, getSessionStatus, localeFromStorage } from './_utils/common';
import useLocalePush from './_hooks/useLocalePush';
import { ROUTES } from './_utils/routes';
import Loader from './_component/loader/loader';
import useFetch, { WebProfileApi } from '@/api/webProfileApiClient';
import { SessionState } from '@/api/generated/webProfile/SessionState';

const Profile = () => {
  const [profileData, setProfileData] = useState<ProfileData>();
  const [sessionData, setSessionData] = useState<SessionState>();
  const [isProfileAvailable, setIsProfileAvailable] = useState<boolean | undefined>();
  const t = useTranslations('ioesco');
  const bgColor = 'background.paper';
  const userFromStorage = storageUserOps.read();
  const pushWithLocale = useLocalePush();
  const { callFetchWithRetries, isLoading } = useFetch();

  useEffect(() => {
    if (sessionData) {
      trackEvent('IO_PROFILE', {
        session_status: getSessionStatus(sessionData),
        access_status: getAccessStatus(sessionData),
        event_category: 'UX',
        event_type: 'screen_view',
      });
    }
  }, [profileData, sessionData]);

  useEffect(() => {
    callFetchWithRetries(WebProfileApi, 'getProfile', [], [500])
      .then(res => {
        setProfileData(res);
        if (res === 404) {
          setIsProfileAvailable(false);
        } else {
          setIsProfileAvailable(true);
        }
      })
      .catch(() => pushWithLocale(ROUTES.INTERNAL_ERROR));
  }, [callFetchWithRetries, pushWithLocale]);

  useEffect(() => {
    if (isProfileAvailable) {
      callFetchWithRetries(WebProfileApi, 'getUserSessionState', [], [500])
        .then(res => {
          setSessionData(res);
        })
        .catch(() => pushWithLocale(ROUTES.INTERNAL_ERROR));
    }
  }, [callFetchWithRetries, isProfileAvailable, pushWithLocale]);

  if (isLoading) {
    return <Loader />;
  }
  return (
    <>
      {isProfileAvailable === false ? (
        <NoProfile />
      ) : (
        <Grid sx={commonBackground}>
          <Introduction
            title={t('common.hello', { nome: userFromStorage?.name })}
            summary={t('common.anagraphicinfo')}
            summaryColumns={{
              xs: 12,
              md: 8,
            }}
          />
          <Typography variant="h5" my={2}>
            {t('common.yourprofile')}
          </Typography>
          <Grid container gap={2} mb={2} flexWrap={{ xs: 'wrap', sm: 'nowrap', md: 'nowrap' }}>
            <Grid item xs={12} sm={6} md={6} bgcolor={bgColor}>
              <Grid padding={3}>
                <Typography variant="body2">{t('common.namesurname')}</Typography>
                <Typography variant="sidenav">{`${userFromStorage?.name} ${userFromStorage?.surname}`}</Typography>
              </Grid>
              <Divider />
              <Grid padding={3}>
                <Typography variant="body2">{t('common.emailaddress')}</Typography>
                <Typography variant="sidenav">{profileData?.email}</Typography>
              </Grid>
            </Grid>

            <Grid item xs={12} sm={6} md={6} bgcolor={bgColor}>
              <Grid container>
                <Grid item xs={10} padding={3}>
                  <Typography variant="body2">{t('common.appaccess')}</Typography>
                  <Typography variant="sidenav">
                    {sessionData?.access_enabled ? t('common.abled') : t('common.locked')}
                  </Typography>
                </Grid>
                <Grid item xs={2} textAlign={'center'} alignSelf={'center'}>
                  <Tooltip
                    title={
                      sessionData?.access_enabled
                        ? t('common.tooltipaccessabled')
                        : t('lockaccess.tooltiplockaccess')
                    }
                    placement="top"
                    arrow
                    enterTouchDelay={0}
                    leaveTouchDelay={10000}
                  >
                    <HelpOutlineIcon color="primary" />
                  </Tooltip>
                </Grid>
              </Grid>

              <Divider />

              <Grid container>
                <Grid xs={10} item padding={3}>
                  <Typography variant="body2">{t('common.appsession')}</Typography>
                  <Typography variant="sidenav">
                    {sessionData?.session_info.active
                      ? t('common.activeduedate', {
                          date: sessionData?.session_info?.expiration_date.toLocaleDateString(
                            localeFromStorage
                          ),
                        })
                      : t('common.noactive')}
                  </Typography>
                </Grid>
                <Grid xs={2} item textAlign={'center'} alignSelf={'center'}>
                  <Tooltip
                    title={
                      sessionData?.session_info.active
                        ? t('tooltip.accesswithoutidp', {
                            date: sessionData?.session_info?.expiration_date.toLocaleDateString(
                              localeFromStorage
                            ),
                          })
                        : t('tooltip.nosession')
                    }
                    placement="top"
                    arrow
                    enterTouchDelay={0}
                    leaveTouchDelay={10000}
                  >
                    <HelpOutlineIcon color="primary" />
                  </Tooltip>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
          <Grid item pb={3} mt={6} xs={12} md={12} textAlign={'center'}>
            <Typography variant="h4">{t('common.whatdo')}</Typography>
          </Grid>

          {sessionData?.access_enabled === true && (
            <ProfileCards sessionIsActive={sessionData?.session_info?.active} />
          )}
          {sessionData?.access_enabled === false && <RestoreSessionCard />}
        </Grid>
      )}
    </>
  );
};

export default Profile;
