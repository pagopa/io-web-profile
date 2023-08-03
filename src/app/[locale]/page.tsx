'use client';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import { Divider, Grid, Tooltip, Typography } from '@mui/material';
import { useTranslations } from 'next-intl';
import { Introduction } from './_component/introduction/introduction';
import { commonBackground } from './_utils/styles';
import ProfileCards from './_component/profileCards/profileCards';
// import ProfileCardsBlocked from './_component/profileCards/profileCardsBlocked';

const Profile = () => {
  const t = useTranslations('ioesco');
  const bgColor = 'background.paper';

  return (
    <Grid sx={commonBackground}>
      <Introduction
        title={t('common.hello', { nome: 'Mario' })}
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
            <Typography variant="sidenav">Mario Rossi</Typography>
          </Grid>
          <Divider />
          <Grid padding={3}>
            <Typography variant="body2">{t('common.emailaddress')}</Typography>
            <Typography variant="sidenav">mario.rossi@gmail.com</Typography>
          </Grid>
        </Grid>

        <Grid item xs={12} sm={6} md={6} bgcolor={bgColor}>
          <Grid container>
            <Grid item xs={10} padding={3}>
              <Typography variant="body2">{t('common.appaccess')}</Typography>
              <Typography variant="sidenav">Abilitato</Typography>
            </Grid>
            <Grid item xs={2} textAlign={'center'} alignSelf={'center'}>
              <Tooltip title={t('common.tooltipaccessabled')} placement="top" arrow>
                <HelpOutlineIcon color="primary" />
              </Tooltip>
            </Grid>
          </Grid>

          <Divider />

          <Grid container>
            <Grid xs={10} item padding={3}>
              <Typography variant="body2">{t('common.appsession')}</Typography>
              <Typography variant="sidenav">
                {t('common.activeduedate', { date: '01/01/1970' })}
              </Typography>
            </Grid>
            <Grid xs={2} item textAlign={'center'} alignSelf={'center'}>
              <Tooltip
                title={t('tooltip.accesswithoutidp', { date: '01/01/1970' })}
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
      <ProfileCards />
      {/* <ProfileCardsBlocked /> */}
    </Grid>
  );
};

export default Profile;
