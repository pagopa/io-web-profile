'use client';
import { redirect } from 'next/navigation';
import { useEffect } from 'react';
import { SpidValueInJWT } from '../../_model/JWTUser';
import { extractToken, userFromJwtToken } from '../../_utils/jwt';
import { ROUTES } from '../../_utils/routes';
import { storageTokenOps, storageUserOps } from '../../_utils/storage';
import { isBrowser } from '../../_utils/common';

const CheckToken = (): React.ReactElement => {
  const token = isBrowser() ? extractToken() : undefined;
  const userFromToken = token ? userFromJwtToken(token) : undefined;

  const L1_JWT_LEVEL: SpidValueInJWT = {
    value: process.env.NEXT_PUBLIC_JWT_SPID_LEVEL_VALUE_L1,
  };

  const L2_JWT_LEVEL: SpidValueInJWT = {
    value: process.env.NEXT_PUBLIC_JWT_SPID_LEVEL_VALUE_L2,
  };

  const L3_JWT_LEVEL: SpidValueInJWT = {
    value: process.env.NEXT_PUBLIC_JWT_SPID_LEVEL_VALUE_L3,
  };

  useEffect(() => {
    if (token && userFromToken) {
      storageTokenOps.write(token);
      storageUserOps.write(userFromToken);
      if (userFromToken?.spidLevel === L1_JWT_LEVEL.value) {
        redirect(ROUTES.SESSION);
      }
      if (userFromToken?.spidLevel === L2_JWT_LEVEL.value) {
        redirect(ROUTES.PROFILE);
      }
      if (userFromToken?.spidLevel === L3_JWT_LEVEL.value) {
        redirect(ROUTES.PROFILE_RESTORE);
      }
    }
  }, []);

  return <></>;
};

export default CheckToken;
