'use client';

import { Grid, Button } from '@mui/material';
import Link from 'next/link';
import { Introduction } from '../../_component/introduction/introduction';
import { commonBackground } from '../../_utils/styles';
import { BackButton } from '../../_component/backButton/backButton';
import { IdpListOnApp } from '../../_component/idpListOnApp/idpListOnApp';

const RestoreThankYouPage = (): React.ReactElement => (
  <>
    <Grid sx={commonBackground}>
      <BackButton />
      <Introduction
        title={"L'accesso a IO è stato ripristinato"}
        summary={
          'Da questo momento puoi entrare di nuovo in app IO con tutte le tue identità SPID o CIE.'
        }
        summaryColumns={{ xs: 12, md: 4.5 }}
      />

      <IdpListOnApp />

      <Link href="/profile">
        <Button variant="outlined" sx={{ marginTop: '60px' }}>
          Torna al profilo
        </Button>
      </Link>
    </Grid>
  </>
);

export default RestoreThankYouPage;
