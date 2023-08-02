/**
 * Do not edit this file it is auto-generated by io-utils / gen-api-models.
 * See https://github.com/pagopa/io-utils
 */
/* eslint-disable  */

import * as t from "io-ts";

/**
 * Exchanged token
 */

// required attributes
const ExchangeTokenR = t.interface({});

// optional attributes
const ExchangeTokenO = t.partial({
  token: t.string
});

export const ExchangeToken = t.intersection(
  [ExchangeTokenR, ExchangeTokenO],
  "ExchangeToken"
);

export type ExchangeToken = t.TypeOf<typeof ExchangeToken>;
