'use client';

import { Grid, Button } from '@mui/material';
import Link from 'next/link';
import { Introduction } from '../../_component/introduction/introduction';
import { commonBackground } from '../../_utils/utils';
import { ROUTES } from '../../_utils/routes';

const ThankYouPage = (): React.ReactElement => (
  <>
    <Grid sx={commonBackground} container>
      <Grid item xs={12} justifySelf={'center'} maxWidth="100%">
        <Introduction
          title={'Hai effettuato il logout da IO!'}
          summary={'Per entrare nuovamente su IO, utilizza le tue credenziali SPID o CIE.'}
          summaryColumns={{ xs: 12, md: 10 }}
        />
      </Grid>
      <Grid item xs={12} pt={2}>
        <Link href={ROUTES.LOGIN}>
          <Button sx={{ mr: 2 }} variant="outlined">
            Torna alla home
          </Button>
        </Link>
      </Grid>
    </Grid>
  </>
);

export default ThankYouPage;
