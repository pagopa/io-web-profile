import { useCallback } from 'react';
import { useRouter } from 'next-intl/client';
import { localeFromStorage } from '../_utils/common';

const useLocalePush = () => {
  const router = useRouter();

  return useCallback(
    (route: string, locale: string = localeFromStorage) => {
      router.push(route, { locale });
    },
    [router]
  );
};
export default useLocalePush;
