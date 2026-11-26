import { useBalance } from '@/hooks/useBalance';
import { formatMoney } from '@/utils/formatMoney';
import { ReportsLink } from './ReportsLink';
import { WelcomeTooltip } from './WelcomeToolTip/WelcomeToolTip';

interface Props {
  onConfirm?: () => void;
  showReportsLink?: boolean;
}

const pill = 'rounded-full border-2 border-white bg-white px-5 py-2 shadow-sm';

export function BalanceBar({ onConfirm, showReportsLink = true }: Props) {
  const balance = useBalance();
  const isNewUser = balance === 0;

  return (
    <div className="mb-6 grid items-center gap-4 md:grid-cols-3">
      <div className="hidden md:block" />
      <div className="flex items-center justify-center gap-3 justify-self-center">
        <span className="text-xs text-ink/60">Баланс:</span>
        <div className={`${pill} min-w-36 text-center text-xs font-semibold`}>
          {formatMoney(balance)} UAH
        </div>
        <button
          type="button"
          onClick={onConfirm}
          className={`${pill} text-xs uppercase tracking-wide text-ink/40 transition-colors hover:text-primary`}
        >
          Підтвердити
        </button>

        {isNewUser && <WelcomeTooltip />}
      </div>
      <div className="justify-self-center md:justify-self-end">
        {showReportsLink && <ReportsLink className="text-xs" />}
      </div>
    </div>
  );
}