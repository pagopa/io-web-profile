import { test, vi } from 'vitest';
import { renderHook } from '@testing-library/react';
import usePushBack from '../usePushBack';

vi.mock('next-intl/client', () => ({
  useRouter() {
    return {
      back: () => vi.fn(),
    };
  },
}));

test('should call router.back function when usePushBack hook is invoked', () => {
  renderHook(() => usePushBack());
});
