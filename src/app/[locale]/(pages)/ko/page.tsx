'use client';

import { Grid } from '@mui/material';
import { IllusError } from '@pagopa/mui-italia';
import { commonBackground } from '../../_utils/styles';
import { FeedbackMessage } from '../../_component/feedbackMessage/feedbackMessage';

const LoginKo = (): React.ReactElement => (
  <>
    <Grid sx={commonBackground} container>
      <Grid item xs={12} justifySelf={'center'}>
        <FeedbackMessage
          topIcon={<IllusError />}
          title={'Qualcosa è andato storto'}
          summary={
            <span>
              A causa di un errore del sistema non è possibile completare la richiesta. Se il
              problema persiste contatta l&apos;assistenza.
            </span>
          }
          button={{
            href: '/profile',
            isVisible: true,
            variant: 'contained',
            text: 'Riprova',
          }}
        />
      </Grid>
    </Grid>
  </>
);

export default LoginKo;
