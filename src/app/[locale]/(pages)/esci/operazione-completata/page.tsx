'use client';

import { Button, Grid } from '@mui/material';
import { useTranslations } from 'next-intl';
import { useRouter } from 'next-intl/client';
import { Introduction } from '../../../_component/introduction/introduction';
import { ROUTES } from '../../../_utils/routes';
import { commonBackground } from '../../../_utils/styles';
import { localeFromStorage } from '@/app/[locale]/_utils/common';

const ThankYouPage = (): React.ReactElement => {
  const t = useTranslations('ioesco');
  const router = useRouter();
  return (
    <>
      <Grid sx={commonBackground} container>
        <Grid item xs={12} justifySelf={'center'} maxWidth="100%">
          <Introduction
            title={t('common.iologouttitle')}
            summary={t('thankyoupage.enterbackio')}
            summaryColumns={{ xs: 12, md: 10 }}
          />
        </Grid>
        <Grid item xs={12} pt={2}>
          <Button
            onClick={() => router.push(`${ROUTES.LOGIN}`, { locale: localeFromStorage })}
            sx={{ mr: 2 }}
            variant="outlined"
          >
            {t('common.backtohome')}
          </Button>
        </Grid>
      </Grid>
    </>
  );
};

export default ThankYouPage;
