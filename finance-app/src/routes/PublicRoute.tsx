import { Navigate, Outlet } from 'react-router-dom';
import { useAppSelector } from '@/app/hooks';
import { PATHS } from './paths';

export function PublicRoute() {
  const token = useAppSelector((state) => state.auth.token);
  return token ? <Navigate to={PATHS.dashboard} replace /> : <Outlet />;
}
