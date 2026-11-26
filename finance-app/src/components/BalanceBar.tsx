import { useEffect, useRef } from 'react';
import { useAppDispatch, useAppSelector } from '@/app/hooks';
import { dismissBalanceTooltip } from '@/features/auth/authSlice';
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
  const dispatch = useAppDispatch();
  const balance = useBalance();
  const showBalanceTooltip = useAppSelector((state) => state.auth.showBalanceTooltip);
  const tooltipWrapperRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!showBalanceTooltip) return;

    const handleOutsideClick = (event: MouseEvent) => {
      const target = event.target as Node | null;
      if (
        tooltipWrapperRef.current &&
        target &&
        !tooltipWrapperRef.current.contains(target)
      ) {
        dispatch(dismissBalanceTooltip());
      }
    };

    document.addEventListener('mousedown', handleOutsideClick);
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, [showBalanceTooltip, dispatch]);

  return (
    <div className="mb-6 grid items-center gap-4 md:grid-cols-3">
      <div className="hidden md:block" />
      <div className="relative flex items-center justify-center gap-3 justify-self-center">
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

        {showBalanceTooltip && (
          <div
            ref={tooltipWrapperRef}
            className="absolute top-full left-1/2 z-30 mt-3 -translate-x-1/2"
          >
            <WelcomeTooltip />
          </div>
        )}
      </div>
      <div className="justify-self-center md:justify-self-end">
        {showReportsLink && <ReportsLink className="text-xs" />}
      </div>
    </div>
  );
}
