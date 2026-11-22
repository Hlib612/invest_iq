import DashboardPage from './pages/DashboardPage'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import ReportsPage from './pages/ReportsPage'
// import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// import { AppRouter } from '@/routes/AppRouter';
import LoginPage from './components/LoginPage';
import RegisterPage from './components/RegisterPage';
import Header from './components/Header';

export default function App() {
  return (
    <>
      {/* <AppRouter />
      <ToastContainer position="top-right" autoClose={3000} theme="colored" /> */}
    <BrowserRouter>
      <div className="app-shell">
        <Header />
        <Routes>
                   <Route path="/" element={<Navigate to="/login" replace />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/reports" element={<ReportsPage />} />
           <Route path="/register" element={<RegisterPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="*" element={<Navigate to="/reports" replace />} />
        </Routes>
      </div>
    </BrowserRouter>
  
    </>
  );
}
