'use client';
import { useCallback, useEffect, useState } from 'react';
import {
  storageJweOps,
  storageMagicLinkOps,
  storageTokenOps,
  storageUserOps,
} from '../_utils/storage';
import { isBrowser } from '../_utils/common';

type Token = {
  token: string;
  isTokenValid: () => boolean | undefined;
  removeToken: () => void;
};

const useToken = (): Token => {
  const [token, setToken] = useState<string>('');
  const windowAvailable = isBrowser();

  useEffect(() => {
    if (windowAvailable) {
      setToken(storageTokenOps.read());
    }
  }, [windowAvailable]);

  const isTokenValid = useCallback(() => {
    if (windowAvailable) {
      return !!storageTokenOps.read();
    }
  }, [windowAvailable]);

  const removeToken = useCallback(() => {
    storageTokenOps.delete();
    storageUserOps.delete();
    storageMagicLinkOps.delete();
    storageJweOps.delete();
  }, []);

  return {
    token,
    isTokenValid,
    removeToken,
  };
};

export default useToken;
