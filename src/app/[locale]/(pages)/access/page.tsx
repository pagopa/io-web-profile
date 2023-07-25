'use client';
import { Box, Button, Card, CardContent, Divider, Grid, Typography } from '@mui/material';
import { CieIcon } from '@pagopa/mui-italia/dist/icons/CieIcon';
import { SpidIcon } from '@pagopa/mui-italia/dist/icons/SpidIcon';
import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { ROUTES } from '../../_utils/routes';

const Access = (): React.ReactElement => {
  const t = useTranslations('ioesco');

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
                    // onClick={() => setShowIDPS(true)}
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
                    // onClick={() => goCIE()}
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
                  <Typography variant="body1">{t('common.nothavespid')}</Typography>
                  <Typography variant="body1" color={'primary.dark'}>
                    <Link href={'#'}>{t('common.more')}</Link>
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
          <Link href={ROUTES.LOGOUT_INIT}>
            <Button
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
          </Link>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Access;
