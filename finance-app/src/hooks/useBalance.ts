import { useAppSelector } from '@/app/hooks';
import { selectBalance } from '@/features/transactions/selectors';

export function useBalance() {
  return useAppSelector(selectBalance);
}
