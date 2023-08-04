import { ExchangeToken } from './generated/webProfile/ExchangeToken';
import { LockSessionData } from './generated/webProfile/LockSessionData';
import { ProfileData } from './generated/webProfile/ProfileData';
import { SessionState } from './generated/webProfile/SessionState';
import { WithDefaultsT, createClient } from './generated/webProfile/client';
import { storageTokenOps } from '@/app/[locale]/_utils/storage';
import { buildFetchApi, extractResponse } from '@/app/[locale]/_utils/api-utils';

// with withDefaults
const withBearer: WithDefaultsT<'bearerAuth'> = (wrappedOperation) => (params) => {
  const token = storageTokenOps.read();
  // wrappedOperation and params are correctly inferred
  return wrappedOperation({
    ...params,
    bearerAuth: token,
  });
};
const webProfileApiClient = createClient({
  baseUrl: 'http://localhost:7071',
  basePath: '/api/v1',
  fetchApi: buildFetchApi(300000),
  withDefaults: withBearer,
});

// eslint-disable-next-line no-console
const onRedirectToLogin = () => console.log('redirect to login');

export const WebProfileApi = {
  lockUserSession: async (unlockCode: LockSessionData): Promise<void> => {
    const result = await webProfileApiClient.lockUserSession({ body: unlockCode });
    return extractResponse(result, 204, onRedirectToLogin);
  },
  unlockUserSession: async (unlockCode: LockSessionData): Promise<void> => {
    const result = await webProfileApiClient.unlockUserSession({ body: unlockCode });
    return extractResponse(result, 200, onRedirectToLogin);
  },
  logoutFromIOApp: async (): Promise<void> => {
    const result = await webProfileApiClient.logoutFromIOApp({});
    return extractResponse(result, 200, onRedirectToLogin);
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
