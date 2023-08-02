import createIntlMiddleware from 'next-intl/middleware';
import { NextRequest, NextResponse } from 'next/server';
import { EXISTING_ROUTES, ROUTES } from './app/[locale]/_utils/routes';

export default async function middleware(request: NextRequest) {
  const defaultLocale = request.headers.get('x-default-locale') || 'en';

  const handleI18nRouting = createIntlMiddleware({
    defaultLocale: 'it',
    locales: ['it', 'en'],
    localeDetection: false,
  });
  const response = handleI18nRouting(request);

  response.headers.set('x-default-locale', defaultLocale);

  if (!EXISTING_ROUTES.includes(request.nextUrl.pathname)) {
    return NextResponse.redirect(new URL(ROUTES.LOGIN, request.url));
  }

  return response;
}

export const config = {
  matcher: ['/((?!_next|.*\\..*).*)'],
};
