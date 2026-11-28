import { useCallback, useState } from 'react';
import { useAppSelector } from '@/app/hooks';
import { selectBalance } from '@/features/transactions/selectors';
import { initialBalance } from '@/services/initialBalance';

const round = (n: number) => Math.round(n * 100) / 100;

// баланс лише з транзакцій (доходи - витрати)
export function useBalance() {
  return useAppSelector(selectBalance);
}

// повний баланс = підтверджений початковий + транзакції
export function useAccountBalance() {
  const transactionsTotal = useBalance();
  const [initial, setInitial] = useState(() => initialBalance.get());

  const confirm = useCallback(
    (target: number) => {
      const next = round(target - transactionsTotal);
      initialBalance.set(next);
      setInitial(next);
    },
    [transactionsTotal],
  );

  return { balance: round(initial + transactionsTotal), confirm };
}
