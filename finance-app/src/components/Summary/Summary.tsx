import { useAppSelector } from '@/app/hooks';
import { selectMonthlySummary } from '@/features/transactions/selectors';

function formatSummaryAmount(value: number): string {
  const [whole = '0', cents = '00'] = Math.abs(value).toFixed(2).split('.');
  const withSpaces = whole.replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
  return `${withSpaces}.${cents}`;
}

export function Summary() {
  const rows = useAppSelector(selectMonthlySummary);

  return (
    <aside className="w-full overflow-hidden rounded-t-2xl rounded-br-2xl bg-[#F5F6FB] lg:w-60 shrink-0">
      <div className="border-b-2 border-white py-3.5 text-center text-xs font-bold tracking-wider text-[#000000] uppercase">
        Зведення
      </div>

      {rows.length === 0 ? (
        <div className="px-5 py-6 text-center text-xs text-[#52555F]/60">
          Немає даних за місяцями
        </div>
      ) : (
        <ul className="divide-y-2 divide-white">
          {rows.map((row) => (
            <li
              key={`${row.year}-${row.month}`}
              className="flex items-center justify-between px-5 py-3 text-xs text-[#52555F]"
            >
              <span className="uppercase">{row.label}</span>
              <span>{formatSummaryAmount(row.total)}</span>
            </li>
          ))}
        </ul>
      )}
    </aside>
  );
}
