import { render, renderHook } from '@testing-library/react';
import usePushBack from '../usePushBack';

jest.mock('next-intl/client', () => ({
    useRouter() {
      return {
        back: () => jest.fn(),
      };
    },
  }));

test('should call router.back function when usePushBack hook is invoked', () => {
  renderHook(() => usePushBack());
});
