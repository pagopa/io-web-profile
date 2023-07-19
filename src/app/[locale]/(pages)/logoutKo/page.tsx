'use client';

import { Grid } from '@mui/material';
import { IllusError } from '@pagopa/mui-italia';
import { commonBackground } from '../../_utils/utils';
import { FeedbackMessage } from '../../_component/feedbackMessage/feedbackMessage';
import { ROUTES } from '../../_utils/routes';

const LogOutKo = (): React.ReactElement => (
  <>
    <Grid sx={commonBackground} container>
      <Grid item xs={12} justifySelf={'center'}>
        <FeedbackMessage
          topIcon={<IllusError />}
          title={'Qualcosa è andato storto'}
          summary={
            <span>
              A causa di un errore del sistema non è possibile completare la richiesta. Se il
              problema persiste contatta l’assistenza. <br /> <br />
              Per effettuare il logout puoi anche accedere ad app IO con le tue credenziali SPID o
              CIE da un altro dispositivo, in questo modo la sessione in app sul dispositivo
              precedente verrà terminata.
            </span>
          }
          button={{
            href: ROUTES.SESSION,
            isVisible: true,
            variant: 'contained',
            text: 'Riprova',
          }}
        />
      </Grid>
    </Grid>
  </>
);

export default LogOutKo;
