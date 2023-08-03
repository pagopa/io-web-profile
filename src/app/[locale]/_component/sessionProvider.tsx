'use client';

import { useRouter, usePathname, redirect } from 'next/navigation';
import { useEffect, useState } from 'react';
import { LOGIN_ROUTES, PUBBLIC_ROUTES, ROUTES } from '../_utils/routes';
import useToken from '../_hooks/useToken';
import { isBrowser } from '../_utils/common';
import { SpidValueInJWT } from '../_model/JWTUser';
import { extractToken, userFromJwtToken } from '../_utils/jwt';
import { storageTokenOps, storageUserOps } from '../_utils/storage';
import Loader from './loader/loader';

type LoginStatusIdle = {
  status: 'IDLE';
};

type LoginStatusAuthorized = {
  status: 'AUTHORIZED';
};

type LoginStatusNotAuthorized = {
  status: 'NOT_AUTHORIZED';
};

export type LoginStatus = LoginStatusIdle | LoginStatusAuthorized | LoginStatusNotAuthorized;

const SessionProviderComponent = ({ children }: { readonly children: React.ReactNode }) => {
  const [loginStatus, setLoginStatus] = useState<LoginStatus>({ status: 'IDLE' });
  const { isTokenValid, removeToken } = useToken();
  const router = useRouter();
  const pathName = usePathname();

  const cleanPath = (path: string): string => path.replace(/^(\/(en|it))\/(.*)$/, '');

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
      switch (userFromToken?.spidLevel) {
        case L1_JWT_LEVEL.value:
          redirect(ROUTES.SESSION);
          break;
        case L2_JWT_LEVEL.value:
          redirect(ROUTES.PROFILE);
          break;
        case L3_JWT_LEVEL.value:
          redirect(ROUTES.PROFILE_RESTORE);
          break;
      }
    }
  }, []);

  useEffect(() => {
    if (LOGIN_ROUTES.includes(cleanPath(pathName))) {
      removeToken();
    }
    if (PUBBLIC_ROUTES.includes(cleanPath(pathName))) {
      setLoginStatus({ status: 'AUTHORIZED' });
    }
    if (!PUBBLIC_ROUTES.includes(cleanPath(pathName)) && isTokenValid()) {
      setLoginStatus({ status: 'AUTHORIZED' });
    }
    if (!PUBBLIC_ROUTES.includes(cleanPath(pathName)) && !isTokenValid()) {
      setLoginStatus({ status: 'NOT_AUTHORIZED' });
      router.push(ROUTES.LOGIN);
    }
  }, [pathName]);

  if (loginStatus.status === 'IDLE' || loginStatus.status === 'NOT_AUTHORIZED') {
    return <Loader />;
  }
  return <>{children}</>;
};

export default SessionProviderComponent;
