'use client';
import { Box, Button, Divider, Grid, Typography } from '@mui/material';
import { CieIcon } from '@pagopa/mui-italia/dist/icons/CieIcon';
import { SpidIcon } from '@pagopa/mui-italia/dist/icons/SpidIcon';
import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { ROUTES } from '../../_utils/routes';

const Access = (): React.ReactElement => {
  const t = useTranslations('access');

  return (
    <Grid
      container
      direction={{ xs: 'row', md: 'row-reverse' }}
      justifyContent="center"
      bgcolor={'#FAFAFA'}
    >
      <Grid bgcolor={'primary.dark'} height={773} item xs={12} md={4} pl={10} pr={5}>
        <Grid item mb={2}>
          <Typography variant="h6" pt={20} color="primary.contrastText">
            {t('title')}
          </Typography>
        </Grid>
        <Grid item>
          <Typography
            variant="body1"
            sx={{
              textAlign: 'left',
            }}
            mb={2}
            color={'primary.contrastText'}
          >
            Esci da IO per mantenere al sicuro i tuoi dati e i contenuti a te dedicati
          </Typography>
        </Grid>
        <Grid item mb={2}>
          <Link href={ROUTES.LOGOUT_INIT}>
            <Button
              variant="outlined"
              sx={{
                backgroundColor: 'background.paper',
                '&:hover': {
                  backgroundColor: '#ffffff',
                },
              }}
            >
              Esci da IO
            </Button>
          </Link>
        </Grid>
      </Grid>

      <Grid item xs={12} md={8}>
        <Grid container direction={'column'} height={773} alignItems={'center'} pt={20}>
          <Typography
            variant="h3"
            color="textPrimary"
            sx={{
              textAlign: 'center',
            }}
            mb={2}
          >
            Entra con SPID o CIE
          </Typography>

          <Grid item justifyContent="center">
            <Typography
              variant="body1"
              color="textPrimary"
              sx={{
                textAlign: 'center',
              }}
              mb={6}
            >
              Seleziona la modalità di accesso che preferisci e inizia il <br /> processo di
              adesione al prodotto nomeProdotto.
            </Typography>
          </Grid>

          <Grid item justifyContent="center" width={'500px'}>
            <Box
              sx={{
                boxShadow:
                  '0px 8px 10px -5px rgba(0, 43, 85, 0.1), 0px 16px 24px 2px rgba(0, 43, 85, 0.05), 0px 6px 30px 5px rgba(0, 43, 85, 0.1)',
                borderRadius: '16px',
                p: 4,
                bgcolor: 'background.paper',
              }}
            >
              <Typography
                color="textPrimary"
                mb={4}
                sx={{
                  textAlign: 'center',
                }}
                component="h6"
                variant="h6"
              >
                Accedi
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
                  Entra con SPID
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
                  Entra con CIE
                </Button>
              </Box>
              <Divider sx={{ marginTop: 4, marginBottom: 3 }} variant="fullWidth" />
              <Grid
                textAlign={'center'}
                container
                gap={1}
                alignItems={'baseline'}
                justifyContent={'center'}
              >
                <Typography variant="body1"> Non hai SPID o CIE?</Typography>
                <Typography variant="body1" color={'primary.dark'}>
                  <Link href={'#'}>Scopri di più</Link>
                </Typography>
              </Grid>
            </Box>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Access;
