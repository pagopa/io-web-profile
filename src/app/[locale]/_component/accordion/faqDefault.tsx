import { Grid, Typography } from '@mui/material';
import { useTranslations } from 'next-intl';
import { AccordionCustom } from './accordion';

const enum Flows {
  DEFAULT = 'DEFAULT',
  BLOCK = 'BLOCK',
  RESTORE = 'RESTORE',
}

interface FAQProps {
  flow?: string;
}

interface FAQEntries {
  summary: string;
  details: string;
}

export const FAQ = ({ flow = Flows.DEFAULT }: FAQProps) => {
  const t = useTranslations('commonfaq');
  // #region entries
  const defaultEntries: FAQEntries[] = [
    {
      summary: t('firstquestion'),
      details: t('firstresponse'),
    },
    {
      summary: t('secondquestion'),
      details: t('firstresponse'),
    },
    {
      summary: t('thirdquestion'),
      details: t('firstresponse'),
    },
    {
      summary: t('fourthquestion'),
      details: t('firstresponse'),
    },
  ];

  const blockEntries: FAQEntries[] = [
    {
      summary: t('meanlockio'),
      details: t('firstresponse'),
    },
    {
      summary: t('utilitylockprofile'),
      details: t('firstresponse'),
    },
    {
      summary: t('lockaccessmessage'),
      details: t('firstresponse'),
    },
    {
      summary: t('loginafterlock'),
      details: t('firstresponse'),
    },
    {
      summary: t('securityidentity'),
      details: t('firstresponse'),
    },
    {
      summary: t('unlockprofile'),
      details: t('firstresponse'),
    },
  ];

  const restoreEntries: FAQEntries[] = [
    // TODO: implement translation keys
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
    switch (flow) {
      case Flows.BLOCK:
        return blockEntries;
      case Flows.RESTORE:
        return restoreEntries;
      default:
        return defaultEntries;
    }
  }
  // #endregion

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
            {t('faqtitle')}
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
};
