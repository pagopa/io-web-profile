import React from 'react';
import { fireEvent, screen } from '@testing-library/react';
import { FeedbackMessage } from '../feedbackMessage';
import { pushMock } from '../../../../../../jest.setup';
import { renderWithProviders } from '@/app/[locale]/_utils/test-utils';

describe('FeedbackMessage component', () => {
  const defaultProps = {
    topIcon: <div data-testid="top-icon" />,
    title: 'Test Title',
    summary: 'Test Summary',
    firstButton: {
      text: 'FirstButton',
      variant: 'outlined' as const,
      href: '/first',
    },
    secondButton: {
      text: 'SecondButton',
      variant: 'contained' as const,
      href: '/second',
    },
  };

  test('should render properly', async () => {
    await renderWithProviders(<FeedbackMessage {...defaultProps} />);

    expect(await screen.findByTestId('top-icon')).toBeInTheDocument();
    expect(screen.getByText('Test Title')).toBeInTheDocument();
    expect(screen.getByText('Test Summary')).toBeInTheDocument();
    expect(await screen.findByText('FirstButton')).toBeInTheDocument();
    expect(await screen.findByText('SecondButton')).toBeInTheDocument();
  });

  test('should call pushWithLocale when buttons are clicked', async () => {
    await renderWithProviders(<FeedbackMessage {...defaultProps} />);

    fireEvent.click(await screen.findByText('FirstButton'));
    expect(pushMock).toHaveBeenCalledWith('/first', { locale: 'it' });
    fireEvent.click(await screen.findByText('SecondButton'));
    expect(pushMock).toHaveBeenCalledWith('/second', { locale: 'it' });
  });
});
