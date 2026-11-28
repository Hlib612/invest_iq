import { createSelector } from '@reduxjs/toolkit';
import type { RootState } from '@/app/store';

export const selectTransactions = (state: RootState) => state.transactions.items;
export const selectActiveTab = (state: RootState) => state.transactions.activeTab;

// баланс = доходи - витрати (округлення до копійок проти похибок float)
export const selectBalance = createSelector(selectTransactions, (items) => {
  const total = items.reduce(
    (sum, t) => (t.type === 'income' ? sum + t.amount : sum - t.amount),
    0,
  );
  return Math.round(total * 100) / 100;
});

const MONTH_NAMES_UA = [
  'СІЧЕНЬ',
  'ЛЮТИЙ',
  'БЕРЕЗЕНЬ',
  'КВІТЕНЬ',
  'ТРАВЕНЬ',
  'ЧЕРВЕНЬ',
  'ЛИПЕНЬ',
  'СЕРПЕНЬ',
  'ВЕРЕСЕНЬ',
  'ЖОВТЕНЬ',
  'ЛИСТОПАД',
  'ГРУДЕНЬ',
];

export const selectMonthlySummary = createSelector(
  [selectTransactions, selectActiveTab],
  (items, activeTab) => {
    const filtered = items.filter((t) => t.type === activeTab);
    const map = new Map<
      string,
      { year: number; month: number; label: string; total: number }
    >();

    for (const item of filtered) {
      const parsed = new Date(item.date);
      if (Number.isNaN(parsed.getTime())) continue;

      const year = parsed.getFullYear();
      const month = parsed.getMonth();
      const key = `${year}-${month}`;
      const existing = map.get(key);

      if (existing) {
        existing.total = Math.round((existing.total + item.amount) * 100) / 100;
      } else {
        map.set(key, {
          year,
          month,
          label: MONTH_NAMES_UA[month] ?? '',
          total: Math.round(item.amount * 100) / 100,
        });
      }
    }

    // Сортуємо від новіших місяців до старіших і беремо останні 6 (як у Фігмі)
    return Array.from(map.values())
      .sort((a, b) => (b.year !== a.year ? b.year - a.year : b.month - a.month))
      .slice(0, 6);
  },
);
