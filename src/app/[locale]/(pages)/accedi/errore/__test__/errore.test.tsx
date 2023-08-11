import { useSearchParams } from 'next/navigation';
import { fireEvent, screen } from '@testing-library/react';
import LoginErrorPage from '../page';
import { pushMock } from '../../../../../../../jest.setup';
import { renderWithProviders } from '@/app/[locale]/_utils/test-utils';
import { ROUTES } from '@/app/[locale]/_utils/routes';

// Mock the useSearchParams function
jest.mock('next/navigation', () => ({
  useSearchParams: jest.fn(),
}));

// Mock the behavior of useSearchParams
const mockSearchParams = {
  get: jest.fn(),
};

(useSearchParams as jest.Mock).mockReturnValue(mockSearchParams);

describe('test suite for Accedi Errore ', () => {
  test('should render "Generic error" when errorCode is null', async () => {
    mockSearchParams.get.mockReturnValue(null);
    await renderWithProviders(<LoginErrorPage />);
    const errorSummary = screen.getByText(
      'Si è verificato un errore durante il login, si prega di riprovare!'
    );
    expect(errorSummary).toBeInTheDocument();
  });

  test('should render "Credential error" for errorCode 19', async () => {
    mockSearchParams.get.mockReturnValue('19');
    await renderWithProviders(<LoginErrorPage />);
    const errorSummary = screen.getByText(
      'Hai inserito troppe volte un nome utente o una password non corretti: riprova fra qualche minuto o contatta il tuo fornitore di identità SPID per cambiare le tue credenziali.'
    );
    expect(errorSummary).toBeInTheDocument();
  });

  test('should render "Two-factor need" for errorCode 20', async () => {
    mockSearchParams.get.mockReturnValue('20');
    await renderWithProviders(<LoginErrorPage />);
    const errorSummary = screen.getByText(
      'Per motivi di sicurezza è richiesto un login con un secondo fattore di autenticazione: contatta il tuo fornitore di identità SPID per capire come si usa.'
    );
    expect(errorSummary).toBeInTheDocument();
  });

  test('should render "Session Expired" for errorCode 21', async () => {
    mockSearchParams.get.mockReturnValue('21');
    await renderWithProviders(<LoginErrorPage />);
    const errorSummary = screen.getByText(
      "È passato troppo tempo da quando hai iniziato l'accesso: per piacere riparti dall'inizio."
    );
    expect(errorSummary).toBeInTheDocument();
  });

  test('should render "Portal Consents" for errorCode 22', async () => {
    mockSearchParams.get.mockReturnValue('22');
    await renderWithProviders(<LoginErrorPage />);
    const errorSummary = screen.getByText(
      'Per accedere al portale, devi acconsentire all’invio di alcuni dati. Entra di nuovo e dai il tuo consenso.'
    );
    expect(errorSummary).toBeInTheDocument();
  });

  test('should render "Spid Revoked" for errorCode 23', async () => {
    mockSearchParams.get.mockReturnValue('23');
    await renderWithProviders(<LoginErrorPage />);
    const errorSummary = screen.getByText(
      'La tua identità SPID risulta sospesa o revocata. Per riattivare il tuo account, contatta il tuo fornitore di identità SPID.'
    );
    expect(errorSummary).toBeInTheDocument();
  });

  test('should render "Cancel Login" for errorCode 25 and click on cancel button', async () => {
    mockSearchParams.get.mockReturnValue('25');
    await renderWithProviders(<LoginErrorPage />);
    const errorSummary = screen.getByText(
      "Hai annullato l'operazione di login: puoi riprovare quando vuoi."
    );
    expect(errorSummary).toBeInTheDocument();

    const mockHistoryBack = jest.spyOn(window.history, 'back');

    const cancelBtn = screen.getByText('Annulla');
    fireEvent.click(cancelBtn);
    expect(cancelBtn).toBeInTheDocument();
    expect(mockHistoryBack).toHaveBeenCalled();
  });

  test('should render "Min Age" for errorCode 1001 and click on button back to home', async () => {
    mockSearchParams.get.mockReturnValue('1001');
    await renderWithProviders(<LoginErrorPage />);

    const errorSummary = screen.getByText("Accesso negato: non hai l'età minima richiesta.");
    expect(errorSummary).toBeInTheDocument();

    const backToHomeBtn = screen.getByText('Torna alla home');
    fireEvent.click(backToHomeBtn);
    expect(backToHomeBtn).toBeInTheDocument();
    expect(pushMock).toHaveBeenCalledWith(process.env.NEXT_PUBLIC_URL_IO, { locale: 'it' });
  });

  test('should render "Login Error Retry" in case of not recognized code and click on button retry', async () => {
    mockSearchParams.get.mockReturnValue('1234');
    await renderWithProviders(<LoginErrorPage />);
    const errorSummary = screen.getByText(
      'Si è verificato un errore durante il login, si prega di riprovare!'
    );
    expect(errorSummary).toBeInTheDocument();

    const retryBtn = screen.getByText('Riprova');
    fireEvent.click(retryBtn);
    expect(retryBtn).toBeInTheDocument();
    expect(pushMock).toHaveBeenCalledWith(ROUTES.LOGIN, { locale: 'it' });
  });
});
