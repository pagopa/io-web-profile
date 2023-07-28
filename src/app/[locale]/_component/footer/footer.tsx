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
          href: 'link',
          ariaLabel: ariaLabel('aboutus'),
          linkType: 'internal',
        },
        {
          label: t('media'),
          href: 'link',
          ariaLabel: ariaLabel('media'),
          linkType: 'internal',
        },
        {
          label: t('workwithus'),
          href: 'link',
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
          href: 'default link',
          ariaLabel: ariaLabel('privacypolicy'),
          linkType: 'internal',
        },
        {
          label: t('certifications'),
          href: 'link',
          ariaLabel: ariaLabel('certifications'),
          linkType: 'internal',
        },
        {
          label: t('informationssecurity'),
          href: 'link',
          ariaLabel: ariaLabel('informationssecurity'),
          linkType: 'internal',
        },
        {
          label: t('dataprotection'),
          href: 'link',
          ariaLabel: ariaLabel('dataprotection'),
          linkType: 'internal',
        },
        {
          label: t('cookiesperefercies'),
          // onClick: () => window.OneTrust.ToggleInfoDisplay(),
          ariaLabel: ariaLabel('cookiesperefercies'),
          linkType: 'internal',
        },
        {
          label: t('termsandcondition'),
          href: 'termini-di-servizio',
          ariaLabel: ariaLabel('termsandcondition'),
          linkType: 'internal',
        },
        {
          label: t('society'),
          href: 'link transparentcompany',
          ariaLabel: ariaLabel('society'),
          linkType: 'internal',
        },
        {
          label: t('disclosurepolicy'),
          href: 'link disclosurePolicy',
          ariaLabel: ariaLabel('disclosurepolicy'),
          linkType: 'internal',
        },
        {
          label: t('231model'),
          href: 'Model321',
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
          href: 'link linkedin',
          ariaLabel: socialAriaLabel('LinkedIn'),
        },
        {
          title: 'Twitter',
          icon: 'twitter',
          href: 'link twitter',
          ariaLabel: socialAriaLabel('Twitter'),
        },
        {
          icon: 'instagram',
          title: 'Instagram',
          href: 'link instagram',
          ariaLabel: socialAriaLabel('Instagram'),
        },
        {
          icon: 'medium',
          title: 'Medium',
          href: 'link medium',
          ariaLabel: socialAriaLabel('Medium'),
        },
      ],
      links: [],
    },
  };
  const postLoginLinks: FooterLinksType[] = [
    {
      label: t('privacypolicy'),
      href: 'CONFIG.FOOTER.LINK.PRIVACYPOLICY',
      ariaLabel: ariaLabel('privacypolicy'),
      linkType: 'internal',
    },
    {
      label: t('dataprotection'),
      href: 'CONFIG.FOOTER.LINK.PROTECTIONOFPERSONALDATA',
      ariaLabel: ariaLabel('dataprotection'),
      linkType: 'internal',
    },
    {
      label: t('termsandcondition'),
      href: 'CONFIG.FOOTER.LINK.TERMSANDCONDITIONS',
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
