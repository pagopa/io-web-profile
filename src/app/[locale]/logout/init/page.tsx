'use client';

import { Grid, Typography, Button } from '@mui/material';
import { useTranslations } from 'next-intl';
import { CieIcon } from '@pagopa/mui-italia/dist/icons/CieIcon';
import { SpidIcon } from '@pagopa/mui-italia/dist/icons/SpidIcon';
import { AccordionCustom } from '../../_component/accordion/accordion';
import { Introduction } from '../../_component/introduction/introduction';

const Index = (): React.ReactElement => {
  const t = useTranslations('logout');
  return (
    <>
      <Grid sx={{ backgroundColor: '#FAFAFA', p: 20 }} container item>
        <Grid item xs={12} justifySelf={'center'}>
          <Introduction title={t('title')} summary={t('description')} />
        </Grid>
        <Grid item xs={12} pt={2}>
          <Button sx={{ mr: 2 }} startIcon={<CieIcon />} variant="contained">
            Entra con SPID
          </Button>
          <Button startIcon={<SpidIcon />} variant="contained">
            Entra con CIE
          </Button>
        </Grid>
      </Grid>

      <Grid sx={{ backgroundColor: 'primary', pt: 10, pb: 10 }} container item>
        <Grid item xs={1} />
        <Grid item xs={10} maxWidth="100%">
          <Typography
            fontSize={32}
            fontWeight={700}
            py={0}
            px={0}
            color="pagoPA.main"
            sx={{
              textAlign: 'left',
              pb: 5,
            }}
          >
            {'Dubbi o domande?'}
          </Typography>
          <AccordionCustom
            entries={[
              {
                summary: 'Cosa vuol dire uscire da app IO?',
                details:
                  'Lorem ipsum dolor sit amet, consectur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
              },
              {
                summary: 'A che cosa serve effettuare il logout da web?',
                details:
                  'Lorem ipsum dolor sit amet, consectetur apiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
              },
              {
                summary: 'Come posso rientrare in app IO?',
                details:
                  'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
              },
              {
                summary: 'Sospetto che qualcuno possa accedere al mio account IO, cosa posso fare?',
                details:
                  'Lorem ipsum dolor sit amet, consectetur adipiscing lit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
              },
            ]}
            summaryColor={'pagoPA.main'}
            detailColor={'action.active'}
          />
        </Grid>
      </Grid>
    </>
  );
};

export default Index;
