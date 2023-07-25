'use client';
import { useEffect, useState } from 'react';
import { storageTokenOps, storageUserOps } from '../_utils/storage';

interface IToken {
  token: string;
  isTokenValid: () => boolean | undefined;
  removeToken: () => void;
}

const useToken = (): IToken => {
  const [token, setToken] = useState<string>('');

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setToken(storageTokenOps.read());
    }
  }, []);

  const isTokenValid = () => {
    if (typeof window !== 'undefined') {
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
