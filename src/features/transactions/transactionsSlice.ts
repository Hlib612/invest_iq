import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { ITransaction } from '@/types';

export type TransactionTab = 'expense' | 'income';

interface TransactionsState {
  items: ITransaction[];
  loading: boolean;
  activeTab: TransactionTab;
}

const initialState: TransactionsState = {
  items: [],
  loading: false,
  activeTab: 'expense',
};

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
    setActiveTab(state, { payload }: PayloadAction<TransactionTab>) {
      state.activeTab = payload;
    },
    deleteTransaction(state, { payload }: PayloadAction<string>) {
      state.items = state.items.filter(item => item.id !== payload);
    },
  },
});

export const {
  setTransactions,
  setLoading,
  setActiveTab,
  deleteTransaction,
} = transactionsSlice.actions;

export default transactionsSlice.reducer;