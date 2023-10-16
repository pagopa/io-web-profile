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

export const FAQ = ({ flow = Flows.DEFAULT }: FAQProps) => {
  const t = useTranslations('ioesco');
  // #region entries
  const defaultEntries: FAQEntries[] = [
    {
      header: t('commonfaq.firstquestion'),
      content: t('commonfaq.firstresponse'),
    },
    {
      header: t('commonfaq.secondquestion'),
      content: t('commonfaq.secondresponse'),
    },
    {
      header: t('commonfaq.thirdquestion'),
      content: t('commonfaq.thirdresponse'),
    },
    {
      header: t('commonfaq.fourthquestion'),
      content: t('commonfaq.fourthresponse'),
    },
  ];

  const blockEntries: FAQEntries[] = [
    {
      header: t('commonfaq.utilitylockprofile'),
      content: t('commonfaq.utilitylockprofileresponse'),
    },
    {
      header: t('common.lockioaccess'),
      content: t('commonfaq.lockioaccessresponse'),
    },
    {
      header: t('commonfaq.lockaccessmessage'),
      content: t('commonfaq.lockaccessmessageresponse'),
    },
    {
      header: t('commonfaq.loginafterlock'),
      content: t('commonfaq.loginafterlockresponse'),
    },
    {
      header: t('commonfaq.securityidentity'),
      content: t('commonfaq.securityidentityresponse'),
    },
    {
      header: t('commonfaq.unlockprofile'),
      content: t('commonfaq.unlockprofileresponse'),
    },
  ];

  const restoreEntries: FAQEntries[] = [
    {
      header: t('commonfaq.firstquestion'),
      content: t('commonfaq.firstresponse'),
    },
    {
      header: t('commonfaq.whenrestore'),
      content: t('commonfaq.whenrestoreresponse'),
    },
    {
      header: t('commonfaq.whatrestorecode'),
      content: t('commonfaq.whatrestorecoderesponse'),
    },
    {
      header: t('commonfaq.whatdonocode'),
      content: t('commonfaq.whatdonocoderesponse'),
    },
    {
      header: t('commonfaq.canrestorefromio'),
      content: t('commonfaq.canrestorefromioresponse'),
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
      <Accordion
        accordionItems={getEntriesByFlow(flow)}
        theme="light"
        layout="center"
        title={t('commonfaq.faqtitle')}
      />
    </>
  );
};
