'use client';
import { useEffect, useState } from 'react';
import { extractToken, parseJwt, userFromJwtToken } from '../_utils/jwt';
import { cookieTokenOps, cookieUserOps } from '../_utils/cookie';

interface Token {
  token: string;
  tokenError: 'PENDING' | 'OK' | 'ERROR';
}

const useToken = (): Token => {
  const [token, setToken] = useState<string>('');
  const [tokenError, setTokenError] = useState<'PENDING' | 'OK' | 'ERROR'>('PENDING');

  useEffect(() => {
    if (parseJwt(extractToken())) {
      setToken(extractToken());
      setTokenError('OK');
      cookieTokenOps.write(extractToken());
      cookieUserOps.write(userFromJwtToken(extractToken()));
    } else {
      setTokenError('ERROR');
    }
  }, []);

  return {
    token,
    tokenError,
  };
};

export default useToken;
