import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../store';

interface ISTate {
  readonly enable: boolean;
}

const initialState: ISTate = {
  enable: false,
};

export const testSlice = createSlice({
  initialState,
  name: 'testSlice',
  reducers: {
    changeState: (state, action: PayloadAction<boolean>) => ({
      ...state,
      enable: action.payload,
    }),
  },
});

export const { changeState } = testSlice.actions;
export const testReducer = testSlice.reducer;

export const stateSelector = (state: RootState): boolean | undefined => state.test.enable;
