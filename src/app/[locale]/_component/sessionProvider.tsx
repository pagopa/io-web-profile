'use client';

import { useLocale } from 'next-intl';
import { usePathname } from 'next-intl/client';
import { useEffect, useState } from 'react';
import useLocalePush from '../_hooks/useLocalePush';
import useToken from '../_hooks/useToken';
import { LOGIN_ROUTES, PUBBLIC_ROUTES, ROUTES } from '../_utils/routes';
import { storageLocaleOps } from '../_utils/storage';
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
  const pushWithLocale = useLocalePush();
  const pathName = usePathname();
  const locale = useLocale();

  useEffect(() => {
    if (!storageLocaleOps.read()) {
      storageLocaleOps.write(locale);
    }
  }, [locale]);

  useEffect(() => {
    if (LOGIN_ROUTES.includes(pathName)) {
      removeToken();
    }
    if (PUBBLIC_ROUTES.includes(pathName)) {
      setLoginStatus({ status: 'AUTHORIZED' });
    }
    if (!PUBBLIC_ROUTES.includes(pathName) && isTokenValid()) {
      setLoginStatus({ status: 'AUTHORIZED' });
    }
    if (!PUBBLIC_ROUTES.includes(pathName) && !isTokenValid()) {
      setLoginStatus({ status: 'NOT_AUTHORIZED' });
      pushWithLocale(ROUTES.LOGIN);
    }
  }, [pathName]);

  if (loginStatus.status === 'IDLE' || loginStatus.status === 'NOT_AUTHORIZED') {
    return <Loader />;
  }
  return <>{children}</>;
};

export default SessionProviderComponent;
