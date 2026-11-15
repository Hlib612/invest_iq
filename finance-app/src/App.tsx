import { BrowserRouter, Link, Navigate, NavLink, Route, Routes } from 'react-router-dom'
import DashboardPage from './pages/DashboardPage'
import ReportsPage from './pages/ReportsPage'

function App() {
  return (
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
  )
}

export default App
