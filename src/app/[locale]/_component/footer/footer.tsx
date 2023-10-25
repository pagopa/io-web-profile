'use client';
import {
  FooterLinksType,
  Footer as MuiItaliaFooter,
  PreLoginFooterLinksType,
} from '@pagopa/mui-italia/dist/components/Footer/Footer';
import { useTranslations } from 'next-intl';
import useLogin from '../../_hooks/useLogin';
import { storageLocaleOps } from '../../_utils/storage';
import { ROUTES } from '../../_utils/routes';
import { isBrowser, isDevMode } from '../../_utils/common';
import { LANGUAGES, pagoPALink } from './footerConfig';

type IOFooterProps = {
  onExit?: (exitAction: () => void) => void;
};

declare const OneTrust: {
  ToggleInfoDisplay: () => void;
};

export default function Footer({ onExit = (exitAction) => exitAction() }: IOFooterProps) {
  const t = useTranslations('ioesco.commonfooter');

  const handleCookiePreferencies = () => {
    OneTrust.ToggleInfoDisplay();
  };

  const ariaLabel = (label: string) => `Vai al Link: ${t(label)}`;
  const socialAriaLabel = (social: string) => `Link: Vai al sito ${social} di PagoPA S.p.A.`;
  const productListUrl = process.env.NEXT_PUBLIC_FOOTER_PRODUCT_LIST;

  const baseUrl = isDevMode() ? 'http://localhost:3000' : 'https://ioapp.it';
  const locale = isBrowser() && storageLocaleOps.read() ? storageLocaleOps.read() : 'it';
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
          label: t('pnrr'),
          href: 'https://www.pagopa.it/it/opportunita/pnrr/progetti/',
          ariaLabel: ariaLabel('pnrr'),
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
          href: `${baseUrl}/${locale}${ROUTES.PRIVACY_POLICY}`,
          ariaLabel: ariaLabel('privacypolicy'),
          linkType: 'internal',
        },
        {
          label: t('cookiesperefercies'),
          href: '', // FIX ME, WITHOUT HREF IT WILL GENERATE CONSOLE WARNING ON FOOTER COMPONENT (MUI ITALIA)
          onClick: handleCookiePreferencies,
          ariaLabel: ariaLabel('cookiesperefercies'),
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
      links: [
        {
          label: t('accessibility'),
          href: 'https://form.agid.gov.it/view/eca3487c-f3cb-40be-a590-212eafc70058/',
          ariaLabel: ariaLabel('accessibility'),
          linkType: 'internal',
        },
      ],
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
      label: t('cookiesperefercies'),
      href: '', // FIX ME, WITHOUT HREF IT WILL GENERATE CONSOLE WARNING ON FOOTER COMPONENT (MUI ITALIA)
      onClick: handleCookiePreferencies,
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
      label: t('accessibility'),
      href: 'https://form.agid.gov.it/view/eca3487c-f3cb-40be-a590-212eafc70058/',
      ariaLabel: ariaLabel('accessibility'),
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
      productsJsonUrl={productListUrl || undefined}
    />
  );
}
