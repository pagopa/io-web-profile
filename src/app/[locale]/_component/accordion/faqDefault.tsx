/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable sonarjs/no-duplicate-string */
import { useTranslations } from 'next-intl';
import { Accordion } from '@pagopa/pagopa-editorial-components';
import { Link, Typography } from '@mui/material';
import { Flows } from '../../_enums/Flows';
import { assistenceEmail, isBrowser, isDevMode } from '../../_utils/common';
import { ListComponent, ListItemComponent } from '../listComponents/ListComponents';
import { storageLocaleOps } from '../../_utils/storage';
import { ROUTES } from '../../_utils/routes';

type FAQProps = {
  flow?: string;
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

const baseUrl = isDevMode() ? 'http://localhost:3000' : 'https://ioapp.it';
const locale = isBrowser() && storageLocaleOps.read() ? storageLocaleOps.read() : 'it';

const restoreSecondRich = {
  link: (chunks: React.ReactNode) => (
    <Link href={`${baseUrl}/${locale}${ROUTES.LOGIN_L3}`} fontWeight={600}>
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
  div: () => <div id="digital_identity" />,
  br: () => <br />,
  ul: (chunks: React.ReactNode) => <ListComponent chunks={chunks} marginBottom="unset" />,
  li: (chunks: React.ReactNode) => <ListItemComponent chunks={chunks} />,
};

const fifthBlockFaqRick = {
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
      content: t.rich('blockfaq.thirdresponse', thirdBlockRich),
    },
    {
      header: t('blockfaq.fourthquestion'),
      content: t('blockfaq.fourthresponse'),
    },
    {
      header: t('blockfaq.fifthquestion'),
      content: t.rich('blockfaq.fifthresponse', fifthBlockFaqRick),
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
      <Typography>
        <Accordion
          accordionItems={getEntriesByFlow(flow)}
          theme="light"
          layout="center"
          title={t('common.faqtitle')}
        />
      </Typography>
    </>
  );
};
