'use client';
import {
  FooterLinksType,
  Footer as MuiItaliaFooter,
  PreLoginFooterLinksType,
} from '@pagopa/mui-italia/dist/components/Footer/Footer';
// import { CONFIG } from '../../config/env';
import { useTranslations } from 'next-intl';
import useLogin from '../../_hooks/useLogin';
import { LANGUAGES, pagoPALink } from './footerConfig';

type IOFooterProps = {
  productsJsonUrl?: string;
  onExit?: (exitAction: () => void) => void;
};

export default function Footer({
  productsJsonUrl,
  onExit = (exitAction) => exitAction(),
}: IOFooterProps) {
  const t = useTranslations('ioesco.commonfooter');

  const ariaLabel = (label: string) => `Vai al Link: ${t(label)}`;
  const socialAriaLabel = (social: string) => `Link: Vai al sito ${social} di PagoPA S.p.A.`;
  const preLoginLinks: PreLoginFooterLinksType = {
    // First column
    aboutUs: {
      title: undefined,
      links: [
        {
          label: t('aboutus'),
          href: 'https://www.pagopa.it/it/societa/chi-siamo/',
          ariaLabel: ariaLabel('aboutus'),
          linkType: 'internal',
        },
        {
          label: t('media'),
          href: 'https://www.pagopa.it/it/',
          ariaLabel: ariaLabel('media'),
          linkType: 'internal',
        },
        {
          label: t('workwithus'),
          href: 'https://www.pagopa.it/it/lavora-con-noi/',
          ariaLabel: ariaLabel('workwithus'),
          linkType: 'internal',
        },
      ],
    },
    // Third column
    resources: {
      title: t('resources'),
      links: [
        {
          label: t('privacypolicy'),
          href: 'https://www.pagopa.it/it/privacy-policy/',
          ariaLabel: ariaLabel('privacypolicy'),
          linkType: 'internal',
        },
        {
          label: t('certifications'),
          href: 'https://www.pagopa.it/it/certificazioni/',
          ariaLabel: ariaLabel('certifications'),
          linkType: 'internal',
        },
        {
          label: t('informationssecurity'),
          href: 'https://www.pagopa.it/it/politiche-per-la-sicurezza-delle-informazioni/',
          ariaLabel: ariaLabel('informationssecurity'),
          linkType: 'internal',
        },
        {
          label: t('dataprotection'),
          href: 'https://privacyportal-de.onetrust.com/webform/77f17844-04c3-4969-a11d-462ee77acbe1/9ab6533d-be4a-482e-929a-0d8d2ab29df8',
          ariaLabel: ariaLabel('dataprotection'),
          linkType: 'internal',
        },
        {
          label: t('cookiesperefercies'),
          href: '',
          // FIXME IOPID-566
          // onClick: () => window.OneTrust.ToggleInfoDisplay(),
          ariaLabel: ariaLabel('cookiesperefercies'),
          linkType: 'internal',
        },
        {
          label: t('termsandcondition'),
          href: 'https://www.pagopa.it/it/termini-e-condizioni-di-utilizzo-del-sito/',
          ariaLabel: ariaLabel('termsandcondition'),
          linkType: 'internal',
        },
        {
          label: t('society'),
          href: 'https://pagopa.portaleamministrazionetrasparente.it/',
          ariaLabel: ariaLabel('society'),
          linkType: 'internal',
        },
        {
          label: t('disclosurepolicy'),
          href: 'https://www.pagopa.it/it/responsible-disclosure-policy/',
          ariaLabel: ariaLabel('disclosurepolicy'),
          linkType: 'internal',
        },
        {
          label: t('231model'),
          href: 'https://pagopa.portaleamministrazionetrasparente.it/pagina746_altri-contenuti.html',
          ariaLabel: ariaLabel('231model'),
          linkType: 'internal',
        },
      ],
    },
    // Fourth column
    followUs: {
      title: t('followus'),
      socialLinks: [
        {
          icon: 'linkedin',
          title: 'LinkedIn',
          href: 'https://www.linkedin.com/company/pagopa/',
          ariaLabel: socialAriaLabel('LinkedIn'),
        },
        {
          title: 'Twitter',
          icon: 'twitter',
          href: 'https://twitter.com/pagopa',
          ariaLabel: socialAriaLabel('Twitter'),
        },
        {
          icon: 'instagram',
          title: 'Instagram',
          href: 'https://www.instagram.com/pagopaspa/',
          ariaLabel: socialAriaLabel('Instagram'),
        },
        {
          icon: 'medium',
          title: 'Medium',
          href: 'https://medium.com/pagopa-spa',
          ariaLabel: socialAriaLabel('Medium'),
        },
      ],
      links: [],
    },
  };
  const postLoginLinks: FooterLinksType[] = [
    {
      label: t('privacypolicy'),
      href: 'https://www.pagopa.it/it/privacy-policy/',
      ariaLabel: ariaLabel('privacypolicy'),
      linkType: 'internal',
    },
    {
      label: t('dataprotection'),
      href: 'https://privacyportal-de.onetrust.com/webform/77f17844-04c3-4969-a11d-462ee77acbe1/9ab6533d-be4a-482e-929a-0d8d2ab29df8',
      ariaLabel: ariaLabel('dataprotection'),
      linkType: 'internal',
    },
    {
      label: t('termsandcondition'),
      href: 'https://www.pagopa.it/it/termini-e-condizioni-di-utilizzo-del-sito/',
      ariaLabel: ariaLabel('termsandcondition'),
      linkType: 'internal',
    },
  ];

  const companyLegalInfo = (
    <>
      {t.rich('pagopalegal', {
        strong: (chunks) => <strong>{chunks}</strong>,
      })}
    </>
  );

  const { isLoggedIn } = useLogin();

  return (
    <MuiItaliaFooter
      companyLink={pagoPALink}
      postLoginLinks={postLoginLinks}
      preLoginLinks={preLoginLinks}
      legalInfo={companyLegalInfo}
      loggedUser={isLoggedIn}
      onExit={onExit}
      languages={LANGUAGES}
      // eslint-disable-next-line no-console
      onLanguageChanged={(language: string) => console.log(language)}
      currentLangCode="it"
      productsJsonUrl={productsJsonUrl}
    />
  );
}
