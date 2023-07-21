'use client';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import { Card, CardContent, Divider, Grid, Tooltip, Typography } from '@mui/material';
import { ButtonNaked } from '@pagopa/mui-italia';
import { Introduction } from '../../_component/introduction/introduction';
import Firework from '../../_icons/firework';
import { commonBackground } from '../../_utils/styles';

const Profile = () => {
  const bgColor = 'background.paper';
  return (
    <Grid sx={commonBackground}>
      <Introduction
        title={'Ciao Mario!'}
        summary={
          'Qui trovi i tuoi dati anagrafici e di contatto utilizzati da app IO e le funzionalità di gestione degli accessi in app.'
        }
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
            <Typography variant="body2">Nome e Cognome</Typography>
            <Typography variant="sidenav">Mario Rossi</Typography>
          </Grid>
          <Divider />
          <Grid padding={3}>
            <Typography variant="body2">Indirizzo email</Typography>
            <Typography variant="sidenav">mario.rossi@gmail.com</Typography>
          </Grid>
        </Grid>

        <Grid item xs={12} sm={6} md={6} bgcolor={bgColor}>
          <Grid container>
            <Grid item xs={10} padding={3}>
              <Typography variant="body2">Accesso in app</Typography>
              <Typography variant="sidenav">Abilitato</Typography>
            </Grid>
            <Grid item xs={2} textAlign={'center'} alignSelf={'center'}>
              <Tooltip
                title={'L’accesso a IO è abilitato con tutte le tue identità digitali'}
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
              <Typography variant="body2">Sessione in app</Typography>
              <Typography variant="sidenav">Attiva fino al 08/06/2023</Typography>
            </Grid>
            <Grid xs={2} item textAlign={'center'} alignSelf={'center'}>
              <Tooltip
                title={'Fino al 08/06/2023 accedi a IO senza login SPID o CIE'}
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
        <Typography variant="h4">Cosa devi fare?</Typography>
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
                Ripristina accesso a IO
              </Typography>
              <Typography variant="body2" textAlign="center" px={5}>
                Hai messo in sicurezza la tua identità digitale? Ripristina l’accesso all’app IO.
              </Typography>

              <ButtonNaked
                href="/profileBlock"
                color="primary"
                endIcon={<ArrowForwardIcon />}
                size="medium"
                sx={{ py: '19px' }}
              >
                Ripristina accesso a IO
              </ButtonNaked>
              <Divider />
              <Typography variant="body2" padding={2}>
                Non hai il codice di ripristino?
              </Typography>
              <ButtonNaked
                href="/profileBlock"
                color="primary"
                size="medium"
                sx={{ textDecorationLine: 'underline' }}
              >
                Scopri cosa fare
              </ButtonNaked>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Profile;
