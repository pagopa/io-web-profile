import { configureStore } from '@reduxjs/toolkit';
import { testReducer } from './slices/testSlice';

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export const createStore = () =>
  configureStore({
    reducer: {
      test: testReducer,
    },
  });

export const store = createStore();

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
