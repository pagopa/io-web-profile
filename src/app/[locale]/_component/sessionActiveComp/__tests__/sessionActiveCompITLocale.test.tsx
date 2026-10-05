import { test, vi } from 'vitest';
import SessionActiveComp from '../sessionActiveComp';
import { renderWithProviders } from '@/app/[locale]/_utils/test-utils';
import { localeFromStorage } from '@/app/[locale]/_utils/common';

vi.mock('../../../_component/accordion/faqDefault.tsx', () => ({
  FAQ: () => (
    <div data-testid="mocked-faq">
      Mocked FAQ to avoid SyntaxError: Cannot use import statement outside a module
    </div>
  ),
}));

vi.mock('../../../_utils/common.ts', () => ({
  localeFromStorage: 'it',
  isEnvConfigEnabled: (envVar: string | undefined) => envVar === 'true',
  isBrowser: () => true,
}));

describe('Sanity Checks', () => {
  test("localeFromStorage should be 'it'", () => {
    expect(localeFromStorage).toBe('it');
  });
});

describe('SessionActiveComp', () => {
  test('renders the component with IT locale', async () => {
    const title = 'Active Session';
    const showArrowBackBtn = true;
    const expirationDate = new Date('2022-01-31');
    const { getByText } = await renderWithProviders(
      <SessionActiveComp
        title={title}
        showArrowBackBtn={showArrowBackBtn}
        expirationDate={expirationDate}
      />
    );

    // We expect getByText to throw an error because the date is formatted in the wrong locale
    expect(() => getByText(/1\/31\/2022./i)).toThrow();
    expect(getByText(/31\/01\/2022./i)).toBeInTheDocument();
  });
});
