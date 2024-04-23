import { test, vi, type Mock } from 'vitest';
import { useSearchParams } from 'next/navigation';
import { screen } from '@testing-library/react';
import * as it from '../../../../../dictionaries/it.json';
import { IdpListOnApp } from '../idpListOnApp';
import { renderWithProviders } from '@/app/[locale]/_utils/test-utils';

// Mock the useSearchParams function
vi.mock('next/navigation', () => ({
  useSearchParams: vi.fn(),
}));

// Mock the behavior of useSearchParams
const mockSearchParams = {
  get: vi.fn(),
};

(useSearchParams as Mock).mockReturnValue(mockSearchParams);

describe('IdpListOnApp', () => {
  test('should render IdpListOnApp component correctly', async () => {
    mockSearchParams.get.mockReturnValue(null);
    await renderWithProviders(<IdpListOnApp />);
    const component = screen.getByText(it.ioesco.common.youridentityonio);
    expect(component).toBeInTheDocument();
  });
});
