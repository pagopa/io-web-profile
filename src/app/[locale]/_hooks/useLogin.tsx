'use client';
import { useEffect, useState } from 'react';
import { User } from '../_model/User';
import { storageTokenOps, storageUserOps } from '../_utils/storage';
import { isBrowser } from '../_utils/common';
import { ROUTES } from '../_utils/routes';
import useLocalePush from './useLocalePush';

type LoginData = {
  isLoggedIn: boolean;
  userLogged?: User;
  logOut: () => void;
};

const useLogin = (): LoginData => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [userLogged, setUserLogged] = useState<User | undefined>(undefined);
  const storageTokenRead = isBrowser() ? storageTokenOps.read() : null;
  const pushWithLocale = useLocalePush();

  useEffect(() => {
    if (storageTokenRead) {
      setIsLoggedIn(true);
      setUserLogged(storageUserOps.read());
    } else {
      setIsLoggedIn(false);
      setUserLogged(undefined);
    }
  }, [storageTokenRead]);

  const logOut = () => {
    setIsLoggedIn(false);
    setUserLogged(undefined);
    sessionStorage.clear();
    pushWithLocale(ROUTES.LOGIN);
  };

  return {
    isLoggedIn,
    userLogged,
    logOut,
  };
};

export default useLogin;
