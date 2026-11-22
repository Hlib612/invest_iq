import { useBalance } from '@/hooks/useBalance';
import { formatMoney } from '@/utils/formatMoney';
import { ReportsLink } from './ReportsLink';

interface Props {
  onConfirm?: () => void;
}

const pill =
  'rounded-full border-2 border-white bg-white/70 px-6 py-2.5 shadow-sm';

export function BalanceBar({ onConfirm }: Props) {
  const balance = useBalance();

  return (
    <div className="flex flex-col items-center gap-4 md:flex-row md:justify-between">
      <div className="flex items-center gap-3">
        <span className="text-sm text-ink/60">Баланс:</span>
        <div className={`${pill} min-w-40 text-center text-sm font-semibold`}>
          {formatMoney(balance)} UAH
        </div>
        <button
          type="button"
          onClick={onConfirm}
          className={`${pill} text-sm uppercase tracking-wide text-ink/40 transition-colors hover:text-primary`}
        >
          Підтвердити
        </button>
      </div>
      <ReportsLink />
    </div>
  );
}
