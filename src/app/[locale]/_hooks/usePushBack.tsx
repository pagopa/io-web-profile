import { useRouter } from 'next/navigation';

const usePushBack = () => {
  const router = useRouter();

  return () => {
    router.back();
  };
};
export default usePushBack;
