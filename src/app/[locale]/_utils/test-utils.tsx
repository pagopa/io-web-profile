import { vi } from 'vitest';
import { render, RenderResult } from '@testing-library/react';
import { AbstractIntlMessages, NextIntlClientProvider } from 'next-intl';
import { Provider } from 'react-redux';
import { UnknownAction, Dispatch } from '@reduxjs/toolkit';
import { store } from '../_redux/store';

export const renderWithProviders = async (
  component: React.ReactElement,
  locale: string = 'it',
  mockDispatch = true
): Promise<RenderResult> => {
  async function loadMessages(locale: string): Promise<AbstractIntlMessages | undefined> {
    try {
      const messagesModule = await import(`../../../dictionaries/${locale}.json`);

      return messagesModule.default;
    } catch (error) {
      console.error('Error loading messages:', error);
      return {};
    }
  }

  const messages = await loadMessages(locale);

  if (mockDispatch) {
    // eslint-disable-next-line functional/immutable-data
    store.dispatch = vi.fn() as Dispatch<UnknownAction>;
  }

  return render(
    <NextIntlClientProvider messages={messages} locale={locale}>
      <Provider store={store}>{component}</Provider>
    </NextIntlClientProvider>
  );
};
