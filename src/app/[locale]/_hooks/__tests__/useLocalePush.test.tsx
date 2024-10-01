import { renderHook } from '@testing-library/react';
import useLocalePush from '../useLocalePush';
import { test, vi } from 'vitest';

vi.mock('next-intl/client', () => ({
  useRouter() {
    return {
      push: () => vi.fn(),
      replace: () => vi.fn(),
    };
  },
}));

test('render hook', () => {
  renderHook(() => useLocalePush());
});
