import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAppSelector } from '@/app/hooks';
import { PATHS } from './paths';

export function ProtectedRoute() {
  const token = useAppSelector((s) => s.auth.token);
  const location = useLocation();
  return token ? (
    <Outlet />
  ) : (
    <Navigate to={PATHS.login} replace state={{ from: location }} />
  );
}
