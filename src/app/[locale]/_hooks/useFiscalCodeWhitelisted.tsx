import { useState, useEffect } from 'react';
import useFetch, { WebWalletApi } from '@/api/webWalletApiClient';

const useFiscalCodeWhitelisted = (): boolean | undefined => {
  const [isFiscalCodeWhitelisted, setIsFiscalCodeWhitelisted] = useState<boolean | undefined>(
    undefined
  );
  const { callFetchWithRetries } = useFetch();

  useEffect(() => {
    callFetchWithRetries(WebWalletApi, 'getIsFiscalCodeWhitelisted', [], [500])
      .then(res => {
        setIsFiscalCodeWhitelisted(res?.is_whitelisted ?? false);
      })
      .catch(e => {
        if (e?.status) {
          return;
        }
      });
  }, [callFetchWithRetries]);

  return isFiscalCodeWhitelisted;
};

export default useFiscalCodeWhitelisted;
