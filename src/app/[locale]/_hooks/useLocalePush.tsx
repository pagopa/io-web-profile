import { useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { localeFromStorage } from '../_utils/common';

const useLocalePush = () => {
  const router = useRouter();

  return useCallback(
    (route: string, locale: string = localeFromStorage) => {
      router.push(`/${locale}${route}`);
    },
    [router]
  );
};
export default useLocalePush;
