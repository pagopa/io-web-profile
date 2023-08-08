'use client';

import { Button, Grid } from '@mui/material';
import { useTranslations } from 'next-intl';
import { useRouter } from 'next-intl/client';
import { BackButton } from '../../../_component/backButton/backButton';
import { IdpListOnApp } from '../../../_component/idpListOnApp/idpListOnApp';
import { Introduction } from '../../../_component/introduction/introduction';
import { commonBackgroundWithBack } from '../../../_utils/styles';
import { ROUTES } from '../../../_utils/routes';
import { localeFromStorage } from '@/app/[locale]/_utils/common';

const RestoreThankYouPage = (): React.ReactElement => {
  const t = useTranslations('ioesco');
  const router = useRouter();
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

        <Button
          onClick={() => router.push(`${ROUTES.PROFILE}`, { locale: localeFromStorage })}
          variant="outlined"
          sx={{ marginTop: { xs: 6, sm: 4, md: '60px' } }}
        >
          {t('common.backtoprofile')}
        </Button>
      </Grid>
    </>
  );
};

export default RestoreThankYouPage;
