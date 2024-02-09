'use client';
/* eslint-disable sonarjs/cognitive-complexity */
import { isRight } from 'fp-ts/lib/Either';
import { useState } from 'react';
import { LockSessionData } from './generated/webProfile/LockSessionData';
import { UnlockSessionData } from './generated/webProfile/UnlockSessionData';
import { WithDefaultsT, createClient } from './generated/webProfile/client';
import { goToLogin } from '@/app/[locale]/_utils/common';
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

const useFetch = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const callFetchWithRetries = async <
    C extends typeof WebProfileApi,
    N extends keyof typeof WebProfileApi
  >(
    client: C,
    apiName: N,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    params: any,
    retryStatusCodes = [500],
    errorHandlers?: () => void
  ) => {
    const maxRetries = 3;
    const retryDelay = 1000;
    try {
      setIsLoading(true);
      // eslint-disable-next-line functional/no-let
      let retryCount = 0;
      while (retryCount < maxRetries) {
        const response = await client[apiName](params);
        if (isRight(response)) {
          switch (response.right.status) {
            case 204:
            case 200:
              setIsLoading(false);
              return response.right.value;
            case 403:
              setIsLoading(false);
              onRedirectToLogin();
              return;
            case 404:
              setIsLoading(false);
              return new Promise((resolve) => resolve(response.right.status));
            default:
              if (retryStatusCodes.includes(response.right.status)) {
                if (retryCount === maxRetries - 1) {
                  if (errorHandlers) {
                    errorHandlers();
                    return;
                  } else {
                    throw new Error(`Unexpected status code: ${response.right.status}`);
                  }
                }
                retryCount++;
                await new Promise((resolve) => setTimeout(resolve, retryDelay));
                setIsLoading(false);
                break;
              } else {
                setIsLoading(false);
                throw new Error(`Unexpected status code: ${response.right.status}`);
              }
          }
        }
      }
    } catch (e) {
      setIsLoading(false);
      throw new Error(`Unexpected status code: ${e}`);
    }
  };

  return {
    callFetchWithRetries,
    isLoading,
  };
};

export default useFetch;

// eslint-disable-next-line no-console
const onRedirectToLogin = () => goToLogin();

export const WebProfileApi = {
  lockUserSession: async (unlockCode: LockSessionData) => {
    const result = await webProfileApiClient.lockUserSession({ body: unlockCode });
    return extractResponse(result);
  },
  unlockUserSession: async (unlockCode: UnlockSessionData) => {
    const result = await webProfileApiClient.unlockUserSession({ body: unlockCode });
    return extractResponse(result);
  },
  logoutFromIOApp: async () => {
    const result = await webProfileApiClient.logoutFromIOApp({});
    return extractResponse(result);
  },
  // getSessionsList: async (): Promise<void> => {
  //   const result = await webProfileApiClient.getSessionsList({});
  //   return extractResponse(result, 200, onRedirectToLogin);
  // },
  getProfile: async () => {
    const result = await webProfileApiClient.getProfile({});
    return extractResponse(result);
  },
  getUserSessionState: async () => {
    const result = await webProfileApiClient.getUserSessionState({});
    return extractResponse(result);
  },
  exchangeToken: async () => {
    const result = await webProfileApiClient.exchangeToken({});
    return extractResponse(result);
  },
};
