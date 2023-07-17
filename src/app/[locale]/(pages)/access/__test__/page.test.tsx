import { render, screen } from '@testing-library/react';
import { NextIntlProvider } from 'next-intl';
import Access from '../page';

describe('test suite for Access component', () => {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const useRouter = jest.spyOn(require('next/router'), 'useRouter');
  const locale = 'it';

  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const messages = require(`../../../../../dictionaries/${locale}.json`);

  useRouter.mockImplementationOnce(() => ({
    query: { locale },
  }));

  test('should render component Access', () => {
    render(
      <NextIntlProvider messages={messages} locale={locale}>
        <Access />
      </NextIntlProvider>
    );
    expect(screen.getByText('Non hai più il tuo dispositivo?'));
  });
});
