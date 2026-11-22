import { createSelector } from '@reduxjs/toolkit';
import type { RootState } from '@/app/store';

export const selectTransactions = (state: RootState) => state.transactions.items;

// баланс = доходи - витрати (округлення до копійок проти похибок float)
export const selectBalance = createSelector(selectTransactions, (items) => {
  const total = items.reduce(
    (sum, t) => (t.type === 'income' ? sum + t.amount : sum - t.amount),
    0,
  );
  return Math.round(total * 100) / 100;
});
