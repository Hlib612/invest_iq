import type { ITransaction } from '@/types';
import type { TransactionTab } from '@/features/transactions/transactionsSlice';

export interface MonthlySummaryItem {
  monthKey: string;
  monthLabel: string;
  total: number;
}

const MONTH_NAMES_UA: Record<string, string> = {
  '01': 'Січень',
  '02': 'Лютий',
  '03': 'Березень',
  '04': 'Квітень',
  '05': 'Травень',
  '06': 'Червень',
  '07': 'Липень',
  '08': 'Серпень',
  '09': 'Вересень',
  '10': 'Жовтень',
  '11': 'Листопад',
  '12': 'Грудень',
};

function extractYearMonth(rawDate: string): { year: string; month: string } | null {
  const value = rawDate.trim();

  const dotMatch = /^(\d{2})\.(\d{2})\.(\d{4})$/.exec(value);
if (dotMatch) {
  const year = dotMatch[3];
  const month = dotMatch[2];
  if (year && month) {
    return { year, month };
  }
}

const isoMatch = /^(\d{4})-(\d{2})-(\d{2})/.exec(value);
if (isoMatch) {
  const year = isoMatch[1];
  const month = isoMatch[2];
  if (year && month) {
    return { year, month };
  }
}

  return null;
}

export function groupTransactionsByMonth(
  items: ITransaction[],
  activeTab: TransactionTab,
): MonthlySummaryItem[] {
  const map = new Map<string, { month: string; total: number }>();

  for (const item of items) {
    if (item.type !== activeTab) continue;

    const parsed = extractYearMonth(item.date);
    if (!parsed) continue;

    const monthKey = `${parsed.year}-${parsed.month}`;
    const amount = Number(item.amount) || 0;
    const prev = map.get(monthKey);

    if (prev) {
      prev.total += amount;
    } else {
      map.set(monthKey, { month: parsed.month, total: amount });
    }
  }

  return Array.from(map.entries())
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([monthKey, { month, total }]) => ({
      monthKey,
      monthLabel: MONTH_NAMES_UA[month] ?? month,
      total,
    }));
}