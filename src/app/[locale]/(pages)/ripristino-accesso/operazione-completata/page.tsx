'use client';

import { Button, Grid } from '@mui/material';
import { useTranslations } from 'next-intl';
import { ROUTES } from '../../../_utils/routes';
import { commonBackgroundWithBack } from '../../../_utils/styles';
import useLocalePush from '@/app/[locale]/_hooks/useLocalePush';
import CommonLayoutRestore from '@/app/[locale]/_component/commonLayoutRestore/commonLayoutRestore';

const RestoreThankYouPage = (): React.ReactElement => {
  const t = useTranslations('ioesco');
  const pushWithLocale = useLocalePush();
  return (
    <>
      <Grid sx={commonBackgroundWithBack}>
        <CommonLayoutRestore
          title={t('restore.accessrestored')}
          summary={t('restore.logagainio')}
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
