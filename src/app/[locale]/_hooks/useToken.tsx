'use client';
import { useEffect, useState } from 'react';
import { storageTokenOps } from '../_utils/storage';

interface Token {
  token: string;
}

const useToken = (): Token => {
  const [token, setToken] = useState<string>('');

  useEffect(() => {
    setToken(storageTokenOps.read());
  }, []);

  return {
    token,
  };
};

export default useToken;
