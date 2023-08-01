'use client';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import { Card, CardContent, Divider, Grid, Tooltip, Typography } from '@mui/material';
import { ButtonNaked } from '@pagopa/mui-italia';
import { useTranslations } from 'next-intl';
import { Introduction } from '../../_component/introduction/introduction';
import Firework from '../../_icons/firework';
import { ROUTES } from '../../_utils/routes';
import { commonBackground } from '../../_utils/styles';

const Profile = () => {
  const t = useTranslations('ioesco');
  const bgColor = 'background.paper';
  return (
    <Grid sx={commonBackground}>
      <Introduction
        title={t('common.hello', { nome: 'Mario' })}
        summary={t('common.anagraphicinfo')}
        summaryColumns={{
          xs: 12,
          md: 8,
        }}
      />

      <Typography variant="h5" my={2}>
        Il tuo profilo
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
              <Typography variant="sidenav">Attiva fino al 08/06/2023</Typography>
            </Grid>
            <Grid xs={2} item textAlign={'center'} alignSelf={'center'}>
              <Tooltip title={t('tooltip.accesswithoutidp')} placement="top" arrow>
                <HelpOutlineIcon color="primary" />
              </Tooltip>
            </Grid>
          </Grid>
        </Grid>
      </Grid>

      <Grid item pb={3} mt={6} xs={12} md={12} textAlign={'center'}>
        <Typography variant="h4">{t('common.whatdo')}</Typography>
      </Grid>

      <Grid container flexDirection="column" justifyContent="center" alignItems="center">
        <Grid item textAlign={'center'}>
          <Card
            sx={{
              backgroundColor: bgColor,
              padding: '8px',
              boxShadow: '0px 8px 38px 7px #002B551A',
              borderRadius: '16px',
              maxWidth: '364px',
            }}
          >
            <CardContent>
              <Firework />
              <Typography variant="h6" py={2}>
                {t('common.restoreioaccess')}
              </Typography>
              <Typography variant="body2" textAlign="center" px={5}>
                {t('common.identitysecurityrestore')}
              </Typography>

              <ButtonNaked
                href={ROUTES.PROFILE_RESTORE}
                color="primary"
                endIcon={<ArrowForwardIcon />}
                size="medium"
                sx={{ py: '19px' }}
              >
                {t('common.restoreioaccess')}
              </ButtonNaked>
              <Divider />
              <Typography variant="body2" padding={2}>
                {t('common.norestorecode')}
              </Typography>
              <ButtonNaked
                href={ROUTES.LOGIN_L3}
                color="primary"
                size="medium"
                sx={{ textDecorationLine: 'underline' }}
              >
                {t('common.findwhatdo')}
              </ButtonNaked>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Profile;
