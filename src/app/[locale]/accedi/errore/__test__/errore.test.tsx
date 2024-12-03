import { test, vi } from 'vitest';
import * as nav from 'next/navigation';
import { fireEvent, screen } from '@testing-library/react';
import LoginErrorPage from '../page';
import { pushMock } from '../../../../../../test.setup';
import * as it from '../../../../../dictionaries/it.json';
import { renderWithProviders } from '@/app/[locale]/_utils/test-utils';
import { ROUTES } from '@/app/[locale]/_utils/routes';

const searchParamsSpy = vi.spyOn(nav, 'useSearchParams');
vi.mock('next/navigation');

const setReturnCode = (ret: string | null) =>
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  searchParamsSpy.mockReturnValueOnce({ get: () => ret } as any);

describe('test suite for access error', () => {
  test('should render "Generic error" when errorCode is null', async () => {
    setReturnCode(null);
    await renderWithProviders(<LoginErrorPage />);
    const errorSummary = screen.getByText(it.ioesco.error.loginerrorretry);
    expect(errorSummary).toBeInTheDocument();
  });

  test('should render "Credential error" for errorCode 19', async () => {
    setReturnCode('19');
    await renderWithProviders(<LoginErrorPage />);
    const errorSummary = screen.getByText(it.ioesco.error.credentialerror);
    expect(errorSummary).toBeInTheDocument();
  });

  test('should render "Two-factor need" for errorCode 20', async () => {
    setReturnCode('20');
    await renderWithProviders(<LoginErrorPage />);
    const errorSummary = screen.getByText(it.ioesco.error.twofactorneed);
    expect(errorSummary).toBeInTheDocument();
  });

  test('should render "Session Expired" for errorCode 21', async () => {
    setReturnCode('21');
    await renderWithProviders(<LoginErrorPage />);
    const errorSummary = screen.getByText(it.ioesco.error.sessionexpired);
    expect(errorSummary).toBeInTheDocument();
  });

  test('should render "Portal Consents" for errorCode 22', async () => {
    setReturnCode('22');
    await renderWithProviders(<LoginErrorPage />);
    const errorSummary = screen.getByText(it.ioesco.error.portalconsents);
    expect(errorSummary).toBeInTheDocument();
  });

  test('should render "Spid Revoked" for errorCode 23', async () => {
    setReturnCode('23');
    await renderWithProviders(<LoginErrorPage />);
    const errorSummary = screen.getByText(it.ioesco.error.spidrevoked);
    expect(errorSummary).toBeInTheDocument();
  });

  test('should render "Cancel Login" for errorCode 25 and click on cancel button', async () => {
    setReturnCode('25');
    await renderWithProviders(<LoginErrorPage />);
    const errorSummary = screen.getByText(it.ioesco.error.cancellogin);
    expect(errorSummary).toBeInTheDocument();

    const cancelBtn = screen.getByText(it.ioesco.common.close);
    expect(cancelBtn).toBeInTheDocument();
    fireEvent.click(cancelBtn);
    expect(pushMock).toHaveBeenCalledWith(ROUTES.LOGIN, { locale: 'it' });
  });

  test('should render "Login Error Retry" in case of not recognized code and click on button retry', async () => {
    setReturnCode('1234');
    await renderWithProviders(<LoginErrorPage />);
    const errorSummary = screen.getByText(it.ioesco.error.loginerrorretry);
    expect(errorSummary).toBeInTheDocument();

    const retryBtn = screen.getByText(it.ioesco.error.retry);
    expect(retryBtn).toBeInTheDocument();
    fireEvent.click(retryBtn);
    expect(pushMock).toHaveBeenCalledWith(ROUTES.LOGIN, { locale: 'it' });
  });
});
