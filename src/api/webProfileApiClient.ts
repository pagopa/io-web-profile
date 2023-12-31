import { ExchangeToken } from './generated/webProfile/ExchangeToken';
import { LockSessionData } from './generated/webProfile/LockSessionData';
import { ProfileData } from './generated/webProfile/ProfileData';
import { SessionState } from './generated/webProfile/SessionState';
import { UnlockSessionData } from './generated/webProfile/UnlockSessionData';
import { WithDefaultsT, createClient } from './generated/webProfile/client';
import { extractResponse, retryingFetch } from '@/app/[locale]/_utils/api-utils';
import { storageTokenOps } from '@/app/[locale]/_utils/storage';
// with withDefaults
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const withBearer: WithDefaultsT<'bearerAuth'> = (wrappedOperation: any) => (params: any) => {
  const token = storageTokenOps.read();
  // wrappedOperation and params are correctly inferred
  return wrappedOperation({
    ...params,
    bearerAuth: token,
  });
};

const webProfileApiClient = createClient({
  baseUrl: `${process.env.NEXT_PUBLIC_API_BASE_URL}`,
  basePath: `${process.env.NEXT_PUBLIC_API_BASE_PATH}`,
  fetchApi: retryingFetch(),
  withDefaults: withBearer,
});

// eslint-disable-next-line no-console
const onRedirectToLogin = () => console.log('redirect to login');

export const WebProfileApi = {
  lockUserSession: async (unlockCode: LockSessionData): Promise<void> => {
    const result = await webProfileApiClient.lockUserSession({ body: unlockCode });
    return extractResponse(result, 204, onRedirectToLogin);
  },
  unlockUserSession: async (unlockCode: UnlockSessionData): Promise<void> => {
    const result = await webProfileApiClient.unlockUserSession({ body: unlockCode });
    return extractResponse(result, 204, onRedirectToLogin);
  },
  logoutFromIOApp: async (): Promise<void> => {
    const result = await webProfileApiClient.logoutFromIOApp({});
    return extractResponse(result, 204, onRedirectToLogin);
  },
  // getSessionsList: async (): Promise<void> => {
  //   const result = await webProfileApiClient.getSessionsList({});
  //   return extractResponse(result, 200, onRedirectToLogin);
  // },
  getProfile: async (): Promise<ProfileData> => {
    const result = await webProfileApiClient.getProfile({});
    return extractResponse(result, 200, onRedirectToLogin);
  },
  getUserSessionState: async (): Promise<SessionState> => {
    const result = await webProfileApiClient.getUserSessionState({});
    return extractResponse(result, 200, onRedirectToLogin);
  },
  exchangeToken: async (): Promise<ExchangeToken> => {
    const result = await webProfileApiClient.exchangeToken({});
    return extractResponse(result, 200, onRedirectToLogin);
  },
};
