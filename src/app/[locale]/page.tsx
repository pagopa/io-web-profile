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
import { WebProfileApi } from '@/api/webProfileApiClient';
import { SessionState } from '@/api/generated/webProfile/SessionState';

const Profile = () => {
  const [profileData, setProfileData] = useState<ProfileData>();
  const [sessionData, setSessionData] = useState<SessionState>();
  const t = useTranslations('ioesco');
  const bgColor = 'background.paper';
  const userFromStorage = storageUserOps.read();

  useEffect(() => {
    WebProfileApi.getProfile()
      .then((res) => {
        setProfileData(res);
      })
      .catch((err) => {
        console.log(err);
      });

    WebProfileApi.getUserSessionState()
      .then((res) => {
        setSessionData(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <Grid sx={commonBackground}>
      <Introduction
        title={t('common.hello', { nome: userFromStorage?.name })}
        summary={t('profile.anagraphicinfo')}
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
                    : 'L’accesso a IO è bloccato con livello di sicurezza 2'
                }
                placement="top"
                arrow
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
                      date: sessionData?.session_info?.expiration_date.toLocaleDateString(),
                    })
                  : t('common.noactive')}
              </Typography>
            </Grid>
            <Grid xs={2} item textAlign={'center'} alignSelf={'center'}>
              <Tooltip
                title={
                  sessionData?.session_info.active
                    ? t('tooltip.accesswithoutidp', {
                        date: sessionData?.session_info?.expiration_date.toLocaleDateString(),
                      })
                    : t('tooltip.nosession')
                }
                placement="top"
                arrow
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
  );
};

export default Profile;
