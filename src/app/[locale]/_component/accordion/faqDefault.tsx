/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable sonarjs/no-duplicate-string */
import { useTranslations } from 'next-intl';
import { Link, Typography } from '@mui/material';
import { theme } from '@pagopa/mui-italia';
import { Flows } from '../../_enums/Flows';
import { assistenceEmail, isBrowser, localeFromStorage } from '../../_utils/common';
import { ListComponent, ListItemComponent } from '../listComponents/ListComponents';
import { ROUTES } from '../../_utils/routes';
import { Accordion } from './accordion';

type FAQProps = {
  flow?: string;
  onToogleFAQ?: (isOpen: boolean, element: number) => void;
};
// the 'content' property is set to any because
// the library from which we imported the accordion
// does not accept the type we need.
// string | ReactElement<any, string |
// JSXElementConstructor<any>> | ReactNodeArray
// We use a different type because we have t.rich which
// allows us to create a React node
// FIXME => Add correct type to the @pagopa/pagopa-editorial-components
// into AccordionItemProps type, into the "content" prop
type FAQEntries = {
  header: string;
  content: any;
};

const baseUrl = isBrowser() && window.location.origin;

const firstBlockRich = {
  br: () => <br />,
};

const restoreSecondRich = {
  link: (chunks: React.ReactNode) => (
    <Link href={`${baseUrl}/${localeFromStorage}${ROUTES.LOGIN_L3}`} fontWeight={600}>
      {chunks}
    </Link>
  ),
  u: (chunks: React.ReactNode) => (
    <Link target="_blank" fontWeight={600} href={`mailto:${assistenceEmail}`}>
      {chunks}
    </Link>
  ),
};

const thirdBlockRich = {
  link: (chunks: React.ReactNode) => (
    <Link
      target="_blank"
      fontWeight={600}
      href="https://www.cartaidentita.interno.gov.it/info-utili/identificazione-digitale/#:~:text=livello%201%3A%20accesso%20mediante%20una,per%20la%20lettura%20della%20CIE"
    >
      {chunks}
    </Link>
  ),
  strong: (chunks: React.ReactNode) => <strong>{chunks}</strong>,
  div: () => <div id="digital_identity" />,
  br: () => <br />,
  ul: (chunks: React.ReactNode) => <ListComponent chunks={chunks} marginBottom="unset" />,
  li: (chunks: React.ReactNode) => <ListItemComponent chunks={chunks} />,
};

const fifthBlockFaqRich = {
  link: (chunks: React.ReactNode) => (
    <Link
      target="_blank"
      fontWeight={600}
      href="https://www.cartaidentita.interno.gov.it/pgic/login/recupera-password"
    >
      {chunks}
    </Link>
  ),
};
const fifthRevokeWalletFaqRich = {
  link: (chunks: React.ReactNode) => {
    return (
      <Link fontWeight={600} href={`/${baseUrl}/${localeFromStorage}${ROUTES.PROFILE_BLOCK}`}>
        {chunks}
      </Link>
    );
  },
};

export const FAQ = ({ flow = Flows.LOGOUT, onToogleFAQ }: FAQProps) => {
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
      content: t.rich('blockfaq.firstresponse', firstBlockRich),
    },
    {
      header: t('blockfaq.secondquestion'),
      content: t('blockfaq.secondresponse'),
    },
    {
      header: t('blockfaq.thirdquestion'),
      content: t.rich('blockfaq.thirdresponse', thirdBlockRich),
    },
    {
      header: t('blockfaq.fourthquestion'),
      content: t('blockfaq.fourthresponse'),
    },
    {
      header: t('blockfaq.fifthquestion'),
      content: t.rich('blockfaq.fifthresponse', fifthBlockFaqRich),
    },
  ];

  const restoreEntries: FAQEntries[] = [
    {
      header: t('restorefaq.firstquestion'),
      content: t('restorefaq.firstresponse'),
    },
    {
      header: t('restorefaq.secondquestion'),
      content: t.rich('restorefaq.secondresponse', restoreSecondRich),
    },
    {
      header: t('blockfaq.thirdquestion'),
      content: t.rich('blockfaq.thirdresponse', thirdBlockRich),
    },
  ];

  const restoreEntriesL3: FAQEntries[] = [
    {
      header: t('restorefaq.firstquestion'),
      content: t('restorefaq.firstresponse'),
    },
    {
      header: t('blockfaq.thirdquestion'),
      content: t.rich('blockfaq.thirdresponse', thirdBlockRich),
    },
  ];

  const revokeWallet: FAQEntries[] = [
    {
      header: t('revokewalletfaq.firstquestion'),
      content: t('revokewalletfaq.firstresponse'),
    },
    {
      header: t('revokewalletfaq.secondquestion'),
      content: t('revokewalletfaq.secondresponse'),
    },
    {
      header: t('revokewalletfaq.thirdquestion'),
      content: t('revokewalletfaq.thirdresponse'),
    },
    {
      header: t('revokewalletfaq.fourthquestion'),
      content: t('revokewalletfaq.fourthresponse'),
    },
    {
      header: t('revokewalletfaq.fifthquestion'),
      content: t.rich('revokewalletfaq.fifthresponse', fifthRevokeWalletFaqRich),
    },
  ];

  const wrappingFaqContent = (entries: FAQEntries[]): FAQEntries[] => {
    const updatedEntries: FAQEntries[] = entries.map(entry => ({
      ...entry,
      content: <span style={{ fontSize: theme.typography.body2.fontSize }}>{entry.content}</span>,
    }));
    return updatedEntries;
  };

  function getEntriesByFlow(flow: string): FAQEntries[] {
    switch (flow) {
      case Flows.BLOCK:
        return wrappingFaqContent(blockEntries);
      case Flows.RESTORE:
        return wrappingFaqContent(restoreEntries);
      case Flows.RESTOREL3:
        return wrappingFaqContent(restoreEntriesL3);
      case Flows.REVOKEWALLET:
        return wrappingFaqContent(revokeWallet);
      default:
        return wrappingFaqContent(logoutEntries);
    }
  }
  // #endregion

  return (
    <Typography>
      <Accordion
        accordionItems={getEntriesByFlow(flow)}
        theme="light"
        layout="center"
        title={t('common.faqtitle')}
        onToogleAccordion={onToogleFAQ}
      />
    </Typography>
  );
};
