import { NextIntlClientProvider } from 'next-intl';
import { ReactNode, Suspense } from 'react';
import SessionProviderComponent from '../[locale]/_component/sessionProvider';
import ThemeProviderComponent from './_component/themeProvider/themeProvider';
import { Providers } from './_redux/provider';
import { localeList, defaultLocale } from './_utils/common';
import Loader from './_component/loader/loader';

export type Props = {
  children: ReactNode;
  params: { locale: string };
};

export async function generateStaticParams() {
  return localeList.map(locale => ({ locale }));
}

async function getMessages(locale: string) {
  try {
    return (await import(`../../dictionaries/${locale}.json`)).default;
  } catch (error) {
    return (await import(`../../dictionaries/${defaultLocale}.json`)).default;
  }
}

export async function generateMetadata({ params }: Props) {
  const { locale } = params;
  const messages = (await import(`../../dictionaries/${locale}.json`)).default;

  return {
    title: messages.ioesco.metadati.profilotitle,
    description: messages.ioesco.metadati.profilodescription,
  };
}

export default async function RootLayoutWithLocaleAndTheme({
  children,
  params: { locale },
}: Props) {
  const messages = await getMessages(locale);

  return (
    <html lang={locale}>
      <body style={{ margin: '0' }}>
        <Suspense fallback={<Loader />}>
          <Providers>
            <NextIntlClientProvider locale={locale} messages={messages}>
              <ThemeProviderComponent>
                <SessionProviderComponent>{children}</SessionProviderComponent>
              </ThemeProviderComponent>
            </NextIntlClientProvider>
          </Providers>
        </Suspense>
      </body>
    </html>
  );
}
