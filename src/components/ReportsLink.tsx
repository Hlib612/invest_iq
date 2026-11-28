import { Link } from 'react-router-dom';
import { PATHS } from '@/routes/paths';

interface Props {
  className?: string;
}

export function ReportsLink({ className = '' }: Props) {
  return (
    <Link
      to={PATHS.reports}
      className={`inline-flex items-center gap-3 text-sm tracking-wide text-ink/50 transition-colors hover:text-primary ${className}`}
    >
      <span>Перейти до розрахунків</span>
      <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
        <rect x="2" y="9" width="4" height="9" rx="1" />
        <rect x="8" y="2" width="4" height="16" rx="1" />
        <rect x="14" y="6" width="4" height="12" rx="1" />
      </svg>
    </Link>
  );
}
