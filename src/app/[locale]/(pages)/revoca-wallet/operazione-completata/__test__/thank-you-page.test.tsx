import { renderWithProviders } from "@/app/[locale]/_utils/test-utils";
import { screen } from "@testing-library/react";

import * as it from '../../../../../../dictionaries/it.json';
import ThankYouPage from "../page";


describe('Revoke wallet ThankYou page', () => {

  test('should render thank you page', async () => {
    await renderWithProviders(<div data-testid="thank-you-page"><ThankYouPage /></div>);
    const element = await screen.findByTestId('thank-you-page')
    expect(element).toBeInTheDocument();
    expect(await screen.findByTestId("thank-you-page")).toBeInTheDocument()
    const backToProfileButton = await screen.findByText(it.ioesco.common.backtoprofile)
    expect(backToProfileButton).toBeInTheDocument()
  });

});
