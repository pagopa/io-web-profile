import React from 'react';
import { Grid, Typography } from '@mui/material';
import { AccordionCustom } from './accordion';

interface FAQProps {
  flow?: string;
}

interface FAQEntries {
  summary: string;
  details: string;
}

export function FAQ({ flow = 'DEFAULT' }: FAQProps) {
  // #region entries
  const defaultEntries: FAQEntries[] = [
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
        'Lorem ipsum dolor sit amet, conasectetur adipiscing lit, sed do eiusmod tempor incidisdunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    },
  ];

  const restoreEntries: FAQEntries[] = [
    {
      summary: "Cosa vuol dire ripristinare l'accesso a IO?",
      details:
        'Lorem ipsum dolor sit amet, consectur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    },
    {
      summary: "Quando è opportuno ripristinare l'accesso a IO?",
      details:
        'Lorem ipsum dolor sit amet, consectetur apiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    },
    {
      summary: "Cos'è il codice di ripristino?",
      details:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    },
    {
      summary: 'Cosa posso fare se non trovo il codice di ripristino?',
      details:
        'Lorem ipsum dolor sit amet, consectetur adipiscing lit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    },
    {
      summary: "Posso ripristinare l'accesso direttamente dall'app IO?",
      details:
        'Lorem ipsum dolor sit amet, consectetur adipiscing lit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    },
  ];

  function getEntriesByFlow(flow: string): FAQEntries[] {
    if (flow === 'RESTORE') {
      return restoreEntries;
    }
    return defaultEntries;
  }

  return (
    <>
      <Grid
        sx={{
          backgroundColor: 'background.default',
          pt: { xs: 4, sm: 4, md: 0 },
          pb: { xs: 4, sm: 4, md: 0 },
        }}
        container
      >
        <Grid item xs={1} />
        <Grid item xs={10} p={{ xs: 0, sm: 0, md: 10 }}>
          <Typography
            fontSize={32}
            fontWeight={700}
            py={0}
            px={0}
            color="text.primary"
            sx={{
              textAlign: 'center',
              pb: 5,
            }}
          >
            {'Dubbi o domande?'}
          </Typography>
          <AccordionCustom
            entries={getEntriesByFlow(flow)}
            summaryColor={'text.primary'}
            detailColor={'text.primary'}
          />{' '}
        </Grid>
        <Grid item xs={1} />
      </Grid>
    </>
  );
}
