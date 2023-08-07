'use client';
import { Button, Grid, Typography } from '@mui/material';
import { useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';
import { FAQ } from '../../_component/accordion/faqDefault';
import { BackButton } from '../../_component/backButton/backButton';
import { IdpListOnApp } from '../../_component/idpListOnApp/idpListOnApp';
import { Introduction } from '../../_component/introduction/introduction';
import { Flows } from '../../_enums/Flows';
import { ROUTES } from '../../_utils/routes';
import { storageUserOps } from '../../_utils/storage';
import { commonBackgroundWithBack } from '../../_utils/styles';
import { WebProfileApi } from '@/api/webProfileApiClient';

const RestoreProfile = (): React.ReactElement => {
  const t = useTranslations('ioesco');
  const router = useRouter();
  const userFromStorage = storageUserOps.read();

  const isL3 = userFromStorage?.spidLevel === process.env.NEXT_PUBLIC_JWT_SPID_LEVEL_VALUE_L3;
  const handleRestore = () => {
    if (isL3) {
      WebProfileApi.unlockUserSession({ unlock_code: undefined })
        .then(() => {
          router.push(ROUTES.RESTORE_THANK_YOU);
        })
        .catch((_err) => {
          router.push(ROUTES.PROFILE_RESTORE_KO);
        });
    } else {
      router.push(ROUTES.RESTORE_CODE);
    }
  };

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
          {!isL3 && (
            <Grid item sm={10} md={7}>
              <Typography mb={5} fontSize={'20px'}>
                {t.rich('restore.insertcode', {
                  strong: (chunks) => <strong>{chunks}</strong>,
                })}
              </Typography>
            </Grid>
          )}
          <Grid>
            <Button variant="contained" size="medium" onClick={handleRestore}>
              {t('common.restoreioaccess')}
            </Button>
          </Grid>
        </Grid>
      </Grid>
      <FAQ flow={Flows.RESTORE} />
    </>
  );
};

export default RestoreProfile;
