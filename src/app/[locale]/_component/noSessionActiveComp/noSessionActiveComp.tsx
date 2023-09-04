'use client';

import { Button, Grid } from '@mui/material';
import { useTranslations } from 'next-intl';
import { commonBackgroundLight } from '../../_utils/styles';
import { FAQ } from '../accordion/faqDefault';
import { Introduction } from '../introduction/introduction';
import { ROUTES } from '@/app/[locale]/_utils/routes';
import useLocalePush from '@/app/[locale]/_hooks/useLocalePush';

type NoSessionProps = {
  title: string;
};

const NoSessionActiveComp = ({ title }: NoSessionProps): React.ReactElement => {
  const t = useTranslations('ioesco');
  const pushWithLocale = useLocalePush();
  return (
    <>
      <Grid sx={commonBackgroundLight} container>
        <Grid item xs={12} justifySelf={'center'}>
          <Introduction
            title={title}
            summary={t('lplogoutpostlogin.noactivesession')}
            summaryColumns={{ xs: 12, md: 6 }}
          />
        </Grid>
        <Grid item xs={12}>
          <Button onClick={() => pushWithLocale(ROUTES.LOGIN)} sx={{ mr: 2 }} variant="outlined">
            {t('common.backtohome')}
          </Button>
        </Grid>
      </Grid>
      <FAQ />
    </>
  );
};

export default NoSessionActiveComp;
