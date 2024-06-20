import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../store';

export type EmailValidationProps = {
  email?: string;
};
const initialState: EmailValidationProps = {
  email: undefined,
};

export const EmailValidationPropsSlice = createSlice({
  name: 'emailValidation',
  initialState,
  reducers: {
    setEmailValidation: (state, action: PayloadAction<string | undefined>) => ({
      ...state,
      email: action.payload,
    }),
  },
});

export const { setEmailValidation } = EmailValidationPropsSlice.actions;
export const emailValidationReducer = EmailValidationPropsSlice.reducer;

export const emailValidationSelector = (state: RootState): string | undefined => state.emailValidation.email;
