import { useRouter } from 'next-intl/client';

const usePushBack = () => {
  const router = useRouter();

  return () => {
    router.back();
  };
};
export default usePushBack;
