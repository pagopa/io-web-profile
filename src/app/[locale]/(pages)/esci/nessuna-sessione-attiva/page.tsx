'use client';

import { Button, Grid } from '@mui/material';
import { useTranslations } from 'next-intl';
import { FAQ } from '../../../_component/accordion/faqDefault';
import { Introduction } from '../../../_component/introduction/introduction';
import { commonBackgroundLight } from '../../../_utils/styles';
import { ROUTES } from '@/app/[locale]/_utils/routes';
import { storageUserOps } from '@/app/[locale]/_utils/storage';
import useLocalePush from '@/app/[locale]/_hooks/useLocalePush';

const L1NoSession = (): React.ReactElement => {
  const t = useTranslations('ioesco');
  const userFromStorage = storageUserOps.read();
  const pushWithLocale = useLocalePush();
  return (
    <>
      <Grid sx={commonBackgroundLight} container>
        <Grid item xs={12} justifySelf={'center'}>
          <Introduction
            title={t('common.hello', { nome: userFromStorage?.name })}
            summary={t('lplogoutpostlogin.noactivesession')}
            summaryColumns={{ xs: 12, md: 10 }}
          />
        </Grid>
        <Grid item xs={12}>
          <Button
            onClick={() => pushWithLocale(`${ROUTES.LOGIN}`)}
            sx={{ mr: 2 }}
            variant="outlined"
          >
            {t('common.backtohome')}
          </Button>
        </Grid>
      </Grid>
      <FAQ />
    </>
  );
};

export default L1NoSession;
