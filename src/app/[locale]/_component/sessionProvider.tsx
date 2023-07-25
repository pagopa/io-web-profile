'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { LOGIN_ROUTES, PUBBLIC_ROUTES, ROUTES } from '../_utils/routes';
// import { storageTokenOps, storageUserOps } from '../_utils/storage';
import useToken from '../_hooks/useToken';

const SessionProviderComponent = ({ children }: { readonly children: React.ReactNode }) => {
  const router = useRouter();

  // const cleanPath = (path: string): string => path.replace(/^(\/(en|it))\/(.*)$/, '');

  const { token } = useToken();

  useEffect(() => {
    if (!token) {
      router.push(ROUTES.LOGIN);
    }
    if (token) {
      router.push(ROUTES.SESSION);
    }
  }, [token]);
  /*
  useEffect(() => {
    if (LOGIN_ROUTES.includes(cleanPath(window.location.pathname))) {
      storageTokenOps.delete();
      storageUserOps.delete();
    }
    /*
    if (!PUBBLIC_ROUTES.includes(cleanPath(window.location.pathname)) && LoginStatus.UNAUTHORIZED) {
      return router.push(ROUTES.LOGIN);
    }
    
    // eslint-disable-next-line no-console
    console.log('tokenFromSessionHook', token);
  }, [window.location.pathname]);
*/

  return <>{children}</>;
};

export default SessionProviderComponent;
