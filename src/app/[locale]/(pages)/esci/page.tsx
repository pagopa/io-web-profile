'use client';

import { Grid, Button } from '@mui/material';
import { useTranslations } from 'next-intl';
import { CieIcon } from '@pagopa/mui-italia/dist/icons/CieIcon';
import { SpidIcon } from '@pagopa/mui-italia/dist/icons/SpidIcon';
import { useEffect, useState } from 'react';
import { Introduction } from '../../_component/introduction/introduction';
import { commonBackgroundDark } from '../../_utils/styles';
import { FAQ } from '../../_component/accordion/faqDefault';
import { SelectIdp } from '../../_component/selectIdp/selectIdp';
import { SpidLevels } from '../../_component/selectIdp/idpList';
import { goCIE } from '../../_utils/idps';
import { trackEvent } from '../../_utils/mixpanel';

const Init = (): React.ReactElement => {
  const t = useTranslations('ioesco');
  const [openDialog, setOpenDialog] = useState<boolean>(false);

  const spidLevel: SpidLevels = {
    type: 'L1',
  };

  useEffect(() => {
    trackEvent('IO_SESSION_EXIT_LOGIN');
  }, []);

  const handleCIELogin = () => {
    trackEvent('IO_SESSION_EXIT_LOGIN_CIE');
    trackEvent('IO_LOGIN_START');
    goCIE(spidLevel);
  };

  const handleSPIDLogin = () => {
    trackEvent('IO_SESSION_EXIT_LOGIN_SPID');
    setOpenDialog(true);
  };

  return (
    <>
      <Grid sx={commonBackgroundDark} container>
        <Grid item xs={12} justifySelf={'center'}>
          <Introduction
            title={t('common.logout')}
            summary={t('lplogout.lostdevice')}
            summaryColumns={{ xs: 12, md: 8 }}
            summaryColor={'primary.contrastText'}
            titleColor={'primary.contrastText'}
          />
        </Grid>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={5} md={4} lg={3} xl={2}>
            <Button
              fullWidth
              sx={{
                mr: 2,
                backgroundColor: 'background.paper',
                '&:hover': {
                  backgroundColor: '#ffffff',
                },
              }}
              onClick={(event) => {
                event.preventDefault();
                handleSPIDLogin();
              }}
              startIcon={<CieIcon />}
              variant="outlined"
            >
              {t('common.loginspid')}
            </Button>
          </Grid>
          <Grid item xs={12} sm={5} md={4} lg={3} xl={2}>
            <Button
              fullWidth
              sx={{
                backgroundColor: 'background.paper',
                '&:hover': {
                  backgroundColor: '#ffffff',
                },
              }}
              startIcon={<SpidIcon />}
              variant="outlined"
              onClick={() => handleCIELogin()}
            >
              {t('common.logincie')}
            </Button>
          </Grid>
        </Grid>
      </Grid>
      <FAQ />
      <SelectIdp isOpen={openDialog} spidLevel={spidLevel} onClose={setOpenDialog} />
    </>
  );
};

export default Init;
