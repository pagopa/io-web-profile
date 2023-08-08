'use client';

import { Box, Button, Card, Grid, Typography } from '@mui/material';
import { IllusSms } from '@pagopa/mui-italia';
import { useTranslations } from 'next-intl';
import { useRouter } from 'next-intl/client';
import { FAQ } from '../../../_component/accordion/faqDefault';
import { Introduction } from '../../../_component/introduction/introduction';
import { ROUTES } from '../../../_utils/routes';
import { commonBackgroundLight } from '../../../_utils/styles';
import { WebProfileApi } from '@/api/webProfileApiClient';
import { localeFromStorage } from '@/app/[locale]/_utils/common';

const Session = (): React.ReactElement => {
  const t = useTranslations('ioesco');
  const router = useRouter();
  const handleLogout = () => {
    WebProfileApi.logoutFromIOApp()
      .then(() => {
        router.push(ROUTES.THANK_YOU, { locale: localeFromStorage });
      })
      .catch((_err) => {
        router.push(ROUTES.LOGOUT_KO, { locale: localeFromStorage });
      });
  };
  return (
    <>
      <Grid sx={commonBackgroundLight} container>
        <Grid item xs={12} justifySelf={'center'}>
          <Introduction
            title={t('profilelogout.logout')}
            summary={
              <>
                <span>
                  {t.rich('lplogoutpostlogin.activesession', {
                    deviceModel: 'iPhone 12 Pro',
                    strong: (chunks) => <strong>{chunks}</strong>,
                  })}
                </span>
              </>
            }
            summaryColumns={{ xs: 12, md: 6 }}
          />
        </Grid>

        <Grid item xs={12} justifySelf={'center'}>
          <Card
            sx={{
              display: 'flex',
              p: 2,
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

export default Session;
