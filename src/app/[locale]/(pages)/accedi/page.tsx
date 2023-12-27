'use client';
import { Box, Button, Card, CardContent, Divider, Grid, Typography, Link } from '@mui/material';
import { CieIcon } from '@pagopa/mui-italia/dist/icons/CieIcon';
import { SpidIcon } from '@pagopa/mui-italia/dist/icons/SpidIcon';
import { useTranslations } from 'next-intl';
import { useEffect, useState } from 'react';
import { SpidLevels } from '../../_component/selectIdp/idpList';
import { SelectIdp } from '../../_component/selectIdp/selectIdp';
import useLocalePush from '../../_hooks/useLocalePush';
import { SpidValueInJWT } from '../../_model/JWTUser';
import { getLoginFlow, isBrowser, localeFromStorage } from '../../_utils/common';
import { extractToken, userFromJwtToken } from '../../_utils/jwt';
import { ROUTES } from '../../_utils/routes';
import { storageLoginInfoOps, storageTokenOps, storageUserOps } from '../../_utils/storage';
import { goCIE } from '../../_utils/idps';
import { checkElevationIntegrity } from '../../_utils/integrity';
import { trackEvent } from '../../_utils/mixpanel';

// eslint-disable-next-line max-lines-per-function
const Access = (): React.ReactElement => {
  const [openDialog, setOpenDialog] = useState<boolean>(false);
  const t = useTranslations('ioesco');
  const pushWithLocale = useLocalePush();
  const spidLevel: SpidLevels = {
    type: 'L2',
  };

  const token = isBrowser() ? extractToken() : undefined;
  const userFromToken = token ? userFromJwtToken(token) : undefined;
  const loginInfo = storageLoginInfoOps.read();

  const L1_JWT_LEVEL: SpidValueInJWT = {
    value: process.env.NEXT_PUBLIC_JWT_SPID_LEVEL_VALUE_L1,
  };

  const L2_JWT_LEVEL: SpidValueInJWT = {
    value: process.env.NEXT_PUBLIC_JWT_SPID_LEVEL_VALUE_L2,
  };

  const L3_JWT_LEVEL: SpidValueInJWT = {
    value: process.env.NEXT_PUBLIC_JWT_SPID_LEVEL_VALUE_L3,
  };

  useEffect(() => {
    if (isBrowser()) {
      trackEvent('IO_LOGIN');
    }
  }, [isBrowser()]);

  useEffect(() => {
    if (token && userFromToken && localeFromStorage) {
      storageTokenOps.write(token);
      storageUserOps.write(userFromToken);
      trackEvent('IO_LOGIN_SUCCESS', {
        SPID_IDP_ID: loginInfo.idpId,
        SPID_IDP_NAME: loginInfo.idpName,
        Flow: getLoginFlow(loginInfo),
      });
      // storageLoginInfoOps.delete();
      switch (userFromToken?.spidLevel) {
        case L1_JWT_LEVEL.value:
          pushWithLocale(ROUTES.LOGOUT_CONFIRM);
          break;
        case L2_JWT_LEVEL.value:
          pushWithLocale(ROUTES.PROFILE);
          break;
        case L3_JWT_LEVEL.value:
          pushWithLocale(ROUTES.PROFILE_RESTORE);
          if (checkElevationIntegrity()) {
            pushWithLocale(ROUTES.PROFILE_RESTORE);
          } else {
            pushWithLocale(ROUTES.PROFILE);
          }
          break;
      }
    }
  }, [localeFromStorage]);

  const handleLogoutBtn = () => {
    trackEvent('IO_SESSION_EXIT_START');
    pushWithLocale(ROUTES.LOGOUT_INIT);
  };

  const handleCIELogin = () => {
    trackEvent('IO_PROFILE_LOGIN_CIE');
    trackEvent('IO_LOGIN_START');
    goCIE(spidLevel);
  };

  const handleSPIDLogin = () => {
    trackEvent('IO_PROFILE_LOGIN_SPID');
    setOpenDialog(true);
  };

  return (
    <Grid container justifyContent="center" bgcolor="background.default">
      <Grid item xs={12} sm={7.2} md={8}>
        <Grid container direction={'column'} alignItems={'center'} pt={{ xs: 4, sm: 8, md: 20 }}>
          <Typography
            variant="h3"
            color="textPrimary"
            sx={{
              textAlign: 'center',
            }}
            mb={2}
          >
            {t('common.loginspidorcie')}
          </Typography>

          <Grid item justifyContent="center">
            <Typography
              variant="body1"
              color="textPrimary"
              sx={{
                textAlign: 'center',
              }}
              mb={{ xs: 4, md: 6 }}
              maxWidth={{ xs: '327px', sm: '330px', md: '480px' }}
            >
              {t('common.selectauthmethod')}
            </Typography>
          </Grid>

          <Grid item justifyContent="center" maxWidth="500px" mb={{ xs: 6, sm: 8, md: 16 }}>
            <Card
              sx={{
                boxShadow:
                  '0px 8px 10px -5px rgba(0, 43, 85, 0.1), 0px 16px 24px 2px rgba(0, 43, 85, 0.05), 0px 6px 30px 5px rgba(0, 43, 85, 0.1)',
                borderRadius: '16px',
                bgcolor: 'background.paper',
              }}
            >
              <CardContent sx={{ p: { xs: 3, md: 4 }, width: { sm: '276px', md: '416px' } }}>
                <Typography
                  color="textPrimary"
                  mb={{ xs: 2, md: 4 }}
                  sx={{
                    textAlign: 'center',
                  }}
                  component="h6"
                  variant="h6"
                >
                  {t('common.login')}
                </Typography>
                <Box display="flex" justifyContent="center" alignItems="center">
                  <Button
                    id="spidButton"
                    sx={{
                      borderRadius: '4px',
                      width: '100%',
                      height: '50px',
                    }}
                    onClick={() => handleSPIDLogin()}
                    variant="contained"
                    startIcon={<SpidIcon />}
                  >
                    {t('common.loginspid')}
                  </Button>
                </Box>
                <Box display="flex" justifyContent="center" alignItems="center">
                  <Button
                    sx={{
                      borderRadius: '4px',
                      width: '100%',
                      height: '50px',
                      marginTop: 2,
                    }}
                    variant="contained"
                    startIcon={<CieIcon />}
                    onClick={() => handleCIELogin()}
                  >
                    {t('common.logincie')}
                  </Button>
                </Box>
                <Divider sx={{ my: { xs: 2, md: 4 } }} variant="fullWidth" />
                <Grid
                  textAlign={'center'}
                  container
                  gap={1}
                  alignItems={'baseline'}
                  justifyContent={'center'}
                >
                  <Typography variant="body1">{t('lpaccess.nospidorcie')}</Typography>
                  <Typography variant="body1" color={'primary.dark'}>
                    <Link target="blank" href={'https://identitadigitale.gov.it'}>
                      {t('common.more')}
                    </Link>
                  </Typography>
                </Grid>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Grid>

      <Grid
        item
        bgcolor={'primary.dark'}
        xs={12}
        sm={4.8}
        md={4}
        py={{ xs: 4, sm: 0 }}
        px={{ xs: 3, md: 6 }}
      >
        <Grid item mb={2}>
          <Typography variant="h5" pt={{ md: 20, sm: 8 }} color="primary.contrastText">
            {t('common.lostdevice')}
          </Typography>
        </Grid>
        <Grid item>
          <Typography
            variant="body1"
            sx={{
              textAlign: 'left',
            }}
            mb={4}
            color={'primary.contrastText'}
          >
            {t('lpaccess.logout')}
          </Typography>
        </Grid>
        <Grid item mb={2}>
          <Button
            onClick={() => handleLogoutBtn()}
            variant="outlined"
            color="primary"
            size="large"
            sx={{
              backgroundColor: 'background.paper',
              '&:hover': {
                backgroundColor: '#ffffff',
              },
              color: 'primary',
            }}
          >
            {t('common.logout')}
          </Button>
        </Grid>
      </Grid>
      <SelectIdp
        isOpen={openDialog}
        spidLevel={spidLevel}
        onClose={(opn) => {
          setOpenDialog(opn);
        }}
      />
    </Grid>
  );
};

export default Access;
