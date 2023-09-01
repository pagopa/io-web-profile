import { render, renderHook } from '@testing-library/react';
import usePushBack from '../usePushBack';

jest.mock('next-intl/client', () => ({
    useRouter() {
      return {
        back: () => jest.fn(),
      };
    },
  }));

test('render hook', () => {
  renderHook(() => usePushBack());
});
