import { NextIntlClientProvider } from 'next-intl';

import { notFound } from 'next/navigation';

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
      <body>
        <NextIntlClientProvider locale={locale} messages={messages}>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
};

export default RootLayoutWithLocaleAndTheme;
