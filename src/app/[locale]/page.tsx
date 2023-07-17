'use client';

import { Grid } from '@mui/material';
import { useTranslations } from 'next-intl';
import { commonBackground } from './_utils/utils';

const Index = (): React.ReactElement => {
  const t = useTranslations('home');
  return (
    <Grid sx={commonBackground} container>
      <h1>{t('template')}</h1>
    </Grid>
  );
};

export default Index;
