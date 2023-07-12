import { render, screen } from '@testing-library/react';
import Accesso from '../page';

describe('test suite for Access component', () => {
  test('should render component Access', () => {
    render(<Accesso />);
    expect(screen.getByText('Access'));
  });
});
