import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAppDispatch } from '@/app/hooks';
import { BalanceBar } from '@/components/BalanceBar';
import { setTransactions } from '@/features/transactions/transactionsSlice';
import { getTransactions } from '@/services/mock';
import TransactionForm from '@/components/TransactionForm/TransactionForm';

function DashboardPage() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    getTransactions().then((items) => dispatch(setTransactions(items)));
  }, [dispatch]);

  return (
    <main className="dashboard-page">
      <h1>Панель керування</h1>
      <BalanceBar />
      <TransactionForm />
      <p>Переглядайте підсумки доходів і витрат у звітах.</p>
      <Link className="dashboard-report-link" to="/reports">
        Перейти до звітів
      </Link>
    </main>
  );
}

export default DashboardPage;
