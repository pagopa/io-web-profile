'use client';
import { Grid } from '@mui/material';
import { MISpinner } from '@pagopa/mui-italia';
import { useTranslations } from 'next-intl';
import { commonBackgroundFullHeight, loaderOverlay } from '../../_utils/styles';

const Loader = (): React.ReactElement => {
  const t = useTranslations('ioesco.common');

  return (
    <>
      <Grid sx={loaderOverlay} />
      <Grid sx={commonBackgroundFullHeight} alignItems="center" justifyContent="center" container>
        <Grid item xs={12} justifySelf={'center'} maxWidth="100%" textAlign={'center'}>
          <MISpinner color="primary" size={32} aria-label={t('loading')} />
        </Grid>
      </Grid>
    </>
  );
};

export default Loader;
