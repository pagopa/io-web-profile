'use client';

import { Grid } from '@mui/material';
import { Introduction } from '../../_component/introduction/introduction';
import { commonBackground } from '../../_utils/utils';
import { extractToken, parseJwt } from '../../_utils/jwt';

const Check = (): React.ReactElement => {
  const tokenTest: string = extractToken();

  parseJwt(tokenTest);

  return (
    <>
      <Grid sx={commonBackground} container>
        <Grid item xs={12} justifySelf={'center'} maxWidth="100%">
          <Introduction title={'Check...'} summary={''} summaryColumns={{ xs: 12, md: 10 }} />
        </Grid>
      </Grid>
    </>
  );
};

export default Check;
