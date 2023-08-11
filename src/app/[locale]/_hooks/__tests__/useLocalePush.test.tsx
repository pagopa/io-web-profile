import { render, renderHook } from '@testing-library/react';
import useLocalePush from '../useLocalePush';
// import { useRouter } from 'next-intl/client';

jest.mock('next-intl/client', () => ({
    useRouter() {
      return {
        push: () => jest.fn(),
        replace: () => jest.fn(),
      };
    },
  }));

test('render hook', () => {
  renderHook(() => useLocalePush());
});
