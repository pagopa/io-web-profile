import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import SessionActiveComp from '../sessionActiveComp';
import { renderWithProviders } from '@/app/[locale]/_utils/test-utils';
import { localeFromStorage } from '@/app/[locale]/_utils/common';

jest.mock('../../../_component/accordion/faqDefault.tsx', () => ({
  FAQ: () => (
    <div data-testid="mocked-faq">
      Mocked FAQ to avoid SyntaxError: Cannot use import statement outside a module
    </div>
  ),
}));

jest.mock('../../../_utils/common.ts', () => ({ localeFromStorage: 'en' }));

describe('Sanity Checks', () => {
  test("localeFromStorage should be 'en'", () => {
    expect(localeFromStorage).toBe('en');
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

    try {
      // We expect getByText to throw an error
      // because the date is formatted in the wrong locale
      getByText(/31\/1\/2022./i);
      fail('should not be here');
    } catch (error) {
      // We expect an error to be thrown
      expect(error).toBeDefined();
    }
    expect(getByText(/1\/31\/2022./i)).toBeInTheDocument();
  });
});
