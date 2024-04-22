'use client';

import { Button, Grid } from '@mui/material';
import { useTranslations } from 'next-intl';
import { ROUTES } from '../../../_utils/routes';
import { commonBackgroundLight } from '../../../_utils/styles';
import useLocalePush from '@/app/[locale]/_hooks/useLocalePush';
import CommonLayoutRestore from '@/app/[locale]/_component/commonLayoutRestore/commonLayoutRestore';

const RestoreThankYouPage = (): React.ReactElement => {
  const t = useTranslations('ioweb');
  const pushWithLocale = useLocalePush();
  return (
    <>
      <Grid sx={commonBackgroundLight}>
        <CommonLayoutRestore
          title={t('restore.accessrestored')}
          summary={t('restore.logagainio')}
          hideBackButton
        />

        <Button
          onClick={() => pushWithLocale(ROUTES.PROFILE)}
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
