'use client';
import { Card, CardContent, Divider, Grid, Typography } from '@mui/material';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { ButtonNaked } from '@pagopa/mui-italia';
import { useTranslations } from 'next-intl';
import { useRouter } from 'next-intl/client';
import { ROUTES } from '../../_utils/routes';
import Firework from '../../_icons/firework';
import { commonCardStyle } from '../../_utils/styles';
import { localeFromStorage } from '../../_utils/common';

export const RestoreSessionCard = (): React.ReactElement => {
  const t = useTranslations('ioesco');
  const router = useRouter();

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
              onClick={() =>
                router.push(`${ROUTES.PROFILE_RESTORE}`, { locale: localeFromStorage })
              }
              color="primary"
              endIcon={<ArrowForwardIcon />}
              size="medium"
              sx={{ py: '19px' }}
            >
              {t('common.restoreioaccess')}
            </ButtonNaked>
            <Divider />
            <Typography variant="body2" py={2}>
              {t('common.norestorecode')}
            </Typography>
            <ButtonNaked
              onClick={() => router.push(`${ROUTES.LOGIN_L3}`, { locale: localeFromStorage })}
              color="primary"
              size="medium"
              sx={{ textDecorationLine: 'underline' }}
            >
              {t('common.findwhatdo')}
            </ButtonNaked>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
};
