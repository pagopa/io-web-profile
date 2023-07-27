'use client';
import { useEffect, useState } from 'react';
import { storageTokenOps, storageUserOps } from '../_utils/storage';
import { isBrowser } from '../_utils/common';

type IToken = {
  token: string;
  isTokenValid: () => boolean | undefined;
  removeToken: () => void;
};

const useToken = (): IToken => {
  const [token, setToken] = useState<string>('');
  const windowAvailable = isBrowser();

  useEffect(() => {
    if (windowAvailable) {
      setToken(storageTokenOps.read());
    }
  }, []);

  const isTokenValid = () => {
    if (windowAvailable) {
      return !!storageTokenOps.read();
    }
  };

  const removeToken = () => {
    storageTokenOps.delete();
    storageUserOps.delete();
  };

  return {
    token,
    isTokenValid,
    removeToken,
  };
};

export default useToken;
