import { Grid, Typography } from '@mui/material';
import { useTranslations } from 'next-intl';
import { Flows } from '../../_enums/Flows';
import { AccordionCustom } from './accordion';

type FAQProps = {
  flow?: string;
};

type FAQEntries = {
  summary: string;
  details: string;
};

export const FAQ = ({ flow = Flows.DEFAULT }: FAQProps) => {
  const t = useTranslations('ioesco');
  // #region entries
  const defaultEntries: FAQEntries[] = [
    {
      summary: t('commonfaq.firstquestion'),
      details: t('commonfaq.firstresponse'),
    },
    {
      summary: t('commonfaq.secondquestion'),
      details: t('commonfaq.secondresponse'),
    },
    {
      summary: t('commonfaq.thirdquestion'),
      details: t('commonfaq.thirdresponse'),
    },
    {
      summary: t('commonfaq.fourthquestion'),
      details: t('commonfaq.fourthresponse'),
    },
  ];

  const blockEntries: FAQEntries[] = [
    {
      summary: t('commonfaq.utilitylockprofile'),
      details: t('commonfaq.utilitylockprofileresponse'),
    },
    {
      summary: t('common.lockioaccess'),
      details: t('commonfaq.lockioaccessresponse'),
    },
    {
      summary: t('commonfaq.lockaccessmessage'),
      details: t('commonfaq.lockaccessmessageresponse'),
    },
    {
      summary: t('commonfaq.loginafterlock'),
      details: t('commonfaq.loginafterlockresponse'),
    },
    {
      summary: t('commonfaq.securityidentity'),
      details: t('commonfaq.securityidentityresponse'),
    },
    {
      summary: t('commonfaq.unlockprofile'),
      details: t('commonfaq.unlockprofileresponse'),
    },
  ];

  const restoreEntries: FAQEntries[] = [
    {
      summary: t('commonfaq.firstquestion'),
      details: t('commonfaq.firstresponse'),
    },
    {
      summary: t('commonfaq.whenrestore'),
      details: t('commonfaq.whenrestoreresponse'),
    },
    {
      summary: t('commonfaq.whatrestorecode'),
      details: t('commonfaq.whatrestorecoderesponse'),
    },
    {
      summary: t('commonfaq.whatdonocode'),
      details: t('commonfaq.whatdonocoderesponse'),
    },
    {
      summary: t('commonfaq.canrestorefromio'),
      details: t('commonfaq.canrestorefromioresponse'),
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
            {t('commonfaq.faqtitle')}
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
