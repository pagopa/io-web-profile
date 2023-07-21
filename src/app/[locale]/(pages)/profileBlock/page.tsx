'use client';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Button, Grid, Typography } from '@mui/material';
import { ButtonNaked } from '@pagopa/mui-italia';
import { IdpListOnApp } from '../../_component/idpListOnApp/idpListOnApp';
import { Introduction } from '../../_component/introduction/introduction';
import { commonBackgroundWithBack } from '../../_utils/styles';

const ProfileBlock = (): React.ReactElement => {
  // eslint-disable-next-line no-console
  console.log('');
  return (
    <Grid sx={commonBackgroundWithBack}>
      <ButtonNaked
        href="/profile"
        startIcon={<ArrowBackIcon />}
        color="primary"
        sx={{ marginBottom: '41px' }}
      >
        Torna al profilo
      </ButtonNaked>
      <Introduction
        title={'Vuoi bloccare l’accesso a IO?'}
        summary={
          'Hai effettuato l’accesso in app IO con le seguenti identità, se sospetti che una di queste sia stata compromessa blocca l’accesso all’app per mantenere i tuoi dati al sicuro. '
        }
        summaryColumns={{ xs: 12, md: 8 }}
      />
      <Typography variant="overline" color={'textSecondary'}>
        Le tue identitÀ SU APP IO:
      </Typography>

      <IdpListOnApp />
      <Typography my={5}>
        Bloccando l’accesso non potrai più entrare in app IO con tutte le tue identità di livello 2.
        Dopo aver messo in sicurezza la tua identità digitale potrai sbloccare l’accesso a IO.
      </Typography>

      <Button variant="contained" size="medium">
        Blocca l’accesso a IO
      </Button>
    </Grid>
  );
};

export default ProfileBlock;
