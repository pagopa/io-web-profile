'use client';
import { Card, CardContent, Divider, Grid, Typography } from '@mui/material';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

import { ButtonNaked } from '@pagopa/mui-italia';
import { useTranslations } from 'next-intl';
import { ROUTES } from '../../_utils/routes';
import Firework from '../../_icons/firework';

const ProfileCardsBlocked = (): React.ReactElement => {
  const bgColor = 'background.paper';
  const t = useTranslations('ioesco');

  return (
    <Grid container flexDirection="column" justifyContent="center" alignItems="center">
      <Grid item textAlign={'center'}>
        <Card
          sx={{
            backgroundColor: bgColor,
            padding: '8px',
            boxShadow: '0px 8px 38px 7px #002B551A',
            borderRadius: '16px',
            maxWidth: '364px',
          }}
        >
          <CardContent>
            <Firework />
            <Typography variant="h6" py={2}>
              {t('common.restoreioaccess')}
            </Typography>
            <Typography variant="body2" textAlign="center" px={5}>
              {t('common.identitysecurityrestore')}
            </Typography>

            <ButtonNaked
              href={ROUTES.PROFILE_RESTORE}
              color="primary"
              endIcon={<ArrowForwardIcon />}
              size="medium"
              sx={{ py: '19px' }}
            >
              {t('common.restoreioaccess')}
            </ButtonNaked>
            <Divider />
            <Typography variant="body2" padding={2}>
              {t('common.norestorecode')}
            </Typography>
            <ButtonNaked
              href={ROUTES.LOGIN_L3}
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
export default ProfileCardsBlocked;
