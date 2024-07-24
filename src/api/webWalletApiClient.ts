'use client';
/* eslint-disable sonarjs/cognitive-complexity */
import { isRight } from 'fp-ts/lib/Either';
import { useCallback, useState } from 'react';
import { WithDefaultsT, createClient } from './generated/webProfile/client';
import { extractResponse, retryingFetch } from '@/app/[locale]/_utils/api-utils';
import { storageTokenOps } from '@/app/[locale]/_utils/storage';
import { SetWalletInstanceStatusDataEnum } from './generated/webProfile/SetWalletInstanceStatusData';

// with Wallet Base Url
const WALLET_BASE_URL = `${process.env.NEXT_PUBLIC_WALLET_API_BASE_URL}`;
const BASE_PATH = `${process.env.NEXT_PUBLIC_API_BASE_PATH}`;
const IS_MOCK_USER_ENABLED = process.env.NEXT_PUBLIC_WALLET_MOCK_USER === "true"

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const withCustomToken: WithDefaultsT<'bearerAuth'> = (wrappedOperation: any) => (params: any) => {
  const token = IS_MOCK_USER_ENABLED ? global.window.localStorage.getItem("customToken") : storageTokenOps.read();
  // wrappedOperation and params are correctly inferred
  return wrappedOperation({
    ...params,
    bearerAuth: token,
  });
};

const webWalletApiClient = createClient({
  baseUrl: WALLET_BASE_URL,
  basePath: BASE_PATH,
  fetchApi: retryingFetch(),
  withDefaults: withCustomToken,
});

const useFetch = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const callFetchWithRetries = useCallback(async <
    C extends typeof WebWalletApi,
    N extends keyof typeof WebWalletApi
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
            case 400:
            case 401:
            case 403:
            case 404:
            case 42:
              setIsLoading(false);
              return new Promise((_, reject) => reject({ status: response.right.status }));
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
                await new Promise(resolve => setTimeout(resolve, retryDelay));
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
  }, []);

  return {
    callFetchWithRetries,
    isLoading,
  };
};

export default useFetch;


export const WebWalletApi = {
  getCurrentWalletInstanceStatus: async () => {
    const result = await webWalletApiClient.getCurrentWalletInstanceStatus({});
    return extractResponse(result);
  },
  setWalletInstanceStatus: async (id: string) => {
    const result = await webWalletApiClient.setWalletInstanceStatus({ id, body: SetWalletInstanceStatusDataEnum.REVOKED });
    return extractResponse(result);
  },
};
