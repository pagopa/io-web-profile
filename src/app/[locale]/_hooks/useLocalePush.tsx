import { useRouter } from 'next-intl/client';
import { localeFromStorage } from '../_utils/common';

const useLocalePush = () => {
  const router = useRouter();

  return (route: string, locale: string = localeFromStorage) => {
    router.push(route, { locale });
  };
};
export default useLocalePush;
