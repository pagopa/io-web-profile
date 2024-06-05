'use client';
import { useRouter } from 'next-intl/client';

import { useLocale } from 'next-intl';
import { usePathname } from 'next-intl/client';
import { useEffect, useMemo, useState } from 'react';
import useLocalePush from '../_hooks/useLocalePush';
import useToken from '../_hooks/useToken';
import {
  EXISTING_ROUTES,
  LOGIN_ROUTES,
  PRIVATE_ROUTES,
  PUBLIC_ROUTES,
  ROUTES,
  EMAIL_VALIDATION_ROUTES
} from '../_utils/routes';
import { storageLocaleOps } from '../_utils/storage';

import { initOneTrust } from '../_utils/onetrust';
import { defaultLocale, isBrowser, localeList } from '../_utils/common';
import Loader from './loader/loader';
import '../_styles/cookieBanner.css';
import '../_styles/privacyPage.css';
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

const emailValidationEnabled = process.env.NEXT_PUBLIC_VALIDATION_EMAIL === 'true' ? true : false;

const SessionProviderComponent = ({ children }: { readonly children: React.ReactNode }) => {
  const [loginStatus, setLoginStatus] = useState<LoginStatus>({ status: 'IDLE' });
  const { isTokenValid, removeToken } = useToken();
  const pushWithLocale = useLocalePush();
  const pathName = usePathname();
  const locale = useLocale();
  const router = useRouter();

  const windowAvailable = isBrowser();

  const getHeaderFooter = ({ children, pathName }: { readonly children: React.ReactNode, readonly pathName: string }) => {
    if (EMAIL_VALIDATION_ROUTES.includes(pathName) && emailValidationEnabled ) return <> { children }</>;
  
    return (
      <>
        <Header />
          {children}
        <Footer />
      </>
    );
  };

  useMemo(() => {
    if (windowAvailable) {
      return initOneTrust();
    }
  }, [windowAvailable]);

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
        if (PUBLIC_ROUTES.includes(pathName)) {
          if (EMAIL_VALIDATION_ROUTES.includes(pathName)) {
            if(emailValidationEnabled) {
              setLoginStatus({ status: 'AUTHORIZED' });
            }
            else {
              pushWithLocale(ROUTES.NOT_FOUND_PAGE);
            }
          } else {
            setLoginStatus({ status: 'AUTHORIZED' });
          }
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
  }, [isTokenValid, locale, pathName, pushWithLocale, removeToken, router]);

  if (loginStatus.status === 'IDLE' || loginStatus.status === 'NOT_AUTHORIZED') {
    return getHeaderFooter({ children: <Loader />, pathName });
  }
  return getHeaderFooter({ children, pathName });
};

export default SessionProviderComponent;
