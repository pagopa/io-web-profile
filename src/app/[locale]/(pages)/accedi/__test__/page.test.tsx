import { render, screen } from '@testing-library/react';
import { NextIntlProvider } from 'next-intl';
import Access from '../page';

beforeEach(() => {
  jest.mock('next-intl/client', () => ({
    useRouter() {
      return {
        push: () => jest.fn(),
        replace: () => jest.fn(),
      };
    },
  }));
});

describe('test suite for Access component', () => {
  const locale = 'it';

  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const messages = require(`../../../../../dictionaries/${locale}.json`);

  test('should render component Access', () => {
    render(
      <NextIntlProvider messages={messages} locale={locale}>
        <Access />
      </NextIntlProvider>
    );
    expect(screen.getByText('Non hai più il tuo dispositivo?'));
  });
});
