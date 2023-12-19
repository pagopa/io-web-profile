/* eslint-disable sonarjs/no-duplicate-string */
import { useTranslations } from 'next-intl';
import { Accordion } from '@pagopa/pagopa-editorial-components';
import { Flows } from '../../_enums/Flows';

type FAQProps = {
  flow?: string;
};

type FAQEntries = {
  header: string;
  content: string;
};

export const FAQ = ({ flow = Flows.LOGOUT }: FAQProps) => {
  const t = useTranslations('ioesco');
  // #region entries
  const logoutEntries: FAQEntries[] = [
    {
      header: t('logoutfaq.firstquestion'),
      content: t('logoutfaq.firstresponse'),
    },
    {
      header: t('logoutfaq.secondquestion'),
      content: t('logoutfaq.secondresponse'),
    },
    {
      header: t('logoutfaq.thirdquestion'),
      content: t('logoutfaq.thirdresponse'),
    },
  ];

  const blockEntries: FAQEntries[] = [
    {
      header: t('blockfaq.firstquestion'),
      content: t('blockfaq.firstresponse'),
    },
    {
      header: t('blockfaq.secondquestion'),
      content: t('blockfaq.secondresponse'),
    },
    {
      header: t('blockfaq.thirdquestion'),
      content: t('blockfaq.thirdresponse'),
    },
    {
      header: t('blockfaq.fourthquestion'),
      content: t('blockfaq.fourthresponse'),
    },
    {
      header: t('blockfaq.fifthquestion'),
      content: t('blockfaq.fifthresponse'),
    },
  ];

  const restoreEntries: FAQEntries[] = [
    {
      header: t('restorefaq.firstquestion'),
      content: t('restorefaq.firstresponse'),
    },
    {
      header: t('restorefaq.secondquestion'),
      content: t('restorefaq.secondresponse'),
    },
    {
      header: t('blockfaq.thirdquestion'),
      content: t('blockfaq.thirdresponse'),
    },
  ];

  const restoreEntriesL3: FAQEntries[] = [
    {
      header: t('restorefaq.firstquestion'),
      content: t('restorefaq.firstresponse'),
    },
    {
      header: t('blockfaq.thirdquestion'),
      content: t('blockfaq.thirdresponse'),
    },
  ];

  function getEntriesByFlow(flow: string): FAQEntries[] {
    switch (flow) {
      case Flows.BLOCK:
        return blockEntries;
      case Flows.RESTORE:
        return restoreEntries;
      case Flows.RESTOREL3:
        return restoreEntriesL3;
      default:
        return logoutEntries;
    }
  }
  // #endregion

  return (
    <>
      <Accordion
        accordionItems={getEntriesByFlow(flow)}
        theme="light"
        layout="center"
        title={t('common.faqtitle')}
      />
    </>
  );
};
