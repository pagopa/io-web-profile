import { extractResponse } from '../api-utils';
import * as t from 'io-ts';
import { IResponseType } from '@pagopa/ts-commons/lib/requests';

const onRedirectToLogin = jest.fn();

describe('extractResponse', () => {
  it('should return the response value if it has a success status', async () => {
    const successResponse: t.Validation<IResponseType<any, any, any>> = t.success({
      status: 200,
      headers: {},
      value: 'Success',
    });

    const result = await extractResponse(successResponse);
    expect(result.right.value).toEqual('Success');
    expect(onRedirectToLogin).not.toHaveBeenCalled();
  });
});
