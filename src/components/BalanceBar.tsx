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
    <div className="mb-6 grid items-center gap-4 md:grid-cols-3">
      <div className="hidden md:block" />
      <form
        onSubmit={handleSubmit}
        className="flex items-center justify-center gap-3 justify-self-center"
      >
        <span className="text-xs text-ink/60">Баланс:</span>
        <label className={`${pill} flex min-w-40 items-center justify-center gap-1 text-xs font-semibold`}>
          <input
            inputMode="decimal"
            aria-label="Баланс"
            value={draft ?? formatMoney(balance)}
            onFocus={() => setDraft(String(balance))}
            onChange={(e) => setDraft(e.target.value)}
            onKeyDown={(e) => e.key === 'Escape' && setDraft(null)}
            className="w-24 bg-transparent text-right outline-none"
          />
          <span>UAH</span>
        </label>
        <button
          type="submit"
          disabled={!canConfirm}
          className={`${pill} text-xs uppercase tracking-wide transition-colors ${
            canConfirm
              ? 'cursor-pointer text-primary hover:bg-primary hover:text-white'
              : 'cursor-not-allowed text-ink/40'
          }`}
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
