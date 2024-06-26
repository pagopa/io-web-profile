import React from 'react';
import { renderWithProviders } from '@/app/[locale]/_utils/test-utils';
import HomeWalletCard from '..';
import { screen } from '@testing-library/react';
import * as it from '../../../../../dictionaries/it.json';


const baseProps = {
  isProfileAvailable: true,
  setWalletRevokeStatus: () => null
}
const activeWalletProps = {
  walletRevokeStatus: {
    id: "Test",
    is_revoked: false
  },
  ...baseProps
};

const inActiveWalletProps = {
  walletRevokeStatus: {
    id: "Test",
    is_revoked: true
  },
  ...baseProps
};


describe('HomeWalletCard component', () => {

  test('should render active wallet card', async () => {
    await renderWithProviders(<div data-testid="wallet-card-active"><HomeWalletCard  {...activeWalletProps} /></div>);
    const element = await screen.findByTestId('wallet-card-active')
    expect(element).toBeInTheDocument();
    const activeTitle = screen.getByText(it.ioesco.common.active)
    expect(activeTitle).toBeInTheDocument();
    const tooltipTitle = screen.getByLabelText(it.ioesco.profile.walletbullettooltip)
    expect(tooltipTitle).toBeInTheDocument();
  });

  test('should render inactive wallet card', async () => {
    await renderWithProviders(<div data-testid="wallet-card-inactive"><HomeWalletCard  {...inActiveWalletProps} /></div>);
    const element = await screen.findByTestId('wallet-card-inactive')
    expect(element).toBeInTheDocument();
    const notActiveTitle = screen.getByText(it.ioesco.common.noactive)
    expect(notActiveTitle).toBeInTheDocument();
    // TODO missing key in dictionary to set bullettooltip when WI status deactivated
    // const tooltipTitle = screen.getByLabelText(it.ioesco.profile.walletbullettooltip)
    // expect(tooltipTitle).toBeInTheDocument();
  });

  test('should not render wallet card', async () => {
    await renderWithProviders(<div data-testid="wallet-card-wrapper"><HomeWalletCard {...baseProps} /></div>);
    const element = await screen.findByTestId('wallet-card-wrapper')
    expect(element).toBeEmptyDOMElement();
  });
  
});
