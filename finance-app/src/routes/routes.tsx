import type { ReactElement } from 'react';
import { PATHS } from './paths';
import LoginPage from '@/pages/LoginPage';
import RegisterPage from '@/pages/RegisterPage';
import DashboardPage from '@/pages/DashboardPage';
import ReportsPage from '@/pages/ReportsPage';

interface AppRoute {
  path: string;
  element: ReactElement;
}

export const publicRoutes: AppRoute[] = [
  { path: PATHS.login, element: <LoginPage /> },
  { path: PATHS.register, element: <RegisterPage /> },
];

export const privateRoutes: AppRoute[] = [
  { path: PATHS.dashboard, element: <DashboardPage /> },
  { path: PATHS.reports, element: <ReportsPage /> },
];
