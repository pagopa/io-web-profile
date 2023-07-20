'use client';
import { Button, Grid, Typography } from '@mui/material';
import Link from 'next/link';
import { FAQ } from '../../_component/accordion/faqDefault';
import { BackButton } from '../../_component/backButton/backButton';
import { IdpListOnApp } from '../../_component/idpListOnApp/idpListOnApp';
import { Introduction } from '../../_component/introduction/introduction';
import { commonBackgroundWithBack } from '../../_utils/styles';

const RestoreProfile = (): React.ReactElement => (
  <>
    <Grid sx={commonBackgroundWithBack}>
      <BackButton />
      <Introduction
        title={"Vuoi ripristinare l'accesso a IO?"}
        summary={
          "Se hai messo in sicurezza la tua identità digitale puoi ripristinare l'accesso a IO e entrare nuovamente in app con tutte le tue identità."
        }
        summaryColumns={{ xs: 12, md: 8 }}
      />

      <IdpListOnApp />
      <Typography my={5}>
        Per ripristinare l'accesso all'app IO ti serve il <b>codice sblocco</b> fornito in fase di blocco.
      </Typography>

      <Link href="/restoreCode">
        <Button variant="contained" size="medium">
          Ripristina accesso a IO
        </Button>
      </Link>
    </Grid>
    <FAQ flow='RESTORE' />
  </>
);

export default RestoreProfile;
