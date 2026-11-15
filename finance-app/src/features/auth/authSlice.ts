import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { IAuthResponse, IUser } from '@/types';
import { storage } from '@/services/storage';

interface AuthState {
  user: IUser | null;
  token: string | null;
}

const initialState: AuthState = {
  user: storage.getUser(),
  token: storage.getToken(),
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCredentials(state, { payload }: PayloadAction<IAuthResponse>) {
      state.user = payload.user;
      state.token = payload.token;
    },
    logout(state) {
      state.user = null;
      state.token = null;
    },
  },
});

export const { setCredentials, logout } = authSlice.actions;
export default authSlice.reducer;
