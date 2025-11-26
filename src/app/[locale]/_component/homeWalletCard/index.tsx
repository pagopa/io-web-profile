'use client';
import { WalletData } from '@/api/generated/wallet/WalletData';
import useFetch, { WebWalletApi } from '@/api/webWalletApiClient';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import { Grid, Tooltip, Typography } from '@mui/material';
import { useTranslations } from 'next-intl';
import { useEffect, useMemo } from 'react';
import useFiscalCodeWhitelisted from '../../_hooks/useFiscalCodeWhitelisted';

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
  const t = useTranslations('ioesco');
  const { callFetchWithRetries } = useFetch();

  const isFiscalCodeWhitelisted = useFiscalCodeWhitelisted();

  useEffect(() => {
    if (isProfileAvailable) {
      callFetchWithRetries(WebWalletApi, 'getCurrentWalletInstanceStatus', [], [500])
        .then(res => {
          if (res) {
            setWalletRevokeStatus(res);
            global.window?.sessionStorage?.setItem('WI_ID', res?.id);
          }
        })
        .catch(e => {
          if (e?.status) {
            return;
          }
        });
    }
  }, [callFetchWithRetries, isProfileAvailable, setWalletRevokeStatus]);

  const walletCardTitle = useMemo(() => {
    if (walletRevokeStatus?.is_revoked) return t('common.notactive');
    if (walletRevokeStatus?.is_revoked === false) return t('common.active');
  }, [t, walletRevokeStatus?.is_revoked]);

  const walletCardTooltip = useMemo(() => {
    if (walletRevokeStatus?.is_revoked) {
      return t('common.notactive');
    } else {
      if (isFiscalCodeWhitelisted) {
        return t('profile.itwallet.walletbullettooltip');
      } else {
        return t('profile.walletbullettooltip');
      }
    }
  }, [walletRevokeStatus?.is_revoked, t, isFiscalCodeWhitelisted]);

  const walletBullet = useMemo(() => {
    if (isFiscalCodeWhitelisted) {
      return t('profile.itwallet.walletbullet');
    } else {
      return t('profile.walletbullet');
    }
  }, [t, isFiscalCodeWhitelisted]);

  return walletRevokeStatus !== undefined ? (
    <Grid container>
      <Grid xs={10} item padding={3}>
        <Typography variant="body2">{walletBullet}</Typography>
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
