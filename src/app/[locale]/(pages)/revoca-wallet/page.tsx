'use client';
import { Box, Button, Dialog, Grid, Typography } from '@mui/material';
import { useTranslations } from 'next-intl';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { useCallback, useState } from 'react';
import { FAQ } from '../../_component/accordion/faqDefault';
import { BackButton } from '../../_component/backButton/backButton';
import { Introduction } from '../../_component/introduction/introduction';
import { Flows } from '../../_enums/Flows';
import useLocalePush from '../../_hooks/useLocalePush';
import { ROUTES } from '../../_utils/routes';
import { commonBackgroundLightWithBack } from '../../_utils/styles';
import Loader from '../../_component/loader/loader';
import useFetch, { WebProfileApi } from '@/api/webProfileApiClient';

const unlockioaccessRich = {
  strong: (chunks: React.ReactNode) => <strong>{chunks}</strong>,
};

const WalletInstanceRevoke = (): React.ReactElement => {
  const t = useTranslations('ioesco');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  // const dispatch = useDispatch();
  const pushWithLocale = useLocalePush();
  // const isFromMagicLink = storageMagicLinkOps.read();
  // const referral = getReferralLockProfile(isFromMagicLink);
  const [isRemovingWallet, setIsRemovingWallet] = useState(false);
  const { callFetchWithRetries, isLoading } = useFetch();

  // const unlockCode = generator.generate({
  //   length: 9,
  //   numbers: true,
  //   lowercase: false,
  //   uppercase: false,
  // });

  const handleLockSession = () => {
    pushWithLocale(ROUTES.PROFILE_BLOCK);
  };
  // const handleLockSession = () => {
  //   setIsButtonDisabled(true);
  //   trackEvent('IO_PROFILE_LOCK_ACCESS_UX_CONVERSION', {
  //     referral,
  //     event_category: 'UX',
  //     event_type: 'action',
  //   });
  //   dispatch(createUnlockCode(unlockCode));

  //   callFetchWithRetries(
  //     WebProfileApi,
  //     'lockUserSession',
  //     {
  //       unlock_code: unlockCode as string & IPatternStringTag<'^\\d{9}$'>,
  //     },
  //     [500]
  //   )
  //     .then(() => {
  //       pushWithLocale(ROUTES.PROFILE_BLOCK_SUCCESS);
  //     })
  //     .catch((_err) => {
  //       pushWithLocale(ROUTES.PROFILE_BLOCK_KO);
  //     });
  // };

  const handleDisableWallet = () => {
    setIsDialogOpen(true);
  };

  const renderSummary = useCallback(
    (hasLostDevice: boolean) => {
      if (hasLostDevice) {
        return <>{t.rich('common.lostdevicewallet', unlockioaccessRich)}</>;
      }
      return <>{t('revokewallet.revokewalletinstanceinfo')}</>;
    },
    [t]
  );

  const handleDisableWalletConfirm = useCallback(() => {
    setIsRemovingWallet(true);
    callFetchWithRetries(WebProfileApi, 'revoke', [], [500])
      .then(() => {
        pushWithLocale(ROUTES.WALLET_THANK_YOU);
      })
      .catch(() => {
        pushWithLocale(ROUTES.WALLET_REVOKE_ERROR);
      })
      .finally(() => {
        setIsRemovingWallet(false);
      });
  }, [callFetchWithRetries, pushWithLocale]);

  const renderRevokeWalletDialog = useCallback(
    () => (
      <Dialog open={isDialogOpen}>
        <Box p={4} display="flex" flexDirection="column" gap={2}>
          <Typography fontSize={24} fontWeight={700} color="textPrimary">
            {t('common.disablewalletconfirm')}
          </Typography>
          <Typography fontSize={16} fontWeight={400} color="textPrimary">
            {t('common.disablewalletpopup')}
          </Typography>
          <Box display="flex" justifyContent="end" columnGap={2}>
            <Button onClick={() => setIsDialogOpen(false)} variant="outlined">
              {t('common.disablewalletcancel')}
            </Button>
            <Button
              onClick={handleDisableWalletConfirm}
              variant="contained"
              disabled={isRemovingWallet}
            >
              {t('common.disablewalletconfirmbutton')}
            </Button>
          </Box>
        </Box>
      </Dialog>
    ),
    [handleDisableWalletConfirm, isDialogOpen, isRemovingWallet, t]
  );

  if (isLoading) {
    return <Loader />;
  }

  return (
    <>
      <Grid sx={commonBackgroundLightWithBack}>
        <BackButton />
        <Introduction
          title={t('revokewallet.revokewalletinstance')}
          summary={renderSummary(false)}
          summaryColumns={{ xs: 12, md: 7.5 }}
        />
        <Grid sx={{ maxWidth: '576px' }}>
          <Button variant="contained" size="medium" onClick={handleDisableWallet}>
            {t('revokewallet.revokewallet')}
          </Button>
        </Grid>
      </Grid>
      <Grid sx={commonBackgroundLightWithBack}>
        <Introduction
          title={t('common.lostdevice')}
          summary={renderSummary(true)}
          summaryColumns={{ xs: 12, md: 7.5 }}
        />
        <Grid sx={{ maxWidth: '576px' }}>
          <Button
            variant="outlined"
            size="medium"
            onClick={handleLockSession}
            endIcon={<ArrowForwardIcon />}
          >
            {t('profile.lockaccess')}
          </Button>
        </Grid>
      </Grid>
      <FAQ flow={Flows.REVOKEWALLET} />
      {renderRevokeWalletDialog()}
    </>
  );
};

export default WalletInstanceRevoke;
