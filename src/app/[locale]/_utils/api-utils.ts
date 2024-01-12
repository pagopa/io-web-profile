/* eslint-disable functional/immutable-data */
/* eslint-disable no-console */
import { URL } from 'url';
import { agent } from '@pagopa/ts-commons';
import { ApiRequestType, IResponseType, TypeofApiResponse } from '@pagopa/ts-commons/lib/requests';
import { Millisecond } from '@pagopa/ts-commons/lib/units';
import { isRight } from 'fp-ts/lib/Either';
import * as t from 'io-ts';
import * as E from 'fp-ts/Either';
import * as TE from 'fp-ts/TaskEither';
import { pipe } from 'fp-ts/function';
import { calculateExponentialBackoffInterval } from '@pagopa/ts-commons/lib/backoff';
import {
  AbortableFetch,
  retriableFetch,
  setFetchTimeout,
  toFetch,
} from '@pagopa/ts-commons/lib/fetch';
import { RetriableTask, TransientError, withRetries } from '@pagopa/ts-commons/lib/tasks';

//
// Returns a fetch wrapped with timeout and retry logic
//
const API_TIMEOUT = Number(`${process.env.NEXT_PUBLIC_API_FETCH_TIMEOUT}`) as Millisecond;
const API_MAX_RETRY = Number(`${process.env.NEXT_PUBLIC_API_FETCH_MAX_RETRY}`);

type MaxRetry = 'max-retries';
type RetryAborted = 'retry-aborted';
export type TransientErrorType = MaxRetry | RetryAborted;

/** Return the implementation of fetch configured with a timeout */
export const buildFetchApi = (
  timeoutMs: number = API_TIMEOUT
): ((input: RequestInfo | URL, init?: RequestInit | undefined) => Promise<Response>) => {
  // Must be an https endpoint so we use an https agent
  const abortableFetch = AbortableFetch(agent.getHttpFetch(process.env));
  const fetchWithTimeout = toFetch(setFetchTimeout(timeoutMs as Millisecond, abortableFetch));
  // tslint:disable-next-line: no-any
  return fetchWithTimeout as (
    input: RequestInfo | URL,
    init?: RequestInit | undefined
  ) => Promise<Response>;
};

/** Extract the response of a @pagopa/openapi-codegen-ts generated client rest invocation having status code successHttpStatus.
If notValidTokenHttpStatus is not null and the returned status is equal to notValidTokenHttpStatus, it will call the onRedirectToLogin function and will schedule the redirect towards logout path.
If notAuthorizedTokenHttpStatus is  not null and the returned status is equal to notAuthorizedTokenHttpStatus, it will throw an Error with message "Operation not allowed".
If emptyResponseHttpStatus is  not null and the returned status is equal to emptyResponseHttpStatus, it will return a promise that resolve to null value.
Other statuses will return will throw a generic error. */
export const extractResponse = async (
  response: t.Validation<
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    TypeofApiResponse<ApiRequestType<any, any, any, IResponseType<any, any, any>>>
  >
) => {
  // successHttpStatus | 404 | 403
  if (isRight(response)) {
    return response;
  } else {
    // here we come if we have an error status code not mampped in the response field on our openAPI spec,
    // and different from the ones used in the retry logic.
    console.log(response.left);
    console.error('Something gone wrong while fetching data');
    console.error(JSON.stringify(response.left));
    throw response.left[0].value;
  }
};

/**
 * Retries a fetch request in case of timeout or response with a specific status code.
 * @param maxRetries ( Default ENV API_MAX_RETRY ) - Maximum number of retry attempts for the request.
 * @param statusCodeRetry - HTTP status code that should trigger the retry.
 * @param backoffBaseInterval ( Default 500 ) - Waiting interval between retry attempts in milliseconds, this parameter represents the waiting time between each attempt with exponential growth.
 * @returns A function that performs the fetch request with retries.
 */

export function retryingFetch(
  maxRetries: number = API_MAX_RETRY,
  statusCodeRetry: number[] = [429],
  backoffBaseInterval: Millisecond = 500 as Millisecond
): (input: RequestInfo | URL, init?: RequestInit | undefined) => Promise<Response> {
  // a fetch that can be aborted and that gets cancelled after fetchTimeoutMs
  const abortableFetch = AbortableFetch(agent.getHttpFetch(process.env));
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const timeoutFetch: (input: any, init?: RequestInit | undefined) => Promise<Response> = toFetch(
    setFetchTimeout(API_TIMEOUT, abortableFetch)
  );
  // configure retry logic with default exponential backoff
  // @see https://github.com/pagopa/io-ts-commons/blob/master/src/backoff.ts
  // const exponentialBackoff = calculateExponentialBackoffInterval();
  const retryLogic = withRetries<Error, Response>(
    maxRetries,
    calculateExponentialBackoffInterval(backoffBaseInterval)
  );
  const retryWithError = retryLogicForResponseError(
    (_: Response) => statusCodeRetry.includes(_.status),
    retryLogic
  );
  return retriableFetch(retryWithError)(timeoutFetch);
}

//
// Fetch with transient error handling. Handle error that occurs once or at unpredictable intervals.
//
function retryLogicForResponseError(
  p: (r: Response) => boolean,
  retryLogic: (
    t: RetriableTask<Error, Response>,
    shouldAbort?: Promise<boolean>
  ) => TE.TaskEither<Error | MaxRetry | RetryAborted, Response>
): typeof retryLogic {
  return (t: RetriableTask<Error, Response>, shouldAbort?: Promise<boolean>) =>
    pipe(
      retryLogic(
        // when the result of the task is a Response that satisfies
        // the predicate p, map it to a transient error
        pipe(
          t,
          TE.chain((r: Response) => TE.fromEither(p(r) ? E.left(TransientError) : E.right(r)))
        ),
        shouldAbort
      )
    );
}
