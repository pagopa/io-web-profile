'use client';
import { Button, Grid, Typography } from '@mui/material';
import { CieIcon } from '@pagopa/mui-italia/dist/icons/CieIcon';
import { SpidIcon } from '@pagopa/mui-italia/dist/icons/SpidIcon';
import { useTranslations } from 'next-intl';
import { useEffect, useState } from 'react';
import { SpidLevels } from '../../../_component/selectIdp/idpList';
import { SelectIdp } from '../../../_component/selectIdp/selectIdp';
import Timeout from '../../../_icons/timeout';
import { COMMON_PADDING_HERO } from '../../../_utils/styles';
import { goCIE } from '../../../_utils/idps';
import { trackEvent } from '@/app/[locale]/_utils/mixpanel';

const ExpiredMagicLink = () => {
  const t = useTranslations('ioesco');
  const [openDialog, setOpenDialog] = useState<boolean>(false);

  const spidLevel: SpidLevels = {
    type: 'L2',
  };

  useEffect(() => {
    trackEvent('IO_LOCK_ACCESS_EXPIRED_LINK', { event_category: 'UX', event_type: 'screen_view' });
  }, []);

  return (
    <Grid sx={COMMON_PADDING_HERO} container bgcolor="background.default">
      <Grid item xs={12} justifySelf={'center'}>
        <Grid container justifyContent="center">
          <Grid item xs={12} textAlign={'center'} pb={4}>
            {<Timeout />}
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
              {t('error.linkexpired')}
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
              {t('error.lockiolog')}
            </Typography>
          </Grid>
          <Grid container spacing={3} justifyContent="center">
            <Grid
              item
              xs={12}
              sm={5}
              md={4}
              lg={3}
              xl={2}
              display={'flex'}
              justifyContent={{ xs: 'center', sm: 'right' }}
            >
              <Button
                variant="contained"
                fullWidth
                startIcon={<SpidIcon />}
                onClick={(event) => {
                  event.preventDefault();
                  setOpenDialog(true);
                }}
              >
                {t('common.loginspid')}
              </Button>
            </Grid>
            <Grid
              item
              xs={12}
              sm={5}
              md={4}
              lg={3}
              xl={2}
              display={'flex'}
              justifyContent={{ xs: 'center', sm: 'left' }}
            >
              <Button
                variant="contained"
                fullWidth
                startIcon={<CieIcon />}
                onClick={() => goCIE(spidLevel)}
              >
                {t('common.logincie')}
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Grid>

      <SelectIdp
        isOpen={openDialog}
        spidLevel={spidLevel}
        onClose={(open) => {
          setOpenDialog(open);
        }}
      />
    </Grid>
  );
};

export default ExpiredMagicLink;
