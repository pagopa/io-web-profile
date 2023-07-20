'use client';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Button, Grid, Link, List, ListItem, Typography } from '@mui/material';
import { ButtonNaked } from '@pagopa/mui-italia';
import { CopyCodeCard } from '../../_component/coppyCodeCard/copyCodeCard';
import { IdpListOnApp } from '../../_component/idpListOnApp/idpListOnApp';
import { Introduction } from '../../_component/introduction/introduction';
import { commonBackgroundWithBack } from '../../_utils/styles';

const ProfileBlock = (): React.ReactElement => {
  const isIDPKnown = true;

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
        title={'L’accesso a IO è stato bloccato'}
        summary={
          <>
            Da questo momento è stato bloccato l’accesso in app IO con tutte le <br /> tue identità
            di livello 2. Per ripristinare l’accesso ti verrà richiesto il
            <br />
            <strong>codice di ripristino</strong>, assicurati di salvarlo e tenerlo al sicuro!
          </>
        }
        summaryColumns={{ xs: 12, md: 8 }}
      />
      <CopyCodeCard code={'000 000 000'} />

      {isIDPKnown && <IdpListOnApp />}

      <Typography variant="h6" my={5}>
        Come posso ripristinare l’accesso a IO?
      </Typography>
      <Typography mt={5}>Per sbloccare l’accesso in app IO segui questi passaggi:</Typography>
      <List
        sx={{
          listStyleType: 'disc',
          listStylePosition: 'inside',
          marginBottom: '42px',
        }}
      >
        <ListItem sx={{ display: 'list-item' }}>
          Vai sul sito{' '}
          <Link href="#" color={'textPrimary'}>
            io.italia.it
          </Link>
        </ListItem>
        <ListItem sx={{ display: 'list-item' }}>Accedi con le tue credenziali SPID o CIE</ListItem>
        <ListItem sx={{ display: 'list-item' }}>
          Vai alla sezione <i>Ripristina accesso a IO</i>
        </ListItem>
        <ListItem sx={{ display: 'list-item' }}>
          Segui i passaggi e quando richiesto inserisci il <strong>codice di ripristino</strong>
        </ListItem>
      </List>

      <Button href={'/profile'} variant="outlined" size="medium">
        Torna al profilo
      </Button>
    </Grid>
  );
};

export default ProfileBlock;
