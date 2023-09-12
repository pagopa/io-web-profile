import { useSearchParams } from 'next/navigation';
import { screen } from '@testing-library/react';
import * as it from '../../../../../dictionaries/it.json';
import { IdpListOnApp } from '../idpListOnApp';
import { renderWithProviders } from '@/app/[locale]/_utils/test-utils';
// Mock the useSearchParams function
jest.mock('next/navigation', () => ({
  useSearchParams: jest.fn(),
}));

// Mock the behavior of useSearchParams
const mockSearchParams = {
  get: jest.fn(),
};

(useSearchParams as jest.Mock).mockReturnValue(mockSearchParams);

describe('test suite for access error', () => {
  test('should render "Generic error" when errorCode is null', async () => {
    mockSearchParams.get.mockReturnValue(null);
    await renderWithProviders(<IdpListOnApp />);
    const errorSummary = screen.getByText(it.ioesco.common.youridentityonio);
    expect(errorSummary).toBeInTheDocument();
  });
});
