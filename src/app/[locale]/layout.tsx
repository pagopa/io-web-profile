import { NextIntlClientProvider } from 'next-intl';
import { notFound } from 'next/navigation';
import Footer from './_component/footer/footer';
import Header from './_component/header/header';
import SessionProviderComponent from './_component/sessionProvider';
import ThemeProviderComponent from './_component/themeProvider/themeProvider';
import { Providers } from './_redux/provider';

export async function generateStaticParams() {
  return [{ lang: 'it-IT' }, { lang: 'it' }];
}

const RootLayoutWithLocaleAndTheme = async ({
  children,
  params: { locale },
}: {
  readonly children: React.ReactNode;
  readonly params: {
    readonly locale: string;
  };
}): Promise<React.ReactElement> => {
  // eslint-disable-next-line functional/no-let
  let messages;
  try {
    messages = (await import(`../../dictionaries/${locale}.json`)).default;
  } catch (error) {
    notFound();
  }

  return (
    <html lang={locale}>
      <body style={{ margin: '0' }}>
        <Providers>
          <NextIntlClientProvider locale={locale} messages={messages}>
            <ThemeProviderComponent>
              <Header />
              <SessionProviderComponent>{children}</SessionProviderComponent>
              <Footer />
            </ThemeProviderComponent>
          </NextIntlClientProvider>
        </Providers>
      </body>
    </html>
  );
};

export default RootLayoutWithLocaleAndTheme;
