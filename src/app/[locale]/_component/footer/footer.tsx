/* eslint-disable no-console */
'use client';
/* eslint-disable functional/prefer-readonly-type */
/* eslint-disable sort-keys */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable max-lines-per-function */
import {
  Footer as MuiItaliaFooter,
  FooterLinksType,
  PreLoginFooterLinksType,
} from '@pagopa/mui-italia/dist/components/Footer/Footer';
// import { Trans, useTranslation } from 'react-i18next';
// import i18n from '../../locale/locale-utils';
// import { CONFIG } from '../../config/env';
import { LANGUAGES, pagoPALink } from './footerConfig';

interface IOFooterProps {
  loggedUser: boolean;
  productsJsonUrl?: string;
  onExit?: (exitAction: () => void) => void;
}
// eslint-disable-next-line @typescript-eslint/no-explicit-any
declare const window: any;
// eslint-disable-next-line sonarjs/cognitive-complexity
export default function Footer({
  loggedUser,
  productsJsonUrl,
  onExit = (exitAction) => exitAction(),
}: IOFooterProps) {
  //  const { t } = useTranslation();
  /*

  // TODO Temporary solution, will be changed as soon as possible
  const isPnpgDev =
    window.location.hostname?.startsWith('pnpg.dev') ||
    window.location.hostname?.startsWith('imprese.dev');
  const isPnpgUat =
    window.location.hostname?.startsWith('pnpg.uat') ||
    window.location.hostname?.startsWith('imprese.uat');
  const isPnpg =
    window.location.hostname?.startsWith('pnpg.selfcare') ||
    window.location.hostname?.startsWith('imprese.notifichedigitali');
*/
  const preLoginLinks: PreLoginFooterLinksType = {
    // First column
    aboutUs: {
      title: undefined,
      links: [
        // TODO
        // {
        //   label: 'PNRR',
        //   href: 'CONFIG.FOOTER.LINK.PNRR',
        //   ariaLabel: 'Vai al link: PNRR',
        //   linkType: 'internal',
        // },
        {
          label: 'about',
          href: 'link',
          ariaLabel: 'Vai al link: Chi siamo',
          linkType: 'internal',
        },
        {
          label: 'media',
          href: 'link',
          ariaLabel: 'Vai al link: Media',
          linkType: 'internal',
        },
        {
          label: 'workwithud',
          href: 'link',
          ariaLabel: 'Vai al link: Lavora con noi',
          linkType: 'internal',
        },
      ],
    },
    // Third column
    resources: {
      title: 'tittle',
      links: [
        {
          label: 'privacy',
          href: 'default link',
          ariaLabel: 'Vai al link: Privacy Policy',
          linkType: 'internal',
        },
        {
          label: 'certifications',
          href: 'link',
          ariaLabel: 'Vai al link: Certificazioni',
          linkType: 'internal',
        },
        {
          label: 'informationSecurity',
          href: 'link',
          ariaLabel: 'Vai al link: Sicurezza delle informazioni',
          linkType: 'internal',
        },
        {
          label: 'protectionofpersonaldata',
          href: 'link',
          ariaLabel: 'Vai al link: Diritto alla protezione dei dati personali',
          linkType: 'internal',
        },
        {
          label: 'cookie',
          onClick: () => window.OneTrust.ToggleInfoDisplay(),
          ariaLabel: 'Vai al link: Preferenze Cookie',
          linkType: 'internal',
        },
        {
          label: 'termsandconditions',
          href: 'termini-di-servizio',
          ariaLabel: 'Vai al link: Termini e Condizioni',
          linkType: 'internal',
        },
        {
          label: 'transparentcompany',
          href: 'link transparentcompany',
          ariaLabel: 'Vai al link: Società trasparente',
          linkType: 'internal',
        },
        {
          label: 'disclosurePolicy',
          href: 'link disclosurePolicy',
          ariaLabel: 'Vai al link: Responsible Disclosure Policy',
          linkType: 'internal',
        },
        {
          label: 'Model321',
          href: 'Model321',
          ariaLabel: 'Vai al link: Modello 321',
          linkType: 'internal',
        },
      ],
    },
    // Fourth column
    followUs: {
      title: 'title',
      socialLinks: [
        {
          icon: 'linkedin',
          title: 'LinkedIn',
          href: 'link linked in',
          ariaLabel: 'Link: vai al sito LinkedIn di PagoPA S.p.A.',
        },
        {
          title: 'Twitter',
          icon: 'twitter',
          href: 'link twitter',
          ariaLabel: 'Link: vai al sito Twitter di PagoPA S.p.A.',
        },
        {
          icon: 'instagram',
          title: 'Instagram',
          href: 'link instagram',
          ariaLabel: 'Link: vai al sito Instagram di PagoPA S.p.A.',
        },
        {
          icon: 'medium',
          title: 'Medium',
          href: 'link medium',
          ariaLabel: 'Link: vai al sito Medium di PagoPA S.p.A.',
        },
      ],
      links: [
        // TODO
        // {
        //   label: 'Accessibilità',
        //   href: CONFIG.FOOTER.LINK.ACCESSIBILITY,
        //   ariaLabel: 'Vai al link: Accessibilità',
        //   linkType: 'internal',
        // },
      ],
    },
  };
  const postLoginLinks: FooterLinksType[] = [
    {
      label: 'privacyPolicy',
      href: 'CONFIG.FOOTER.LINK.PRIVACYPOLICY',
      ariaLabel: 'Vai al link: Privacy policy',
      linkType: 'internal',
    },
    {
      label: 'protectionofpersonaldata',
      href: 'CONFIG.FOOTER.LINK.PROTECTIONOFPERSONALDATA',
      ariaLabel: 'Vai al link: Diritto alla protezione dei dati personali',
      linkType: 'internal',
    },
    {
      label: 'termsandconditions',
      href: 'CONFIG.FOOTER.LINK.TERMSANDCONDITIONS',
      ariaLabel: 'Vai al link: Termini e condizioni',
      linkType: 'internal',
    },
    // TODO
    // {
    //   label: 'Accessibilità',
    //   href: CONFIG.FOOTER.LINK.ACCESSIBILITY,
    //   ariaLabel: 'Vai al link: Accessibilità',
    //   linkType: 'internal',
    // },
  ];
  const companyLegalInfo = (
    <p>
      <strong>PagoPA S.p.A.</strong> - Società per azioni con socio unico - Capitale sociale di euro
      1,000,000 interamente versato - Sede legale in Roma, Piazza Colonna 370, <br />
      CAP 00187 - N. di iscrizione a Registro Imprese di Roma, CF e P.IVA 15376371009
    </p>
  );

  return (
    <MuiItaliaFooter
      companyLink={pagoPALink}
      postLoginLinks={postLoginLinks}
      preLoginLinks={preLoginLinks}
      legalInfo={companyLegalInfo}
      loggedUser={loggedUser}
      onExit={onExit}
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      languages={LANGUAGES as any}
      onLanguageChanged={(language: string) => console.log(language)}
      currentLangCode="it"
      productsJsonUrl={productsJsonUrl}
    />
  );
}
