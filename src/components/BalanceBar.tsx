import { useState, type FormEvent } from 'react';
import { useAccountBalance } from '@/hooks/useBalance';
import { formatMoney } from '@/utils/formatMoney';
import { notify } from '@/services/notify';
import { ReportsLink } from './ReportsLink';

interface Props {
  onConfirm?: () => void;
  showReportsLink?: boolean;
}

const pill = 'rounded-full border-2 border-white bg-white px-5 py-2 shadow-sm';

export function BalanceBar({ onConfirm, showReportsLink = true }: Props) {
  const { balance, confirm } = useAccountBalance();
  const [draft, setDraft] = useState<string | null>(null);


  const handleConfirm = () => {
    dispatch(dismissBalanceTooltip());
    onConfirm?.();
  };

  useEffect(() => {
    if (!showBalanceTooltip) return;

  const parsed =
    draft === null ? NaN : Number(draft.replace(/\s/g, '').replace(',', '.'));
  const canConfirm =
    draft !== null && draft.trim() !== '' && Number.isFinite(parsed) && parsed !== balance;

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!canConfirm) return;
    confirm(parsed);
    setDraft(null);
    notify.success('Баланс підтверджено');
    onConfirm?.();
  }

  return (
    <div className="relative mb-6 grid items-center gap-4 md:grid-cols-3">
      <div className="hidden md:block" />
      <div className="relative flex items-center justify-center gap-3 justify-self-center max-sm:w-full">
        <span className="text-xs text-ink/60">Баланс:</span>
        <div className={`${pill} min-w-36 text-center text-xs font-bold text-ink`}>
          {formatMoney(balance)} UAH
        </div>
        <button
          type="button"
          onClick={handleConfirm}
          className={`${pill} border-[#f5f6fb] bg-[#f5f6fb] text-xs font-bold uppercase tracking-wide text-ink/60 transition-colors hover:border-[#ff751d] hover:bg-[#ff751d] hover:text-white`}
          aria-label="Підтвердити поточний баланс"
        >
          Підтвердити
        </button>
      </form>
      <div className="justify-self-center md:justify-self-end">
        {showReportsLink && <ReportsLink className="text-xs" />}
      </div>
    </div>
  );
}
