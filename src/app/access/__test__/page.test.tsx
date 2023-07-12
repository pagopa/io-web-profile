import { render, screen } from '@testing-library/react';
import Access from '../page';

describe('test suite for Access component', () => {
  test('should render component Access', () => {
    render(<Access />);
    expect(screen.getByText('Access'));
  });
});
