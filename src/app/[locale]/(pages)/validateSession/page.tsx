'use client';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import Loader from '../../_component/loader/loader';
import { SpidValueInJWT } from '../../_model/JWTUser';
import { extractToken, parseJwt, userFromJwtToken } from '../../_utils/jwt';
import { ROUTES } from '../../_utils/routes';
import { storageTokenOps, storageUserOps } from '../../_utils/storage';

const Check = (): React.ReactElement => {
  const router = useRouter();
  const token = extractToken();
  const userFromToken = userFromJwtToken(token);
  const parsedJWT = parseJwt(token);

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
    if (parsedJWT) {
      storageTokenOps.write(token);
      storageUserOps.write(userFromToken);
      if (userFromToken?.spidLevel === L1_JWT_LEVEL.value) {
        router.push(ROUTES.SESSION);
      }
      if (userFromToken?.spidLevel === L2_JWT_LEVEL.value) {
        router.push(ROUTES.PROFILE);
      }
      if (userFromToken?.spidLevel === L3_JWT_LEVEL.value) {
        router.push(ROUTES.PROFILE_RESTORE_L3);
      }
    }
  }, []);

  return <Loader />;
};

export default Check;
