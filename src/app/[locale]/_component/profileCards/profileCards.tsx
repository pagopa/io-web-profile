'use client';
import { Card, CardContent, Grid, Typography } from '@mui/material';
import Link from 'next-intl/link';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

import { ButtonNaked } from '@pagopa/mui-italia';
import { useTranslations } from 'next-intl';
import QuestionIcon from '../../_icons/question';
import { ROUTES } from '../../_utils/routes';
import HourglassIcon from '../../_icons/hourglass';
import { commonCardStyle } from '../../_utils/styles';

const ProfileCards = (): React.ReactElement => {
  const t = useTranslations('ioesco');

  return (
    <>
      <Grid
        container
        spacing={4}
        flexWrap={{ xs: 'wrap', sm: 'nowrap' }}
        textAlign={{ xs: 'left', sm: 'center' }}
      >
        <Grid item xs={0} md={1} lg={2} xl={3}></Grid>
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
              <Link href={ROUTES.SESSION}>
                <ButtonNaked color="primary" endIcon={<ArrowForwardIcon />} size="medium">
                  {t('common.logout')}
                </ButtonNaked>
              </Link>
            </CardContent>
          </Card>
        </Grid>
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
              <Link href={ROUTES.PROFILE_BLOCK}>
                <ButtonNaked color="primary" endIcon={<ArrowForwardIcon />} size="medium">
                  {t('profile.lockaccess')}
                </ButtonNaked>
              </Link>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={0} md={1} lg={2} xl={3}></Grid>
      </Grid>
    </>
  );
};

export default ProfileCards;
