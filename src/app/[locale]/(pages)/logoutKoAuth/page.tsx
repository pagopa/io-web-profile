'use client';

import { Grid } from '@mui/material';
import { IllusError } from '@pagopa/mui-italia';
import { commonBackground } from '../../_utils/styles';
import { FeedbackMessage } from '../../_component/feedbackMessage/feedbackMessage';
import { ROUTES } from '../../_utils/routes';

const LoginKo = (): React.ReactElement => (
  <>
    <Grid sx={commonBackground} container>
      <Grid item xs={12} justifySelf={'center'}>
        <FeedbackMessage
          topIcon={<IllusError />}
          title={'Qualcosa è andato storto'}
          summary={
            <span>
              A causa di un errore del sistema non è possibile accedere. <br />
              Ti chiediamo di riprovare più tardi.
            </span>
          }
          button={{
            href: ROUTES.LOGIN,
            isVisible: true,
            variant: 'contained',
            text: 'Torna alla home',
          }}
        />
      </Grid>
    </Grid>
  </>
);

export default LoginKo;
