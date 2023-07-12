import { CompanyLinkType } from '@pagopa/mui-italia';
// import { CONFIG } from '../../config/env';

export type LangCode = 'it' | 'en';

export const pagoPALink: CompanyLinkType = {
  ariaLabel: 'Link: vai al sito di PagoPA S.p.A.',
  href: 'temp link',
};

declare const window: any;

export const LANGUAGES = {
  it: { it: 'Italiano' },
};
