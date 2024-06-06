import { renderWithProviders } from "@/app/[locale]/_utils/test-utils";
import { screen } from "@testing-library/react";
import WalletKo from "../page";

import * as it from '../../../../../../dictionaries/it.json';

describe('Revoke wallet error page', () => {

  test('should render error page', async () => {
    await renderWithProviders(<div data-testid="accordion-component"><WalletKo /></div>);
    const element = await screen.findByTestId('accordion-component')
    expect(element).toBeInTheDocument();
    expect(await screen.findByText(it.ioesco.error.somewrong)).toBeInTheDocument()
    expect(await screen.findByText(it.ioesco.error.systemerrorcontactassistence)).toBeInTheDocument()
    expect(await screen.findByText(it.ioesco.common.backtoprofile)).toBeInTheDocument()
    expect(await screen.findByText(it.ioesco.error.retry)).toBeInTheDocument()
  });

});
