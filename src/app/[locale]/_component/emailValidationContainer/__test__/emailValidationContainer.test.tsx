import React from 'react';
import { fireEvent, screen } from '@testing-library/react';
import { EmailValidationContainer } from '../emailValidationContainer';
import { renderWithProviders } from '@/app/[locale]/_utils/test-utils';
import { vi } from 'vitest';

describe('EmailValidationContainer component', () => {
  const handleClick = vi.fn();

  const defaultProps = {
    icon: <div data-testid="top-icon" />,
    title: 'Test Title',
    summary: 'Test Summary',
    button: {
      text: 'FirstButton',
      variant: 'outlined' as const,
      onClick: handleClick,
    },
  };

  test('should render properly', async () => {
    await renderWithProviders(<EmailValidationContainer {...defaultProps} />);

    expect(await screen.findByTestId('top-icon')).toBeInTheDocument();
    expect(screen.getByText('Test Title')).toBeInTheDocument();
    expect(screen.getByText('Test Summary')).toBeInTheDocument();
    expect(await screen.findByText('FirstButton')).toBeInTheDocument();
  });

  test('should trigger onClick when the button is clicked', async () => {
    await renderWithProviders(<EmailValidationContainer {...defaultProps} />);

    const button = await screen.findByText('FirstButton');
    fireEvent.click(button);

    expect(handleClick).toHaveBeenCalled();
  });
});
