'use client';
import { useEffect } from 'react';
import Loader from '../../_component/loader/loader';
import { extractToken, parseJwt, userFromJwtToken } from '../../_utils/jwt';
import { storageTokenOps, storageUserOps } from '../../_utils/storage';

const Check = (): React.ReactElement => {
  useEffect(() => {
    if (parseJwt(extractToken())) {
      storageTokenOps.write(extractToken());
      storageUserOps.write(userFromJwtToken(extractToken()));
    }
  }, []);

  return (
    <>
      <Loader />
    </>
  );
};

export default Check;
