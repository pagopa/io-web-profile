'use client';

import { Grid, Button } from '@mui/material';
import { useTranslations } from 'next-intl';
import { CieIcon } from '@pagopa/mui-italia/dist/icons/CieIcon';
import { SpidIcon } from '@pagopa/mui-italia/dist/icons/SpidIcon';
import { useState } from 'react';
import { Introduction } from '../../_component/introduction/introduction';
import { commonBackground } from '../../_utils/styles';
import { FAQDefault } from '../../_component/accordion/faqDefault';
import { SelectIdp } from '../../_component/selectIdp/selectIdp';

const Init = (): React.ReactElement => {
  const t = useTranslations('logout');
  const [openDialog, setOpenDialog] = useState<boolean>(false);
  return (
    <>
      <Grid sx={commonBackground} container>
        <Grid item xs={12} justifySelf={'center'}>
          <Introduction
            title={t('title')}
            summary={t('description')}
            summaryColumns={{ xs: 12, md: 8 }}
          />
        </Grid>
        <Grid item xs={12}>
          <Button
            sx={{ mr: 2 }}
            onClick={(event) => {
              event.preventDefault();
              setOpenDialog(true);
            }}
            startIcon={<CieIcon />}
            variant="contained"
          >
            Entra con SPID
          </Button>
          <Button startIcon={<SpidIcon />} variant="contained">
            Entra con CIE
          </Button>
        </Grid>
      </Grid>
      <FAQDefault />
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
