'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { LOGIN_ROUTES, PUBBLIC_ROUTES, ROUTES } from '../_utils/routes';
import useToken from '../_hooks/useToken';
import Loader from './loader/loader';
import Header from './header/header';
import Footer from './footer/footer';

const enum ELogin {
  IDLE = 'IDLE',
  AUTHORIZED = 'AUTHORIZED',
  NOT_AUTHORIZED = 'NOT_AUTHORIZED',
}
const SessionProviderComponent = ({ children }: { readonly children: React.ReactNode }) => {
  const [loginStatus, setLoginStatus] = useState<ELogin>(ELogin.IDLE);
  const { isTokenValid, removeToken } = useToken();
  const router = useRouter();
  const cleanPath = (path: string): string => path.replace(/^(\/(en|it))\/(.*)$/, '');

  useEffect(() => {
    if (typeof window !== 'undefined') {
      if (LOGIN_ROUTES.includes(cleanPath(window.location.pathname))) {
        removeToken();
      }
      if (PUBBLIC_ROUTES.includes(cleanPath(window.location.pathname))) {
        setLoginStatus(ELogin.AUTHORIZED);
      }
      if (!PUBBLIC_ROUTES.includes(cleanPath(window.location.pathname)) && isTokenValid()) {
        setLoginStatus(ELogin.AUTHORIZED);
      }
      if (!PUBBLIC_ROUTES.includes(cleanPath(window.location.pathname)) && !isTokenValid()) {
        setLoginStatus(ELogin.NOT_AUTHORIZED);
        router.push(ROUTES.LOGIN);
      }
    }
  }, [isTokenValid, removeToken, router]);

  if (loginStatus === ELogin.IDLE || loginStatus === ELogin.NOT_AUTHORIZED) {
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
