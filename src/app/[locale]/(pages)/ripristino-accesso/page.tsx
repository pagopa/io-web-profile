'use client';
import { Button, Grid, Typography } from '@mui/material';
import { useTranslations } from 'next-intl';
import { FAQ } from '../../_component/accordion/faqDefault';
import CommonLayoutRestore from '../../_component/commonLayoutRestore/commonLayoutRestore';
import { Flows } from '../../_enums/Flows';
import useLocalePush from '../../_hooks/useLocalePush';
import { ROUTES } from '../../_utils/routes';
import { storageUserOps } from '../../_utils/storage';
import { commonBackgroundWithBack } from '../../_utils/styles';
import { WebProfileApi } from '@/api/webProfileApiClient';

const RestoreProfile = (): React.ReactElement => {
  const t = useTranslations('ioesco');
  const pushWithLocale = useLocalePush();
  const userFromStorage = storageUserOps.read();

  const isL3 = userFromStorage?.spidLevel === process.env.NEXT_PUBLIC_JWT_SPID_LEVEL_VALUE_L3;
  const handleRestore = () => {
    if (isL3) {
      WebProfileApi.unlockUserSession({ unlock_code: undefined })
        .then(() => {
          pushWithLocale(ROUTES.RESTORE_THANK_YOU);
        })
        .catch((_err) => {
          pushWithLocale(ROUTES.PROFILE_RESTORE_KO);
        });
    } else {
      pushWithLocale(ROUTES.RESTORE_CODE);
    }
  };

  return (
    <>
      <Grid sx={commonBackgroundWithBack} item xs={12} sm={12}>
        <CommonLayoutRestore title={t('restore.restoreaccess')} summary={t('restore.login')} />
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
      <FAQ flow={Flows.RESTORE} />
    </>
  );
};

export default RestoreProfile;
