import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../store';

export interface PermissionsProps {
  role: string | undefined;
}
const initialState: PermissionsProps = {
  role: '',
};

export const permissionsSlice = createSlice({
  name: ' permissions',
  initialState,
  reducers: {
    setUserRole: (state, action: PayloadAction<string>) => ({
      ...state,
      role: action.payload,
    }),
  },
});

export const { setUserRole } = permissionsSlice.actions;
export const permissionsReducer = permissionsSlice.reducer;

export const roleSelector = (state: RootState): string | undefined => state.permissions.role;
