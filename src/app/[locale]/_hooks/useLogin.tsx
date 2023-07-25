'use client';
import { useEffect, useState } from 'react';
import { User } from '../_model/User';
import { cookieTokenOps, cookieUserOps } from '../_utils/cookie';

interface LoginData {
  isLoggedIn: boolean;
  userLogged?: User;
  logOut: () => void;
}

const useLogin = (): LoginData => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [userLogged, setUserLogged] = useState<User | undefined>(undefined);
  const cookieTokenRead = cookieTokenOps.read();

  useEffect(() => {
    if (cookieTokenRead) {
      setIsLoggedIn(true);
      setUserLogged(cookieUserOps.read());
    } else {
      setIsLoggedIn(false);
      setUserLogged(undefined);
    }
  }, [cookieTokenRead]);

  const logOut = () => {
    setIsLoggedIn(false);
    setUserLogged(undefined);
    cookieTokenOps.delete();
    cookieUserOps.delete();
  };

  return {
    isLoggedIn,
    userLogged,
    logOut,
  };
};

export default useLogin;
