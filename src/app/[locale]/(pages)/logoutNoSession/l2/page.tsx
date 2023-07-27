'use client';

import AppleIcon from '@mui/icons-material/Apple';
import { Button, Grid } from '@mui/material';
import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { Introduction } from '../../../_component/introduction/introduction';
import { commonBackground } from '../../../_utils/styles';
import PlayStoreIcon from '@/app/[locale]/_icons/playstore';

const L2NoSession = (): React.ReactElement => {
  const t = useTranslations('ioesco');
  return (
    <>
      <Grid sx={commonBackground} container spacing={2}>
        <Grid item xs={12} justifySelf={'center'}>
          <Introduction
            title={t('common.hello', { nome: 'Mario' })}
            summary={t('common.noprofile')}
            summaryColumns={{ xs: 12, md: 10 }}
          />
        </Grid>
        <Grid item xs={12} sm={4} md={3}>
          <Link href={'/#'}>
            <Button fullWidth sx={{ mr: 2 }} variant="outlined" startIcon={<AppleIcon />}>
              {t('common.appstore')}
            </Button>
          </Link>
        </Grid>
        <Grid item xs={12} sm={4} md={3}>
          <Link href={'/#'}>
            <Button fullWidth sx={{ mr: 2 }} variant="outlined" startIcon={<PlayStoreIcon />}>
              {t('common.playstore')}
            </Button>
          </Link>
        </Grid>
      </Grid>
    </>
  );
};

export default L2NoSession;
