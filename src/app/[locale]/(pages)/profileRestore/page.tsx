'use client';
import { Button, Grid, Typography } from '@mui/material';
import Link from 'next/link';
import { FAQ } from '../../_component/accordion/faqDefault';
import { BackButton } from '../../_component/backButton/backButton';
import { IdpListOnApp } from '../../_component/idpListOnApp/idpListOnApp';
import { Introduction } from '../../_component/introduction/introduction';
import { commonBackgroundWithBack } from '../../_utils/styles';
import { ROUTES } from '../../_utils/routes';

const RestoreProfile = (): React.ReactElement => (
  <>
    <Grid sx={commonBackgroundWithBack} xs={12} sm={12}>
      <BackButton />
      <Introduction
        title={"Vuoi ripristinare l'accesso a IO?"}
        summary={
          "Se hai messo in sicurezza la tua identità digitale puoi ripristinare l'accesso a IO e entrare nuovamente in app con tutte le tue identità."
        }
        summaryColumns={{ xs: 12, md: 7.5 }}
      />

      <Grid container flexDirection={'column'}>
        <IdpListOnApp />
        <Grid item sm={10} md={7}>
          <Typography mb={5} fontSize={'20px'}>
            Per ripristinare l&apos;accesso all&apos;app IO ti serve il <b>codice sblocco</b>
            fornito in fase di blocco.
          </Typography>
        </Grid>
        <Link href={ROUTES.RESTORE_CODE}>
          <Button variant="contained" size="medium">
            Ripristina accesso a IO
          </Button>
        </Link>
      </Grid>
    </Grid>
    <FAQ flow="RESTORE" />
  </>
);

export default RestoreProfile;
