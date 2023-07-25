import createIntlMiddleware from 'next-intl/middleware';
import { NextRequest } from 'next/server';

export default async function middleware(request: NextRequest) {
  // const isLogged = request.cookies.get('token') ? true : false;
  const defaultLocale = request.headers.get('x-default-locale') || 'en';

  const handleI18nRouting = createIntlMiddleware({
    defaultLocale: 'it',
    locales: ['it', 'en'],
    localeDetection: false,
  });
  const response = handleI18nRouting(request);

  response.headers.set('x-default-locale', defaultLocale);

  return response;
}

export const config = {
  matcher: ['/((?!_next|.*\\..*).*)'],
};
