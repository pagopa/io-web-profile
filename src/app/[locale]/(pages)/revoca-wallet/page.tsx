'use client';
import { Button, Grid, Typography } from '@mui/material';
import { IPatternStringTag } from '@pagopa/ts-commons/lib/strings';
import { useTranslations } from 'next-intl';
import { useDispatch } from 'react-redux';
import generator from 'generate-password-ts';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { useEffect, useState } from 'react';
import { FAQ } from '../../_component/accordion/faqDefault';
import { BackButton } from '../../_component/backButton/backButton';
// import { IdpListOnApp } from '../../_component/idpListOnApp/idpListOnApp';
import { Introduction } from '../../_component/introduction/introduction';
import { Flows } from '../../_enums/Flows';
import useLocalePush from '../../_hooks/useLocalePush';
import { createUnlockCode } from '../../_redux/slices/blockAccessSlice';
import { isIdpKnown } from '../../_utils/idps';
import { ROUTES } from '../../_utils/routes';
import { commonBackgroundLightWithBack } from '../../_utils/styles';
import { trackEvent } from '../../_utils/mixpanel';
import { getReferralLockProfile } from '../../_utils/common';
import { storageMagicLinkOps } from '../../_utils/storage';
import Loader from '../../_component/loader/loader';
import useFetch, { WebProfileApi } from '@/api/webProfileApiClient';

const WalletInstanceRevoke = (): React.ReactElement => {
  const t = useTranslations('ioesco');
  const dispatch = useDispatch();
  const pushWithLocale = useLocalePush();
  const isFromMagicLink = storageMagicLinkOps.read();
  const referral = getReferralLockProfile(isFromMagicLink);
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const { callFetchWithRetries, isLoading } = useFetch();

  const unlockCode = generator.generate({
    length: 9,
    numbers: true,
    lowercase: false,
    uppercase: false,
  });

  useEffect(() => {
    trackEvent('IO_PROFILE_LOCK_ACCESS_CONFIRM', {
      event_category: 'UX',
      event_type: 'screen_view',
    });
  }, []);

  const handleLockSession = () => {
    setIsButtonDisabled(true);
    trackEvent('IO_PROFILE_LOCK_ACCESS_UX_CONVERSION', {
      referral,
      event_category: 'UX',
      event_type: 'action',
    });
    dispatch(createUnlockCode(unlockCode));

    callFetchWithRetries(
      WebProfileApi,
      'lockUserSession',
      {
        unlock_code: unlockCode as string & IPatternStringTag<'^\\d{9}$'>,
      },
      [500]
    )
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

  //   const explanationIdentetyLevelRich = {
  //     link: (chunks: React.ReactNode) => (
  //       <Link href="#digital_identity" fontWeight={600}>
  //         {chunks}
  //       </Link>
  //     ),
  //   };

  if (isLoading) {
    return <Loader />;
  }

  return (
    <>
      <Grid sx={commonBackgroundLightWithBack}>
        <BackButton />
        <Introduction
          title={t('revokewallet.revokewalletinstance')}
          summary={renderSummary(isIdpKnown())}
          summaryColumns={{ xs: 12, md: 7.5 }}
        />
        <Grid sx={{ maxWidth: '576px' }}>
          <Typography mb={5}>{t('revokewallet.revokewalletinstanceinfo')}</Typography>
          <Button
            variant="contained"
            size="medium"
            onClick={handleLockSession}
            disabled={isButtonDisabled}
          >
            {t('revokewallet.revokewallet')}
          </Button>
        </Grid>
      </Grid>
      <Grid sx={commonBackgroundLightWithBack}>
        <Introduction
          title={t('common.lostdevice')}
          summary={renderSummary(isIdpKnown())}
          summaryColumns={{ xs: 12, md: 7.5 }}
        />
        <Grid sx={{ maxWidth: '576px' }}>
          <Typography mb={5}>{t('common.lostdevicewallet')}</Typography>
          <Button
            variant="outlined"
            size="medium"
            onClick={handleLockSession}
            disabled={isButtonDisabled}
            endIcon={<ArrowForwardIcon />}
          >
            {t('revokewallet.lockaccess')}
          </Button>
        </Grid>
      </Grid>
      <FAQ flow={Flows.REVOKEWALLET} />
    </>
  );
};

export default WalletInstanceRevoke;
