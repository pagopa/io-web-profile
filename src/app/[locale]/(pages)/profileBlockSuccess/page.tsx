'use client';
import { Button, Grid, Link, List, ListItem, Typography } from '@mui/material';
import { useTranslations } from 'next-intl';
import { BackButton } from '../../_component/backButton/backButton';
import { CopyCodeCard } from '../../_component/coppyCodeCard/copyCodeCard';
import { IdpListOnApp } from '../../_component/idpListOnApp/idpListOnApp';
import { Introduction } from '../../_component/introduction/introduction';
import { isIDPKnown } from '../../_utils/idps';
import { commonBackgroundWithBack } from '../../_utils/styles';

const ProfileBlock = (): React.ReactElement => {
  const t = useTranslations('ioesco');
  return (
    <Grid sx={commonBackgroundWithBack}>
      <BackButton />
      <Introduction
        title={'L’accesso a IO è stato bloccato'}
        summary={
          <>
            Da questo momento è stato bloccato l’accesso in app IO con tutte le tue identità di
            livello 2. <br /> <br /> Per ripristinare l’accesso ti verrà richiesto il
            <strong> codice di ripristino</strong>, assicurati di salvarlo e tenerlo al sicuro!
          </>
        }
        summaryColumns={{ xs: 12, md: 8 }}
      />
      <CopyCodeCard code={'000 000 000'} />

      {isIDPKnown && <IdpListOnApp />}

      <Typography variant="h6" my={3}>
        {t('common.howrestoreprofile')}
      </Typography>
      <Typography>Per sbloccare l’accesso in app IO segui questi passaggi:</Typography>
      <List
        sx={{
          listStyleType: 'square',
          marginBottom: '42px',
          padding: '8px',
        }}
      >
        <ListItem>
          <Typography sx={{ display: 'list-item' }}>
            Vai sul sito{' '}
            <Link href="#" color="textPrimary">
              io.italia.it
            </Link>
          </Typography>
        </ListItem>
        <ListItem>
          <Typography sx={{ display: 'list-item' }}>
            Accedi con le tue credenziali SPID o CIE
          </Typography>
        </ListItem>
        <ListItem>
          <Typography sx={{ display: 'list-item' }}>
            Vai alla sezione <i>Ripristina accesso a IO</i>
          </Typography>
        </ListItem>
        <ListItem>
          <Typography sx={{ display: 'list-item' }}>
            Segui i passaggi e quando richiesto inserisci il <strong>codice di ripristino</strong>
          </Typography>
        </ListItem>
      </List>

      <Button href={'/profileAccessBlocked'} variant="outlined" size="medium">
        {t('common.backtoprofile')}
      </Button>
    </Grid>
  );
};

export default ProfileBlock;
