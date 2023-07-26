import { Grid, Typography } from '@mui/material';
import { useTranslations } from 'next-intl';
import { Flows } from '../../_enums/Flows';
import { AccordionCustom } from './accordion';

interface FAQProps {
  flow?: string;
}

interface FAQEntries {
  summary: string;
  details: string;
}

export const FAQ = ({ flow = Flows.DEFAULT }: FAQProps) => {
  const t = useTranslations('ioesco.commonfaq');
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
    {
      summary: t('meanrestoreaccess'),
      details: t('firstresponse'),
    },
    {
      summary: t('whenrestore'),
      details: t('firstresponse'),
    },
    {
      summary: t('whatrestorecode'),
      details: t('firstresponse'),
    },
    {
      summary: t('whatdonocode'),
      details: t('firstresponse'),
    },
    {
      summary: t('canrestorefromio'),
      details: t('firstresponse'),
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
