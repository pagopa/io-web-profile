'use client';
import { useRouter } from 'next-intl/client';

import { useLocale } from 'next-intl';
import { usePathname } from 'next-intl/client';
import { useEffect, useState } from 'react';
import useLocalePush from '../_hooks/useLocalePush';
import useToken from '../_hooks/useToken';
import {
  EXISTING_ROUTES,
  LOGIN_ROUTES,
  PRIVATE_ROUTES,
  PUBBLIC_ROUTES,
  ROUTES,
} from '../_utils/routes';
import { storageLocaleOps } from '../_utils/storage';
import { defaultLocale, localeList } from '../layout';
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
  const router = useRouter();

  // eslint-disable-next-line sonarjs/cognitive-complexity
  useEffect(() => {
    if (localeList.includes(locale)) {
      if (!storageLocaleOps.read()) {
        storageLocaleOps.write(locale);
      }
      if (EXISTING_ROUTES.includes(pathName)) {
        if (LOGIN_ROUTES.includes(pathName)) {
          removeToken();
        }
        if (PUBBLIC_ROUTES.includes(pathName)) {
          setLoginStatus({ status: 'AUTHORIZED' });
        }
        if (PRIVATE_ROUTES.includes(pathName)) {
          if (isTokenValid()) {
            setLoginStatus({ status: 'AUTHORIZED' });
          } else {
            setLoginStatus({ status: 'NOT_AUTHORIZED' });
            pushWithLocale(ROUTES.LOGIN);
          }
        }
      } else {
        pushWithLocale(ROUTES.NOT_FOUND_PAGE);
      }
    } else {
      router.push(ROUTES.NOT_FOUND_PAGE, { locale: defaultLocale });
    }
  }, [locale, pathName]);

  if (loginStatus.status === 'IDLE' || loginStatus.status === 'NOT_AUTHORIZED') {
    return <Loader />;
  }
  return <>{children}</>;
};

export default SessionProviderComponent;
