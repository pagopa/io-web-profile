import { defineRouting } from 'next-intl/routing';
import { defaultLocale, locales } from '../app/[locale]/_utils/common';

export const routing = defineRouting({
  locales,
  defaultLocale,
});
