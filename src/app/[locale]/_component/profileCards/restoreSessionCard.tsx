'use client';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { Card, CardContent, Divider, Grid, Typography } from '@mui/material';
import { ButtonNaked } from '@pagopa/mui-italia';
import { useTranslations } from 'next-intl';
import useLocalePush from '../../_hooks/useLocalePush';
import Firework from '../../_icons/firework';
import { ROUTES } from '../../_utils/routes';
import { commonCardStyle } from '../../_utils/styles';
import { storageMagicLinkOps, storageUserOps } from '../../_utils/storage';
import { trackEvent } from '../../_utils/mixpanel';

export const RestoreSessionCard = (): React.ReactElement => {
  const t = useTranslations('ioesco');
  const pushWithLocale = useLocalePush();
  const userFromStorage = storageUserOps.read();
  const isL3 = userFromStorage?.spidLevel === process.env.NEXT_PUBLIC_JWT_SPID_LEVEL_VALUE_L3;
  const isMagicLink: boolean = storageMagicLinkOps.read()
    ? storageMagicLinkOps.read().value
    : false;

  const handleUnlockButton = () => {
    trackEvent('IO_PROFILE_UNLOCK_ACCESS_START');
    if (isMagicLink) {
      pushWithLocale(ROUTES.LOGIN_L2);
    } else {
      pushWithLocale(ROUTES.PROFILE_RESTORE);
    }
  };

  return (
    <Grid
      container
      spacing={4}
      display={'flex'}
      justifyContent={'center'}
      flexWrap={{ xs: 'wrap', sm: 'nowrap' }}
      textAlign={{ xs: 'left', sm: 'center' }}
    >
      <Grid item xs={12} md={5} lg={4} xl={3}>
        <Card sx={commonCardStyle}>
          <CardContent>
            <Firework />
            <Typography variant="h6" py={2}>
              {t('common.restoreioaccess')}
            </Typography>
            <Typography variant="body2">{t('common.identitysecurityrestore')}</Typography>
            <ButtonNaked
              onClick={() => handleUnlockButton()}
              color="primary"
              endIcon={<ArrowForwardIcon />}
              size="medium"
              sx={{ py: '19px' }}
            >
              {t('common.restoreioaccess')}
            </ButtonNaked>
            {!isL3 ? (
              <>
                <Divider />
                <Typography variant="body2" py={2}>
                  {t('common.norestorecode')}
                </Typography>
                <ButtonNaked
                  onClick={() => pushWithLocale(ROUTES.LOGIN_L3)}
                  color="primary"
                  size="medium"
                  sx={{ textDecorationLine: 'underline' }}
                >
                  {t('common.findwhatdo')}
                </ButtonNaked>
              </>
            ) : null}
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
};
