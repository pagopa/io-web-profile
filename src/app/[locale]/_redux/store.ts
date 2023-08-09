import { configureStore } from '@reduxjs/toolkit';
import { permissionsReducer } from './slices/permissionsSlice';
import { blockAccessReducer } from './slices/blockAccessSlice';

export const createStore = () =>
  configureStore({
    reducer: {
      permissions: permissionsReducer,
      blockAccess: blockAccessReducer,
    },
  });

export const store = createStore();

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
