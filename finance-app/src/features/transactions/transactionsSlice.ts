import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { ITransaction } from '@/types';

interface TransactionsState {
  items: ITransaction[];
  loading: boolean;
}

const initialState: TransactionsState = { items: [], loading: false };

const transactionsSlice = createSlice({
  name: 'transactions',
  initialState,
  reducers: {
    setTransactions(state, { payload }: PayloadAction<ITransaction[]>) {
      state.items = payload;
    },
    setLoading(state, { payload }: PayloadAction<boolean>) {
      state.loading = payload;
    },
  },
});

export const { setTransactions, setLoading } = transactionsSlice.actions;
export default transactionsSlice.reducer;
