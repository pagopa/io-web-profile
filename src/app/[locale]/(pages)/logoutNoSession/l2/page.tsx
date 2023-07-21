'use client';

import { Grid, Button } from '@mui/material';
import Link from 'next/link';
import AppleIcon from '@mui/icons-material/Apple';
import AndroidIcon from '@mui/icons-material/Android';
import { Introduction } from '../../../_component/introduction/introduction';
import { commonBackground } from '../../../_utils/styles';

const L2NoSession = (): React.ReactElement => (
  <>
    <Grid sx={commonBackground} container spacing={2}>
      <Grid item xs={12} justifySelf={'center'}>
        <Introduction
          title={'Ciao Mario!'}
          summary={
            'Non risulta nessun profilo IO associato alla tua identità, per accedere a tutte le funzionalità scarica l’app IO sul tuo smartphone.'
          }
          summaryColumns={{ xs: 12, md: 10 }}
        />
      </Grid>
      <Grid item xs={12} sm={4} md={3}>
        <Link href={'/#'}>
          <Button fullWidth sx={{ mr: 2 }} variant="outlined" startIcon={<AppleIcon />}>
            App Store
          </Button>
        </Link>
      </Grid>
      <Grid item xs={12} sm={4} md={3}>
        <Link href={'/#'}>
          <Button fullWidth sx={{ mr: 2 }} variant="outlined" startIcon={<AndroidIcon />}>
            Play Store
          </Button>
        </Link>
      </Grid>
    </Grid>
  </>
);

export default L2NoSession;
