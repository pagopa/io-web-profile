'use client';
import { Box, Button, Dialog, Grid, Typography } from '@mui/material';
import { useTranslations } from 'next-intl';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { useCallback, useEffect, useState } from 'react';
import { FAQ } from '../../_component/accordion/faqDefault';
import { BackButton } from '../../_component/backButton/backButton';
import { Introduction } from '../../_component/introduction/introduction';
import { Flows } from '../../_enums/Flows';
import useLocalePush from '../../_hooks/useLocalePush';
import { ROUTES } from '../../_utils/routes';
import { commonBackgroundLightWithBack } from '../../_utils/styles';
import Loader from '../../_component/loader/loader';
import useFetch, { WebProfileApi } from '@/api/webProfileApiClient';
import { trackEvent } from '../../_utils/mixpanel';

const unlockioaccessRich = {
  strong: (chunks: React.ReactNode) => <strong>{chunks}</strong>,
};

const WalletInstanceRevoke = (): React.ReactElement => {
  const t = useTranslations('ioesco');
  const walletT = useTranslations("itwallet")
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const pushWithLocale = useLocalePush();
  const [isRemovingWallet, setIsRemovingWallet] = useState(false);
  const { callFetchWithRetries, isLoading } = useFetch();

  useEffect(() => {
    trackEvent('IO_ITW_STATU_PAGE', {
      event_category: 'UX',
      event_type: 'screen_view',
      ITW_status: 'on',
    });
  }, []);

  const handleLockSession = () => {
    pushWithLocale(ROUTES.PROFILE_BLOCK);
  };

  const handleDisableWallet = () => {
    trackEvent('IO_ITW_DEACTIVATION_UX_CONVERSION', { event_category: 'UX', event_type: 'action' });
    setIsDialogOpen(true);
  };

  const renderSummary = useCallback(
    (hasLostDevice: boolean) => {
      if (hasLostDevice) {
        return <>{walletT.rich('common.lostdevicewallet', unlockioaccessRich)}</>;
      }
      return <>{walletT('common.revokewalletinstancedescription')}</>;
    },
    [walletT]
  );

  const handleDisableWalletConfirm = useCallback(() => {
    trackEvent('IO_ITW_DEACTIVATION_CONFIRMED', { event_category: 'UX', event_type: 'action' });
    setIsRemovingWallet(true);
    callFetchWithRetries(WebProfileApi, 'revokeWalletInstance', [], [500])
      .then(() => {
        pushWithLocale(ROUTES.WALLET_THANK_YOU);
      })
      .catch(() => {
        trackEvent('IO_ITW_DEACTIVATION_ERROR', { event_category: 'KO', reason: '' }); // TODO [SIW-1092]: Add here the error reason
        pushWithLocale(ROUTES.WALLET_REVOKE_ERROR);
      });
  }, [callFetchWithRetries, pushWithLocale]);

  const renderRevokeWalletDialog = useCallback(
    () => (
      <Dialog open={isDialogOpen}>
        <Box p={4} display="flex" flexDirection="column" gap={2}>
          <Typography fontSize={24} fontWeight={700} color="textPrimary">
            {walletT('common.revokewalletconfirm')}
          </Typography>
          <Typography fontSize={16} fontWeight={400} color="textPrimary">
            {walletT('common.revokewalletpopup')}
          </Typography>
          <Box display="flex" justifyContent="end" columnGap={2}>
            <Button
              onClick={() => setIsDialogOpen(false)}
              variant="outlined"
              disabled={isRemovingWallet}
            >
              {walletT('common.revokewalletcancel')}
            </Button>
            <Button
              onClick={handleDisableWalletConfirm}
              variant="contained"
              disabled={isRemovingWallet}
            >
              {walletT('common.revokewalletconfirmbutton')}
            </Button>
          </Box>
        </Box>
      </Dialog>
    ),
    [handleDisableWalletConfirm, isDialogOpen, isRemovingWallet, walletT]
  );

  const trackAccordionOpen = useCallback((isOpen: boolean, element: number) => {
    if (isOpen) {
      trackEvent('IO_ITW_FAQ_OPENED', {
        event_category: 'UX',
        event_type: 'action',
        faq_opened: element + 1,
      });
    }
  }, []);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <>
      <Grid sx={commonBackgroundLightWithBack}>
        <BackButton />
        <Introduction
          title={walletT('common.revokewalletinstancetitle')}
          summary={renderSummary(false)}
          summaryColumns={{ xs: 12, md: 7.5 }}
        />
        <Grid sx={{ maxWidth: '576px' }}>
          <Button variant="contained" size="medium" onClick={handleDisableWallet}>
            {walletT('common.disablewallet')}
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
      <FAQ flow={Flows.REVOKEWALLET} onToggleFAQ={trackAccordionOpen} />
      {renderRevokeWalletDialog()}
    </>
  );
};

export default WalletInstanceRevoke;
