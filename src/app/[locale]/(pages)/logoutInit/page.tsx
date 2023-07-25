'use client';

import { Grid, Button } from '@mui/material';
import { useTranslations } from 'next-intl';
import { CieIcon } from '@pagopa/mui-italia/dist/icons/CieIcon';
import { SpidIcon } from '@pagopa/mui-italia/dist/icons/SpidIcon';
import { useState } from 'react';
import { Introduction } from '../../_component/introduction/introduction';
import { commonBackgroundDark } from '../../_utils/styles';
import { FAQ } from '../../_component/accordion/faqDefault';
import { SelectIdp } from '../../_component/selectIdp/selectIdp';

const Init = (): React.ReactElement => {
  const t = useTranslations('ioesco');
  const [openDialog, setOpenDialog] = useState<boolean>(false);
  return (
    <>
      <Grid sx={commonBackgroundDark} container>
        <Grid item xs={12} justifySelf={'center'}>
          {/* TODO: title and description from tl file */}
          <Introduction
            title={t('title')}
            summary={t('description')}
            summaryColumns={{ xs: 12, md: 8 }}
            summaryColor={'primary.contrastText'}
            titleColor={'primary.contrastText'}
          />
        </Grid>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={4} md={3}>
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
                setOpenDialog(true);
              }}
              startIcon={<CieIcon />}
              variant="outlined"
            >
              {t('common.loginspid')}
            </Button>
          </Grid>
          <Grid item xs={12} sm={4} md={3}>
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
            >
              {t('common.logincie')}
            </Button>
          </Grid>
        </Grid>
      </Grid>
      <FAQ />
      <SelectIdp
        open={openDialog}
        onClose={(opn) => {
          setOpenDialog(opn);
        }}
      />
    </>
  );
};

export default Init;
