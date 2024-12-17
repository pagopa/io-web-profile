'use client';
import { Box, Button, Card, CardContent, Divider, Grid, Typography, Link } from '@mui/material';
import { CieIcon } from '@pagopa/mui-italia/dist/icons/CieIcon';
import { SpidIcon } from '@pagopa/mui-italia/dist/icons/SpidIcon';
import { useTranslations } from 'next-intl';
import { useCallback, useEffect, useState } from 'react';
import { SpidLevels } from '../../_component/selectIdp/idpList';
import { SelectIdp } from '../../_component/selectIdp/selectIdp';
import useLocalePush from '../../_hooks/useLocalePush';
import { FLOW_PARAMS, getLoginFlow, isBrowser, localeFromStorage } from '../../_utils/common';
import { extractToken, parseJwt, userFromJwtToken } from '../../_utils/jwt';
import { ROUTES } from '../../_utils/routes';
import { storageLoginInfoOps, storageTokenOps, storageUserOps } from '../../_utils/storage';
import { goCIE } from '../../_utils/idps';
import { checkElevationIntegrity } from '../../_utils/integrity';
import { trackEvent } from '../../_utils/mixpanel';
import Loader from '../../_component/loader/loader';

const Access = (): React.ReactElement => {
  const [openDialog, setOpenDialog] = useState<boolean>(false);
  const t = useTranslations('ioesco');
  const pushWithLocale = useLocalePush();
  const spidLevel: SpidLevels = {
    type: 'L2',
  };

  const token = isBrowser() ? extractToken() : undefined;
  const userFromToken = token && parseJwt(token) ? userFromJwtToken(token) : undefined;
  const loginInfo = storageLoginInfoOps.read();

  // Function to replace the origin and redirect the user to the modified URL
  const replaceOriginAndRedirect = useCallback(() => {
    // Retrieve the current URL from the browser window
    const currentUrl = window.location.href;

    try {
      // Create a URL object to safely manipulate the URL components
      const url = new URL(currentUrl);

      // Check if the current origin is "https://ioapp.it" or "http://localhost:3000"
      if (url.origin === 'https://ioapp.it' || url.origin === 'http://localhost:3000') {
        // Modify the host property of the URL object to update the origin
        // eslint-disable-next-line functional/immutable-data
        if (url.origin === 'https://ioapp.it') {
          // If the origin is the production domain, replace it with "account.ioapp.it"
          // eslint-disable-next-line functional/immutable-data
          url.host = 'account.ioapp.it';
        } else {
          // If the origin is localhost, replace it with "sub.localhost:3000" (testing scenario)
          // eslint-disable-next-line functional/immutable-data
          url.host = 'sub.localhost:3000';
        }

        // Reassign the modified URL, which triggers a redirect to the new URL
        window.location.assign(url.href);
      } else {
        // If the origin does not match the expected domains, redirect to the error route
        pushWithLocale(ROUTES.ERROR);
      }
    } catch (error) {
      // Handle any errors that may occur during URL manipulation
      pushWithLocale(ROUTES.ERROR); // Redirect to the error route
      console.error('Error while manipulating the URL:', error);
    }
  }, [pushWithLocale]);

  useEffect(() => {
    if (isBrowser()) {
      trackEvent('IO_LOGIN', { event_category: 'UX', event_type: 'screen_view' });
    }
  }, []);

  useEffect(() => {
    if (token && userFromToken && localeFromStorage) {
      storageTokenOps.write(token);
      storageUserOps.write(userFromToken);
      if (loginInfo) {
        trackEvent('IO_LOGIN_SUCCESS', {
          SPID_IDP_ID: loginInfo.idpId,
          SPID_IDP_NAME: loginInfo.idpName,
          Flow: getLoginFlow(loginInfo),
          event_category: 'TECH',
        });

        switch (getLoginFlow(loginInfo)) {
          case FLOW_PARAMS.FLOW_SESSION_EXIT:
            pushWithLocale(ROUTES.LOGOUT_CONFIRM);
            break;
          case FLOW_PARAMS.FLOW_PROFILE:
            pushWithLocale(ROUTES.PROFILE);
            break;
          case FLOW_PARAMS.FLOW_UNLOCK_ACCESS_L3:
          case FLOW_PARAMS.FLOW_UNLOCK_ACCESS_L2:
            if (checkElevationIntegrity()) {
              pushWithLocale(ROUTES.PROFILE_RESTORE);
            } else {
              pushWithLocale(ROUTES.PROFILE);
            }
            break;
        }
      } else {
        replaceOriginAndRedirect();
      }
    }
    storageLoginInfoOps.delete();
  }, [loginInfo, pushWithLocale, replaceOriginAndRedirect, token, userFromToken]);

  const handleLogoutBtn = () => {
    trackEvent('IO_SESSION_EXIT_START', { event_category: 'UX', event_type: 'action' });
    pushWithLocale(ROUTES.LOGOUT_INIT);
  };

  const handleCIELogin = () => {
    trackEvent('IO_PROFILE_LOGIN_CIE', { event_category: 'UX', event_type: 'action' });
    goCIE(spidLevel, ROUTES.LOGIN);
  };

  const handleSPIDLogin = () => {
    trackEvent('IO_PROFILE_LOGIN_SPID', { event_category: 'UX', event_type: 'action' });
    setOpenDialog(true);
  };

  if (token && userFromToken && localeFromStorage) {
    return <Loader />;
  }

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
              {t('lpaccess.selectauthmethod')}
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
        onClose={opn => {
          setOpenDialog(opn);
        }}
        currentPage={ROUTES.LOGIN}
      />
    </Grid>
  );
};

export default Access;
