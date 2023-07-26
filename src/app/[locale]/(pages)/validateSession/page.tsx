'use client';
import { useEffect } from 'react';
import { redirect } from 'next/navigation';
import Loader from '../../_component/loader/loader';
import { extractToken, parseJwt, userFromJwtToken } from '../../_utils/jwt';
import { storageTokenOps, storageUserOps } from '../../_utils/storage';
import { ROUTES } from '../../_utils/routes';

const Check = (): React.ReactElement => {
  useEffect(() => {
    if (parseJwt(extractToken())) {
      // FIXME: Jira ticket number 521
      storageTokenOps.write(extractToken());
      storageUserOps.write(userFromJwtToken(extractToken()));
      redirect(ROUTES.SESSION);
    }
  }, []);

  return (
    <>
      <Loader />
    </>
  );
};

export default Check;
