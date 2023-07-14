'use client';

import { Grid, Button } from '@mui/material';
import Link from 'next/link';
import { Introduction } from '../../../_component/introduction/introduction';
import { commonBackground } from '../../../_utils/utils';
import { FAQDefault } from '../../../_component/accordion/faqDefault';

const L1NoSession = (): React.ReactElement => (
  <>
    <Grid sx={commonBackground} container>
      <Grid item xs={12} justifySelf={'center'}>
        <Introduction
          title={'Ciao Mario!'}
          summary={
            'Al momento non hai attiva nessuna sessione su app IO, se hai perso lo smartphone i tuoi dati sono al sicuro! Puoi accedere nuovamente in app con le tue credenziali SPID o CIE da qualsiasi dispositivo.'
          }
          summaryColumns={{ xs: 12, md: 10 }}
        />
      </Grid>
      <Grid item xs={12}>
        <Link href={'/access'}>
          <Button sx={{ mr: 2 }} variant="outlined">
            Torna alla home
          </Button>
        </Link>
      </Grid>
    </Grid>
    <FAQDefault />
  </>
);

export default L1NoSession;
