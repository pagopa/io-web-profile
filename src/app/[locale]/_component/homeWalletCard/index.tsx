'use client';
import { Grid, Tooltip, Typography } from '@mui/material';
import { useTranslations } from 'next-intl';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import { useEffect, useMemo } from 'react';
import { WalletData } from '@/api/generated/webProfile/WalletData';
import useFetch, { WebProfileApi } from '@/api/webProfileApiClient';
import useLocalePush from '../../_hooks/useLocalePush';
import { ROUTES } from '../../_utils/routes';

const isWalletRevocationActive = process.env.NEXT_PUBLIC_FF_WALLET_REVOCATION === 'true';

type HomeWalletCardProps = {
  walletRevokeStatus?: WalletData;
  isProfileAvailable: boolean;
  setWalletRevokeStatus: (res: WalletData) => void;
};

const HomeWalletCard = ({
  walletRevokeStatus,
  isProfileAvailable,
  setWalletRevokeStatus,
}: HomeWalletCardProps): React.ReactElement => {
  const t = useTranslations('itwallet');
  const { callFetchWithRetries } = useFetch();
  const pushWithLocale = useLocalePush();

  useEffect(() => {
    if (isProfileAvailable && isWalletRevocationActive) {
      callFetchWithRetries(WebProfileApi, 'getCurrentWalletInstanceStatus', [], [500])
        .then(res => {
          setWalletRevokeStatus(res);
          // saving WI_ID in session storage in order to be passed to revoke api request
          global.window?.sessionStorage?.setItem('WI_ID', res.id);
        })
        .catch(() => pushWithLocale(ROUTES.INTERNAL_ERROR));
    }
  }, [callFetchWithRetries, isProfileAvailable, pushWithLocale, setWalletRevokeStatus]);

  const walletCardTitle = useMemo(() => {
    if (walletRevokeStatus?.is_revoked) return t('common.walletinactive');
    if (walletRevokeStatus?.is_revoked === false) return t('common.walletactive');
  }, [t, walletRevokeStatus?.is_revoked]);

  const walletCardTooltip = useMemo(() => {
    return walletRevokeStatus?.is_revoked ? t('tooltip.inactivewallet') : t('tooltip.activewallet');
  }, [walletRevokeStatus?.is_revoked, t]);

  return walletRevokeStatus !== undefined ? (
    <Grid container>
      <Grid xs={10} item padding={3}>
        <Typography variant="body2">{t('common.wallettitle')}</Typography>
        <Typography variant="sidenav">{walletCardTitle}</Typography>
      </Grid>
      <Grid xs={2} item textAlign={'center'} alignSelf={'center'}>
        <Tooltip
          title={walletCardTooltip}
          placement="top"
          arrow
          enterTouchDelay={0}
          leaveTouchDelay={10000}
        >
          <HelpOutlineIcon color="primary" />
        </Tooltip>
      </Grid>
    </Grid>
  ) : (
    <></>
  );
};

export default HomeWalletCard;
