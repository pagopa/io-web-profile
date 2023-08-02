/**
 * Do not edit this file it is auto-generated by io-utils / gen-api-models.
 * See https://github.com/pagopa/io-utils
 */
/* eslint-disable  */

import * as t from "io-ts";
import { EmailString } from "@pagopa/ts-commons/lib/strings";

/**
 * Describes the citizen's profile.
 */

// required attributes
const ProfileR = t.interface({});

// optional attributes
const ProfileO = t.partial({
  email: EmailString
});

export const Profile = t.intersection([ProfileR, ProfileO], "Profile");

export type Profile = t.TypeOf<typeof Profile>;
