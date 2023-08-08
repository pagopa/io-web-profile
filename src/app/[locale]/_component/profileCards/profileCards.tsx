'use client';
import { Button, Card, CardContent, Grid, Typography } from '@mui/material';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { ButtonNaked } from '@pagopa/mui-italia';
import { useTranslations } from 'next-intl';
import { useRouter } from 'next-intl/client';
import HourglassIcon from '../../_icons/hourglass';
import QuestionIcon from '../../_icons/question';
import { ROUTES } from '../../_utils/routes';
import { commonCardStyle } from '../../_utils/styles';
import { localeFromStorage } from '../../_utils/common';

type ProfileCardsProps = {
  sessionIsActive: boolean;
};

export const ProfileCards = ({ sessionIsActive }: ProfileCardsProps): React.ReactElement => {
  const t = useTranslations('ioesco');
  const router = useRouter();

  return (
    <>
      <Grid
        container
        spacing={4}
        display={'flex'}
        justifyContent={'center'}
        flexWrap={{ xs: 'wrap', sm: 'nowrap' }}
        textAlign={{ xs: 'left', sm: 'center' }}
      >
        {sessionIsActive && (
          <Grid item xs={12} md={5} lg={4} xl={3}>
            <Card sx={commonCardStyle}>
              <CardContent sx={{ padding: '32px' }}>
                <QuestionIcon />
                <Typography variant="h6" pt={2}>
                  {t('common.logout')}
                </Typography>
                <Typography variant="body2" py={2}>
                  {t('profile.nodevicelogout')}
                </Typography>
                <ButtonNaked
                  onClick={() =>
                    router.push(`${ROUTES.LOGOUT_CONFIRM}`, { locale: localeFromStorage })
                  }
                  color="primary"
                  endIcon={<ArrowForwardIcon />}
                  size="medium"
                >
                  {t('common.logout')}
                </ButtonNaked>
              </CardContent>
            </Card>
          </Grid>
        )}

        <Grid item xs={12} md={5} lg={4} xl={3}>
          <Card sx={commonCardStyle}>
            <CardContent sx={{ padding: '32px' }}>
              <HourglassIcon />
              <Typography variant="h6" pt={2}>
                {t('profile.lockaccess')}
              </Typography>
              <Typography variant="body2" py={2}>
                {t('common.lockappaccess')}
              </Typography>
              <Button
                onClick={() =>
                  router.push(`${ROUTES.PROFILE_BLOCK}`, { locale: localeFromStorage })
                }
                color="primary"
                endIcon={<ArrowForwardIcon />}
                size="medium"
              >
                {t('profile.lockaccess')}
              </Button>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </>
  );
};
