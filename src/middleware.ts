import createMiddleware from 'next-intl/middleware';

export default createMiddleware({
  defaultLocale: 'it',
  locales: ['it', 'en'],
});

export const config = {
  matcher: ['/((?!api|_next|.*\\..*).*)'],
};
