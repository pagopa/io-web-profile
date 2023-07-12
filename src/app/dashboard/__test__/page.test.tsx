import { render, screen } from '@testing-library/react';
import Dashboard from '../page';

describe('test suite for Dashboard component', () => {
  test('should render component Dashboard', () => {
    render(<Dashboard />);
    expect(screen.getByText('Dashboard'));
  });
});
