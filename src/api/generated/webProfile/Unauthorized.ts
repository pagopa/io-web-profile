/**
 * Do not edit this file it is auto-generated by io-utils / gen-api-models.
 * See https://github.com/pagopa/io-utils
 */
/* eslint-disable  */

import * as t from "io-ts";
import { ProblemJson } from "./ProblemJson";

// required attributes
const Unauthorized2R = t.interface({
  status: t.literal(401)
});

// optional attributes
const Unauthorized2O = t.partial({});

export const Unauthorized2 = t.intersection(
  [Unauthorized2R, Unauthorized2O],
  "Unauthorized2"
);

export type Unauthorized2 = t.TypeOf<typeof Unauthorized2>;

export const Unauthorized = t.intersection(
  [ProblemJson, Unauthorized2],
  "Unauthorized"
);

export type Unauthorized = t.TypeOf<typeof Unauthorized>;
