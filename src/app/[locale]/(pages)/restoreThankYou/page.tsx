'use client';

import { Button, Grid } from '@mui/material';
import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { BackButton } from '../../_component/backButton/backButton';
import { IdpListOnApp } from '../../_component/idpListOnApp/idpListOnApp';
import { Introduction } from '../../_component/introduction/introduction';
import { commonBackgroundWithBack } from '../../_utils/styles';

const RestoreThankYouPage = (): React.ReactElement => {
  const t = useTranslations('ioesco');
  return (
    <>
      <Grid sx={commonBackgroundWithBack}>
        <BackButton />
        <Introduction
          title={t('restore.accessrestored')}
          summary={t('restore.logagainio')}
          summaryColumns={{ xs: 12, sm: 10, md: 7.5 }}
        />

        <IdpListOnApp />

        <Link href="/profile">
          <Button variant="outlined" sx={{ marginTop: { xs: 6, sm: 4, md: '60px' } }}>
            {t('common.backtoprofile')}
          </Button>
        </Link>
      </Grid>
    </>
  );
};

export default RestoreThankYouPage;
