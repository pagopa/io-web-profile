'use client';
import { useEffect, useState } from 'react';
import { extractToken, parseJwt, userFromJwtToken } from '../_utils/jwt';
import { cookieTokenOps, cookieUserOps } from '../_utils/cookie';

interface Token {
  token: string;
  tokenError: 'pending' | 'ok' | 'error';
}

const useToken = (): Token => {
  const [token, setToken] = useState<string>('');
  const [tokenError, setTokenError] = useState<'pending' | 'ok' | 'error'>('pending');

  useEffect(() => {
    if (parseJwt(extractToken())) {
      setToken(extractToken());
      setTokenError('ok');
      cookieTokenOps.write(extractToken());
      cookieUserOps.write(userFromJwtToken(extractToken()));
    } else {
      setTokenError('error');
    }
  }, []);

  return {
    token,
    tokenError,
  };
};

export default useToken;
