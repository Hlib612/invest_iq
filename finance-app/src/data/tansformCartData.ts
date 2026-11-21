import type { ExpenseItem } from '@/components/ExpenseBarChart/types';

export interface RawTransaction {
  id: string;
  categoryName: string;
  sum: number;
}

export const transformTransactionsToChartData = (
  transactions: RawTransaction[],
): ExpenseItem[] => {
  const aggregated = transactions.reduce<Record<string, number>>((acc, item) => {
    acc[item.categoryName] = (acc[item.categoryName] ?? 0) + item.sum;
    return acc;
  }, {});

  return Object.entries(aggregated).map(([category, amount]) => ({
    category,
    amount,
  }));
};