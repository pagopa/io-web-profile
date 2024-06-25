import React from 'react';
import { renderWithProviders } from '@/app/[locale]/_utils/test-utils';
import { screen } from '@testing-library/react';
import { ProfileCards } from '../profileCards';
import * as it from '../../../../../dictionaries/it.json';

const activeWalletProps = {
  sessionIsActive: true,
  walletIsActive: true
};

const inActiveWalletProps = {
  sessionIsActive: true,
  walletIsActive: false
};


describe('ProfileCards component', () => {

  test('should render disable wallet card', async () => {
    await renderWithProviders(<div data-testid="profile-cards"><ProfileCards {...activeWalletProps} /></div>);
    const element = await screen.findByTestId('profile-cards')
    expect(element).toBeInTheDocument();
    const disableTitle = screen.getAllByText(it.itwallet.common.disablewallet)
    expect(disableTitle.length).toBe(2)
    disableTitle.forEach((el) => {
      expect(el).toBeInTheDocument();
    })
  });

  test('should not render disable wallet card', async () => {
    await renderWithProviders(<div data-testid="profile-cards"><ProfileCards {...inActiveWalletProps} /></div>);
    const element = await screen.findByTestId('profile-cards')
    expect(element).toBeInTheDocument();
    const disableTitle = screen.queryByText(it.itwallet.common.disablewallet);;
    expect(disableTitle).not.toBeInTheDocument();
  });
});
