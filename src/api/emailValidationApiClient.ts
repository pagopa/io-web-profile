'use client';
/* eslint-disable sonarjs/cognitive-complexity */
import { isRight } from 'fp-ts/lib/Either';
import { useCallback, useState } from 'react';
import { createClient } from './generated/ioFunction/client';
import { ValidateProfileEmailPayload } from './generated/ioFunction/ValidateProfileEmailPayload';
import { ValidationToken } from './generated/ioFunction/ValidationToken';
import { extractResponse, retryingFetch } from '@/app/[locale]/_utils/api-utils';

const BASE_URL = `${process.env.NEXT_PUBLIC_IO_FUNCTION_API_BASE_URL}`;

const validateEmailApiClient = createClient({
  baseUrl: BASE_URL,
  fetchApi: retryingFetch(),
});

const useFetchEmailValidation = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const callFetchEmailValidationWithRetries = useCallback(async <
    C extends typeof EmailValidationApi,
    N extends keyof typeof EmailValidationApi
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
              const value = response.right.value;

              // Check if it is a 200 response with an error (ValidationErrorsObject)
              if (
                value &&
                typeof value === 'object' &&
                'status' in value &&
                (value as { status: string }).status === 'FAILURE'
              ) {
                console.log(
                  '🐛 FIXING BUG: Found FAILURE in 200 response, converting to error format'
                );

                const failureValue = value as { status: 'FAILURE'; reason: string };

                // Convert to error format compatible with handleEmailValidationError
                const errorResponse = {
                  left: [
                    {
                      value: failureValue.reason, // TOKEN_EXPIRED or EMAIL_ALREADY_TAKEN
                      context: [
                        {
                          key: 'response',
                          actual: value,
                        },
                      ],
                    },
                  ],
                };

                setIsLoading(false);
                throw errorResponse;
              }

              setIsLoading(false);
              return value;
            case 403:
              setIsLoading(false);
              return;
            case 404:
              setIsLoading(false);
              return new Promise(resolve => resolve(response.right.status));
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
      throw e;
    }
  }, []);

  return {
    callFetchEmailValidationWithRetries,
    isLoading,
    setIsLoading,
  };
};

export default useFetchEmailValidation;

export const EmailValidationApi = {
  emailValidationTokenInfo: async (token: ValidationToken) => {
    const result = await validateEmailApiClient.getTokenInfo({
      'x-pagopa-email-validation-token': token,
    });
    return extractResponse(result);
  },
  validateEmail: async (token: ValidateProfileEmailPayload) => {
    const result = await validateEmailApiClient.validateProfileEmail({ body: token });
    return extractResponse(result);
  },
};
