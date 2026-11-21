import DashboardPage from './pages/DashboardPage'
import { BrowserRouter, Link, Navigate, NavLink, Route, Routes } from 'react-router-dom'
import ReportsPage from './pages/ReportsPage'
// import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// import { AppRouter } from '@/routes/AppRouter';

export default function App() {
  return (
    <>
      {/* <AppRouter />
      <ToastContainer position="top-right" autoClose={3000} theme="colored" /> */}
    <BrowserRouter>
      <div className="app-shell">
        <header className="site-header">
          <Link className="brand" to="/dashboard" aria-label="InvestIQ — головна">
            <span className="brand-mark">I</span>NVESTIQ
          </Link>
          <nav className="site-nav" aria-label="Головна навігація">
            <NavLink to="/dashboard">Головна</NavLink>
            <NavLink to="/reports">Звіти</NavLink>
          </nav>
        </header>
        <Routes>
          <Route path="/" element={<Navigate to="/reports" replace />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/reports" element={<ReportsPage />} />
          <Route path="*" element={<Navigate to="/reports" replace />} />
        </Routes>
      </div>
    </BrowserRouter>
  
    </>
  );
}
