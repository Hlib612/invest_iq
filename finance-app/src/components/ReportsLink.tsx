import { Link } from 'react-router-dom';
import { PATHS } from '@/routes/paths';

interface Props {
  className?: string;
}

export function ReportsLink({ className = '' }: Props) {
  return (
    <Link
      to={PATHS.reports}
      className={`inline-flex items-center gap-2 text-sm text-ink/60 transition-colors hover:text-primary ${className}`}
    >
      <span>Перейти до розрахунків</span>
      <svg width="18" height="18" viewBox="0 0 18 18" fill="currentColor" aria-hidden="true">
        <rect x="2" y="8" width="3" height="8" rx="0.5" />
        <rect x="7.5" y="2" width="3" height="14" rx="0.5" />
        <rect x="13" y="6" width="3" height="10" rx="0.5" />
      </svg>
    </Link>
  );
}
