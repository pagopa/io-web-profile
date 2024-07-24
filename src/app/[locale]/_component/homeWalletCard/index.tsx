'use client';
import { Grid, Tooltip, Typography } from '@mui/material';
import { useTranslations } from 'next-intl';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import { useEffect, useMemo } from 'react';
import { WalletData } from '@/api/generated/webProfile/WalletData';
import useFetch, { WebWalletApi } from '@/api/webWalletApiClient';
import useLocalePush from '../../_hooks/useLocalePush';
import { ROUTES } from '../../_utils/routes';

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
  const pushWithLocale = useLocalePush();

  useEffect(() => {
    if (isProfileAvailable) {
      callFetchWithRetries(WebWalletApi, 'getCurrentWalletInstanceStatus', [], [500])
        .then(res => {
          if (res) {
            setWalletRevokeStatus(res);
            global.window?.sessionStorage?.setItem('WI_ID', res?.id);
          }
        }).catch((e) => {
          if(e?.status){
            // TODO SIW-918 -> handle different error 4xx statuses
            return
          }
          pushWithLocale(ROUTES.INTERNAL_ERROR)
        });
    }
  }, [callFetchWithRetries, isProfileAvailable, pushWithLocale, setWalletRevokeStatus]);



  const walletCardTitle = useMemo(() => {
    if (walletRevokeStatus?.is_revoked) return t('common.noactive');
    if (walletRevokeStatus?.is_revoked === false) return t('common.active');
  }, [t, walletRevokeStatus?.is_revoked]);

  const walletCardTooltip = useMemo(() => {
    // TODO key for tooltip in inactive status doesn't exist in new dictionary
    return walletRevokeStatus?.is_revoked ? t('common.noactive') : t('profile.walletbullettooltip');
  }, [walletRevokeStatus?.is_revoked, t]);

  return walletRevokeStatus !== undefined ? (
    <Grid container>
      <Grid xs={10} item padding={3}>
        <Typography variant="body2">{t('profile.walletbullet')}</Typography>
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
