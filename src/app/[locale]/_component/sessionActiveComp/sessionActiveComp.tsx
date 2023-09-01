'use client';

import { Button, Grid } from '@mui/material';
import { useTranslations } from 'next-intl';
import useLocalePush from '../../_hooks/useLocalePush';
import { ROUTES } from '../../_utils/routes';
import { commonBackgroundLight, commonBackgroundLightWithBack } from '../../_utils/styles';
import { FAQ } from '../accordion/faqDefault';
import { BackButton } from '../backButton/backButton';
import { Introduction } from '../introduction/introduction';
import { WebProfileApi } from '@/api/webProfileApiClient';

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
  const t = useTranslations('ioesco');
  const pushWithLocale = useLocalePush();

  const handleLogout = () => {
    WebProfileApi.logoutFromIOApp()
      .then(() => {
        pushWithLocale(ROUTES.THANK_YOU);
      })
      .catch((_err) => {
        pushWithLocale(ROUTES.LOGOUT_KO);
      });
  };
  return (
    <>
      <Grid sx={showArrowBackBtn ? commonBackgroundLightWithBack : commonBackgroundLight} container>
        {showArrowBackBtn && <BackButton />}
        <Grid item xs={12} justifySelf={'center'}>
          <Introduction
            title={title}
            summary={`Al momento hai una sessione attiva sull’app IO, valida fino al ${expirationDate.toLocaleDateString()} Se hai perso il dispositivo, termina la sessione. Potrai poi accedere nuovamente da qualsiasi altro dispositivo.`}
            summaryColumns={{ xs: 12, md: 6 }}
          />
        </Grid>
        {/*
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
