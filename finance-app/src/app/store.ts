import { configureStore } from '@reduxjs/toolkit';
import auth from '@/features/auth/authSlice';
import transactions from '@/features/transactions/transactionsSlice';

export const store = configureStore({
  reducer: {
    auth,
    transactions,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
