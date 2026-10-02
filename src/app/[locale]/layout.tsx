import { NextIntlClientProvider } from 'next-intl';
import { getMessages, getTranslations } from 'next-intl/server';
import { ReactNode, Suspense } from 'react';
import SessionProviderComponent from '../[locale]/_component/sessionProvider';
import ThemeProviderComponent from './_component/themeProvider/themeProvider';
import { Providers } from './_redux/provider';
import Loader from './_component/loader/loader';
import { routing } from '../../i18n/routing';

export type Props = {
  children: ReactNode;
  params: Promise<{ locale: string }>;
};

export async function generateStaticParams() {
  return routing.locales.map(locale => ({ locale }));
}

export async function generateMetadata() {
  const t = await getTranslations('ioesco.metadati');

  return {
    title: t('profilotitle'),
    description: t('profilodescription'),
  };
}

export default async function RootLayoutWithLocaleAndTheme({ children, params }: Props) {
  const { locale } = await params;

  const messages = await getMessages({ locale });

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
