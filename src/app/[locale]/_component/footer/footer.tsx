/* eslint-disable max-lines-per-function */
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
          ariaLabel: ariaLabel('aboutus'),
          linkType: 'internal',
          onClick: () => window.open('https://www.pagopa.it/it/societa/chi-siamo/', '_blank'),
        },
        {
          label: t('pnrr'),
          ariaLabel: ariaLabel('pnrr'),
          linkType: 'internal',
          onClick: () =>
            window.open('https://www.pagopa.it/it/opportunita/pnrr/progetti/', '_blank'),
        },
        {
          label: t('media'),
          ariaLabel: ariaLabel('media'),
          linkType: 'internal',
          onClick: () => window.open('https://www.pagopa.it/it/', '_blank'),
        },
        {
          label: t('workwithus'),
          ariaLabel: ariaLabel('workwithus'),
          linkType: 'internal',
          onClick: () => window.open('https://www.pagopa.it/it/lavora-con-noi/', '_blank'),
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
          onClick: handleCookiePreferencies,
          ariaLabel: ariaLabel('cookiesperefercies'),
          linkType: 'internal',
        },
        {
          label: t('certifications'),
          ariaLabel: ariaLabel('certifications'),
          linkType: 'internal',
          onClick: () => window.open('https://www.pagopa.it/it/certificazioni/', '_blank'),
        },
        {
          label: t('informationssecurity'),
          ariaLabel: ariaLabel('informationssecurity'),
          linkType: 'internal',
          onClick: () =>
            window.open(
              'https://www.pagopa.it/it/politiche-per-la-sicurezza-delle-informazioni/',
              '_blank'
            ),
        },
        {
          label: t('dataprotection'),
          ariaLabel: ariaLabel('dataprotection'),
          linkType: 'internal',
          onClick: () =>
            window.open(
              'https://privacyportal-de.onetrust.com/webform/77f17844-04c3-4969-a11d-462ee77acbe1/9ab6533d-be4a-482e-929a-0d8d2ab29df8',
              '_blank'
            ),
        },
        {
          label: t('society'),
          ariaLabel: ariaLabel('society'),
          linkType: 'internal',
          onClick: () =>
            window.open('https://pagopa.portaleamministrazionetrasparente.it/', '_blank'),
        },
        {
          label: t('disclosurepolicy'),
          ariaLabel: ariaLabel('disclosurepolicy'),
          linkType: 'internal',
          onClick: () =>
            window.open('https://www.pagopa.it/it/responsible-disclosure-policy/', '_blank'),
        },
        {
          label: t('231model'),
          ariaLabel: ariaLabel('231model'),
          linkType: 'internal',
          onClick: () =>
            window.open(
              'https://pagopa.portaleamministrazionetrasparente.it/pagina746_altri-contenuti.html',
              '_blank'
            ),
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
          ariaLabel: socialAriaLabel('LinkedIn'),
          onClick: () => window.open('https://www.linkedin.com/company/pagopa/', '_blank'),
        },
        {
          title: 'Twitter',
          icon: 'twitter',
          ariaLabel: socialAriaLabel('Twitter'),
          onClick: () => window.open('https://twitter.com/pagopa', '_blank'),
        },
        {
          icon: 'instagram',
          title: 'Instagram',
          ariaLabel: socialAriaLabel('Instagram'),
          onClick: () => window.open('https://www.instagram.com/pagopaspa/', '_blank'),
        },
        {
          icon: 'medium',
          title: 'Medium',
          ariaLabel: socialAriaLabel('Medium'),
          onClick: () => window.open('https://medium.com/pagopa-spa', '_blank'),
        },
      ],
      links: [
        {
          label: t('accessibility'),
          ariaLabel: ariaLabel('accessibility'),
          linkType: 'internal',
          onClick: () =>
            window.open(
              'https://form.agid.gov.it/view/eca3487c-f3cb-40be-a590-212eafc70058/',
              '_blank'
            ),
        },
      ],
    },
  };
  const postLoginLinks: FooterLinksType[] = [
    {
      label: t('privacypolicy'),
      href: `${baseUrl}/${locale}${ROUTES.PRIVACY_POLICY}`,
      ariaLabel: ariaLabel('privacypolicy'),
      linkType: 'internal',
    },
    {
      label: t('cookiesperefercies'),
      ariaLabel: ariaLabel('cookiesperefercies'),
      linkType: 'internal',
      onClick: handleCookiePreferencies,
    },
    {
      label: t('accessibility'),
      ariaLabel: ariaLabel('accessibility'),
      linkType: 'internal',
      // eslint-disable-next-line sonarjs/no-identical-functions
      onClick: () =>
        window.open(
          'https://form.agid.gov.it/view/eca3487c-f3cb-40be-a590-212eafc70058/',
          '_blank'
        ),
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
