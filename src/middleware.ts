import createIntlMiddleware from 'next-intl/middleware';
import { NextRequest, NextResponse } from 'next/server';
import { LOGIN_ROUTES, PUBBLIC_ROUTES, ROUTES } from './app/[locale]/_utils/routes';

export default async function middleware(request: NextRequest) {
  const isLogged = request.cookies.get('token') ? true : false;
  const defaultLocale = request.headers.get('x-default-locale') || 'en';
  const cleanPath = (path: string): string => path.replace(/^(\/(en|it))\/(.*)$/, '');

  const handleI18nRouting = createIntlMiddleware({
    defaultLocale: 'it',
    locales: ['it', 'en'],
    localeDetection: false,
  });
  const response = handleI18nRouting(request);

  response.headers.set('x-default-locale', defaultLocale);

  if (LOGIN_ROUTES.includes(cleanPath(request.nextUrl.pathname)) && isLogged) {
    response.cookies.delete('token');
    response.cookies.delete('user');
  }

  if (!PUBBLIC_ROUTES.includes(cleanPath(request.nextUrl.pathname)) && !isLogged) {
    return NextResponse.redirect(new URL(ROUTES.LOGIN, request.url));
  }

  return response;
}

export const config = {
  matcher: ['/((?!_next|.*\\..*).*)'],
};
