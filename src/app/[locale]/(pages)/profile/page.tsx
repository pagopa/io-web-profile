'use client';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import { Card, CardContent, Divider, Grid, Tooltip, Typography } from '@mui/material';
import { ButtonNaked } from '@pagopa/mui-italia';
import Link from 'next/link';
import { Introduction } from '../../_component/introduction/introduction';
import HourglassIcon from '../../_icons/hourglass';
import QuestionIcon from '../../_icons/question';
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
      <Grid container gap={2} mb={2} flexWrap={'nowrap'}>
        <Grid item xs={6} bgcolor={bgColor}>
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

        <Grid item xs={6} bgcolor={bgColor}>
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

      <Grid container gap={2} flexWrap={'nowrap'}>
        <Grid item xs={1}></Grid>
        <Grid item xs={5} textAlign={'center'}>
          <Card
            sx={{
              backgroundColor: bgColor,
              padding: '32px',
              boxShadow: '0px 8px 38px 7px #002B551A',
              borderRadius: '16px',
            }}
          >
            <CardContent>
              <QuestionIcon />
              <Typography variant="h6" pt={2}>
                Esci da IO
              </Typography>
              <Typography variant="body2" padding={2}>
                Non hai più il tuo dispositivo ed era collegato all’app IO? Tieni al sicuro i tuoi
                dati e scollega il tuo account.
              </Typography>
              <Link href={'/session'}>
                <ButtonNaked color="primary" endIcon={<ArrowForwardIcon />} size="medium">
                  Esci da IO
                </ButtonNaked>
              </Link>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={5} textAlign={'center'}>
          <Card
            sx={{
              backgroundColor: bgColor,
              padding: '32px',
              boxShadow: '0px 8px 38px 7px #002B551A',
              borderRadius: '16px',
            }}
          >
            <CardContent>
              <HourglassIcon />
              <Typography variant="h6" pt={2}>
                Blocca l’accesso a IO
              </Typography>
              <Typography variant="body2" padding={2}>
                Sospetti che la tua identità digitale sia stata compromessa? Blocca l’accesso
                all’app IO.
              </Typography>
              <Link href={'#'}>
                <ButtonNaked color="primary" endIcon={<ArrowForwardIcon />} size="medium">
                  Blocca accesso a IO
                </ButtonNaked>
              </Link>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={1}></Grid>
      </Grid>
    </Grid>
  );
};

export default Profile;
