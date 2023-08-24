import React from 'react';
import { fireEvent, screen, waitFor } from '@testing-library/react';
import ProfileBlock from '../page';
import { WebProfileApi } from '@/api/webProfileApiClient';
import { renderWithProviders } from '@/app/[locale]/_utils/test-utils';
import * as it from '../../../../../dictionaries/it.json';

describe('lock profile with code', () => {
  test('should render the component ProfileBlock', async () => {
    await renderWithProviders(<ProfileBlock />);
    const errorSummary = screen.getByText(it.ioesco.common.lockioaccess);
    expect(errorSummary).toBeInTheDocument();
  });

  test('on lock session button click, should call lockUserSession passing lock code', async () => {
    const lockUserSessionSpy = jest.spyOn(WebProfileApi, 'lockUserSession');
    await renderWithProviders(<ProfileBlock />);
    const lockAccessButton = screen.getByText(it.ioesco.profile.lockaccess);
    fireEvent.click(lockAccessButton);
    await waitFor(() => {
      expect(lockUserSessionSpy).toHaveBeenCalledWith({ unlock_code: expect.stringMatching(/^\d{9}$/) });
    });
    lockUserSessionSpy.mockRestore();
  });

});
