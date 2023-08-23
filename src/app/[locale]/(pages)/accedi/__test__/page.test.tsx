import { fireEvent, screen } from '@testing-library/react';
import Access from '../page';
import * as it from '../../../../../dictionaries/it.json';
import { renderWithProviders } from '@/app/[locale]/_utils/test-utils';

describe('test suite for Access component', () => {
  test('should render Londing in case of ', async () => {
    await renderWithProviders(<Access />);

    const exitButtonL1 = await screen.findByText(it.ioesco.common.logout);
    fireEvent.click(exitButtonL1);
  });
});
