'use client';
import { Button, Grid, Typography } from '@mui/material';
import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { FAQ } from '../../_component/accordion/faqDefault';
import { BackButton } from '../../_component/backButton/backButton';
import { IdpListOnApp } from '../../_component/idpListOnApp/idpListOnApp';
import { Introduction } from '../../_component/introduction/introduction';
import { Flows } from '../../_enums/Flows';
import { commonBackgroundWithBack } from '../../_utils/styles';
import { ROUTES } from '../../_utils/routes';

const RestoreProfile = (): React.ReactElement => {
  const t = useTranslations('ioesco');
  return (
    <>
      <Grid sx={commonBackgroundWithBack} xs={12} sm={12}>
        <BackButton />
        <Introduction
          title={t('restore.restoreaccess')}
          summary={t('restore.login')}
          summaryColumns={{ xs: 12, md: 7.5 }}
        />

        <Grid container flexDirection={'column'}>
          <IdpListOnApp />
          <Grid item sm={10} md={7}>
            {/* IF SPID level from token is L3 hide Typography line 29-33 */}
            <Typography mb={5} fontSize={'20px'}>
              {t.rich('restore.insertcode', {
                strong: (chunks) => <strong>{chunks}</strong>,
              })}
            </Typography>
          </Grid>
          {/* IF SPID level from token is L3 link is different line 36 */}
          <Link href={ROUTES.RESTORE_CODE}>
            <Button variant="contained" size="medium">
              {t('common.restoreioaccess')}
            </Button>
          </Link>
        </Grid>
      </Grid>
      <FAQ flow={Flows.RESTORE} />
    </>
  );
};

export default RestoreProfile;
