import createIntlMiddleware from 'next-intl/middleware';
import { NextRequest } from 'next/server';

export default async function middleware(request: NextRequest) {
  const defaultLocale = request.headers.get('x-default-locale') || 'en';

  const handleI18nRouting = createIntlMiddleware({
    defaultLocale: 'it',
    locales: ['it', 'en'],
    localeDetection: false,
  });
  const response = handleI18nRouting(request);

  response.headers.set('x-default-locale', defaultLocale);

  // TO BE FIXED AFTER 404 MEETING
  // if (!EXISTING_ROUTES.includes(request.nextUrl.pathname)) {
  //   return NextResponse.redirect(new URL(ROUTES.LOGIN, request.url));
  // }

  return response;
}

export const config = {
  matcher: ['/((?!_next|.*\\..*).*)'],
};
