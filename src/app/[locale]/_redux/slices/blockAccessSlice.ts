import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../store';

export type BlockAccessProps = {
  unlockCode: string;
};
const initialState: BlockAccessProps = {
  unlockCode: '',
};

export const blockAccessSlice = createSlice({
  name: 'blockAccess',
  initialState,
  reducers: {
    createUnlockCode: (state, action: PayloadAction<string>) => ({
      ...state,
      unlockCode: action.payload,
    }),
  },
});

export const { createUnlockCode } = blockAccessSlice.actions;
export const blockAccessReducer = blockAccessSlice.reducer;

export const unlockCodeSelector = (state: RootState): string => state.blockAccess.unlockCode;
