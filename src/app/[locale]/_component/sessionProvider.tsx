'use client';

import { useRouter, usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { LOGIN_ROUTES, PUBBLIC_ROUTES, ROUTES } from '../_utils/routes';
import useToken from '../_hooks/useToken';
import Loader from './loader/loader';
import Header from './header/header';
import Footer from './footer/footer';

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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathName]);

  if (loginStatus.status === 'IDLE' || loginStatus.status === 'NOT_AUTHORIZED') {
    return (
      <>
        <Header />
        <Loader />
        <Footer />
      </>
    );
  }
  return <>{children}</>;
};

export default SessionProviderComponent;
