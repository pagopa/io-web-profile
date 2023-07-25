'use client';
import { Button, Grid, Typography } from '@mui/material';
import { FAQ } from '../../_component/accordion/faqDefault';
import { BackButton } from '../../_component/backButton/backButton';
import { IdpListOnApp } from '../../_component/idpListOnApp/idpListOnApp';
import { Introduction } from '../../_component/introduction/introduction';
import { isIDPKnown } from '../../_utils/idps';
import { commonBackgroundLightWithBack } from '../../_utils/styles';
import { renderSummary } from './utils';

const ProfileBlock = (): React.ReactElement => (
  <>
    <Grid sx={commonBackgroundLightWithBack}>
      <BackButton />
      <Introduction
        title={'Vuoi bloccare l’accesso a IO?'}
        summary={renderSummary(isIDPKnown)}
        summaryColumns={{ xs: 12, md: 7.5 }}
      />
      <Grid sx={{ maxWidth: '576px' }}>
        {isIDPKnown && <IdpListOnApp />}
        <Typography mb={5}>
          Bloccando l’accesso non potrai più entrare in app IO con tutte le tue identità di livello
          2. Dopo aver messo in sicurezza la tua identità digitale potrai sbloccare l’accesso a IO.
        </Typography>
        <Button href="/profileBlockSuccess" variant="contained" size="medium">
          Blocca l’accesso a IO
        </Button>
      </Grid>
    </Grid>
    <FAQ />
  </>
);

export default ProfileBlock;
