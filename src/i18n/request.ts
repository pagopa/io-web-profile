import { getRequestConfig } from 'next-intl/server';
import { defaultLocale, locales } from '../app/[locale]/_utils/common';

export default getRequestConfig(async ({ locale: requested = defaultLocale }) => {
  const locale = locales.includes(requested) ? requested : defaultLocale;

  return {
    locale,
    messages: (await import(`../dictionaries/${locale}.json`)).default,
  };
});
