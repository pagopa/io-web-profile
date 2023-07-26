'use client';
import { useEffect, useState } from 'react';
import { User } from '../_model/User';
import { storageTokenOps, storageUserOps } from '../_utils/storage';

interface LoginData {
  isLoggedIn: boolean;
  userLogged?: User;
  logOut: () => void;
}

const useLogin = (): LoginData => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [userLogged, setUserLogged] = useState<User | undefined>(undefined);
  const cookieTokenRead = isBrowser() ? storageTokenOps.read() : null;

  useEffect(() => {
    if (cookieTokenRead) {
      setIsLoggedIn(true);
      setUserLogged(storageUserOps.read());
    } else {
      setIsLoggedIn(false);
      setUserLogged(undefined);
    }
  }, [cookieTokenRead]);

  const logOut = () => {
    setIsLoggedIn(false);
    setUserLogged(undefined);
    sessionStorage.clear();
  };

  return {
    isLoggedIn,
    userLogged,
    logOut,
  };
};

export default useLogin;
