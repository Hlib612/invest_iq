import { createAsyncThunk, createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { IAuthResponse, ICredentials, IRegisterData, IUser } from '@/types';
import { storage } from '@/services/storage';
import { loginUser, logoutUser, registerUser } from '@/services/mock';

interface AuthState {
  user: IUser | null;
  token: string | null;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: AuthState = {
  user: storage.getUser(),
  token: storage.getToken(),
  status: 'idle',
  error: null,
};

export const login = createAsyncThunk<IAuthResponse, ICredentials>(
  'auth/login',
  async (credentials, { rejectWithValue }) => {
    try {
      return await loginUser(credentials);
    } catch (error) {
      return rejectWithValue(error instanceof Error ? error.message : 'Помилка входу');
    }
  },
);

export const register = createAsyncThunk<IAuthResponse, IRegisterData>(
  'auth/register',
  async (data, { rejectWithValue }) => {
    try {
      return await registerUser(data);
    } catch (error) {
      return rejectWithValue(error instanceof Error ? error.message : 'Помилка реєстрації');
    }
  },
);

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCredentials(state, { payload }: PayloadAction<IAuthResponse>) {
      state.user = payload.user;
      state.token = payload.token;
    },
    logout(state) {
      logoutUser();
      state.user = null;
      state.token = null;
      state.status = 'idle';
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(login.fulfilled, (state, { payload }) => {
        state.status = 'succeeded';
        state.user = payload.user;
        state.token = payload.token;
      })
      .addCase(login.rejected, (state, { payload }) => {
        state.status = 'failed';
        state.error = typeof payload === 'string' ? payload : 'Помилка входу';
      })
      .addCase(register.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(register.fulfilled, (state, { payload }) => {
        state.status = 'succeeded';
        state.user = payload.user;
        state.token = payload.token;
      })
      .addCase(register.rejected, (state, { payload }) => {
        state.status = 'failed';
        state.error = typeof payload === 'string' ? payload : 'Помилка реєстрації';
      });
  },
});

export const { setCredentials, logout } = authSlice.actions;
export default authSlice.reducer;
