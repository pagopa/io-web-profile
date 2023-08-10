'use client';
import { Button, Grid, Link, Typography } from '@mui/material';
import { WithinRangeString } from '@pagopa/ts-commons/lib/strings';
import { useTranslations } from 'next-intl';
import { useDispatch } from 'react-redux';
import { FAQ } from '../../_component/accordion/faqDefault';
import { BackButton } from '../../_component/backButton/backButton';
import { IdpListOnApp } from '../../_component/idpListOnApp/idpListOnApp';
import { Introduction } from '../../_component/introduction/introduction';
import { Flows } from '../../_enums/Flows';
import useLocalePush from '../../_hooks/useLocalePush';
import { createUnlockCode } from '../../_redux/slices/blockAccessSlice';
import { isIDPKnown } from '../../_utils/idps';
import { ROUTES } from '../../_utils/routes';
import { commonBackgroundLightWithBack } from '../../_utils/styles';
import { WebProfileApi } from '@/api/webProfileApiClient';

const ProfileBlock = (): React.ReactElement => {
  const t = useTranslations('ioesco');
  const dispatch = useDispatch();
  const pushWithLocale = useLocalePush();

  const handleLockSession = () => {
    dispatch(createUnlockCode('123456789'));
    WebProfileApi.lockUserSession({ unlock_code: '123456789' as WithinRangeString<9, 10> })
      .then(() => {
        pushWithLocale(ROUTES.PROFILE_BLOCK_SUCCESS);
      })
      .catch((_err) => {
        pushWithLocale(ROUTES.PROFILE_BLOCK_KO);
      });
  };

  const renderSummary = (isIDPKnown: boolean) => {
    if (isIDPKnown) {
      return <>{t('lockaccess.accessidentity')}</>;
    }
    return <>{t('lockaccess.accessidentitycompromise')}</>;
  };

  const explanationIdentetyLevelRich = {
    link: (chunks: React.ReactNode) => <Link href="#">{chunks}</Link>,
  };

  return (
    <>
      <Grid sx={commonBackgroundLightWithBack}>
        <BackButton />
        <Introduction
          title={'Vuoi bloccare l’accesso a IO?'}
          summary={renderSummary(isIDPKnown)}
          summaryColumns={{ xs: 12, md: 7.5 }}
        />
        <Grid sx={{ maxWidth: '576px' }}>
          {isIDPKnown && <IdpListOnApp />}
          <Typography mb={5}>
            {t.rich('common.lockaccessinfo', explanationIdentetyLevelRich)}
          </Typography>
          <Button variant="contained" size="medium" onClick={handleLockSession}>
            {t('profile.lockaccess')}
          </Button>
        </Grid>
      </Grid>
      <FAQ flow={Flows.BLOCK} />
    </>
  );
};

export default ProfileBlock;
