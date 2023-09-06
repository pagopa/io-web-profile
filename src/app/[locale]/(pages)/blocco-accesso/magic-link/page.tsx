'use client';
import { Button, Grid, Typography } from '@mui/material';
import { useTranslations } from 'next-intl';
import { COMMON_PADDING_HERO } from '../../../_utils/styles';
import HourglassIcon from '../../../_icons/hourglass';

const ExpiredMagicLink = () => {
  const t = useTranslations('ioesco');

  return (
    <Grid sx={COMMON_PADDING_HERO} container bgcolor="background.default">
      <Grid item xs={12} justifySelf={'center'}>
        <Grid container justifyContent="center">
          <Grid item xs={12} textAlign={'center'} pb={4}>
            {<HourglassIcon />}
          </Grid>
          <Grid item xs={12} pb={1}>
            <Typography
              variant="h4"
              py={0}
              px={0}
              color="textPrimary"
              sx={{
                textAlign: 'center',
              }}
            >
              {t('common.lockio')}
            </Typography>
          </Grid>
          <Grid item xs={12} pb={4}>
            <Typography
              variant="body1"
              py={0}
              px={0}
              color="textPrimary"
              sx={{
                textAlign: 'center',
              }}
            >
              {
                // FIXME: https://pagopa.atlassian.net/browse/IOPID-717
              }
              Premi su continua e segui le istruzioni per bloccare <br /> l’accesso a IO con la tua
              identità digitale.
            </Typography>
          </Grid>
          <Grid item xs={12} textAlign={'center'}>
            <Grid display={'flex'} justifyContent="center">
              <Button variant={'contained'}>
                {
                  // FIXME: https://pagopa.atlassian.net/browse/IOPID-717
                  'Continua'
                }
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default ExpiredMagicLink;
