'use client';
import { Grid } from '@mui/material';
import MDSpinner from 'react-md-spinner';
import { theme } from '@pagopa/mui-italia';
import { commonBackground } from '../../_utils/utils';

const Loader = (): React.ReactElement => (
  <>
    <Grid sx={commonBackground} container>
      <Grid item xs={12} justifySelf={'center'} maxWidth="100%" textAlign={'center'}>
        <MDSpinner singleColor={theme.palette.primary.main} role="loadingSpinner" />
      </Grid>
    </Grid>
  </>
);

export default Loader;
