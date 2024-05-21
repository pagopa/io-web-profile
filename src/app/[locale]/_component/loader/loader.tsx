'use client';
import { Grid } from '@mui/material';
import MDSpinner from 'react-md-spinner';
import { theme } from '@pagopa/mui-italia';
import { commonBackgroundFullHeight, loaderOverlay } from '../../_utils/styles';

const Loader = (): React.ReactElement => (
  <>
    <Grid sx={loaderOverlay} />
    <Grid sx={commonBackgroundFullHeight} container>
      <Grid item xs={12} justifySelf={'center'} maxWidth="100%" textAlign={'center'}>
        <MDSpinner singleColor={theme.palette.primary.main} role="loadingSpinner" />
      </Grid>
    </Grid>
  </>
);

export default Loader;
