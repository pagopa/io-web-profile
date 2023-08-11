import { render, RenderResult } from '@testing-library/react';
import { AbstractIntlMessages, NextIntlProvider } from 'next-intl';

export const renderWithProviders = async (
  component: React.ReactElement,
  locale: string = 'it'
): Promise<RenderResult> => {
  async function loadMessages(locale: string): Promise<AbstractIntlMessages | undefined> {
    try {
      const messagesModule = await import(`../../../dictionaries/${locale}.json`);

      return messagesModule.default;
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error('Error loading messages:', error);
      return {};
    }
  }

  const messages = await loadMessages(locale);

  return render(
    <NextIntlProvider messages={messages} locale={locale}>
      {component}
    </NextIntlProvider>
  );
};
