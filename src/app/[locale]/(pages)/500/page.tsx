'use client';

import { Grid } from '@mui/material';
import { IllusError } from '@pagopa/mui-italia';
import { FeedbackMessage } from '../../_component/feedbackMessage/feedbackMessage';
import { commonBackground } from '../../_utils/styles';

const InternalErrordPage = (): React.ReactElement => (
  <Grid sx={commonBackground} container>
    <Grid item xs={12} justifySelf={'center'}>
      <FeedbackMessage
        topIcon={<IllusError />}
        title={'Qualcosa non ha funzionato'}
        summary={
          <span>
            Non siamo riusciti a caricare la pagina, riprova tra qualche minuto. <br />
            Se il problema persiste contatta l’assistenza.
          </span>
        }
        firstButton={{
          goBack: true,
          variant: 'contained',
          text: 'Ricarica la pagina',
        }}
      />
    </Grid>
  </Grid>
);

export default InternalErrordPage;
