'use client';
import { Button, Grid } from '@mui/material';
import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { FAQ } from '../../_component/accordion/faqDefault';
import { BackButton } from '../../_component/backButton/backButton';
import { IdpListOnApp } from '../../_component/idpListOnApp/idpListOnApp';
import { Introduction } from '../../_component/introduction/introduction';
import { ROUTES } from '../../_utils/routes';
import { commonBackgroundLightWithBack } from '../../_utils/styles';

const RestoreProfile = (): React.ReactElement => {
  const t = useTranslations('ioesco');
  return (
    <>
      <Grid sx={commonBackgroundLightWithBack} xs={12} sm={12}>
        <BackButton />
        <Introduction
          title={t('restore.restoreaccess')}
          summary={t('restore.login-1')}
          summaryColumns={{ xs: 12, md: 7.5 }}
        />

        <Grid container flexDirection={'column'}>
          <IdpListOnApp />
          <Grid item sm={10} md={7} />
          <Link href={ROUTES.RESTORE_THANK_YOU}>
            <Button variant="contained" size="medium">
              {t('common.restoreioaccess')}
            </Button>
          </Link>
        </Grid>
      </Grid>
      <FAQ flow="RESTORE" />
    </>
  );
};
export default RestoreProfile;
