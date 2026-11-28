import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@/app/hooks';
import { BalanceBar } from '@/components/BalanceBar';
import { setActiveTab, setTransactions } from '@/features/transactions/transactionsSlice';
import { getTransactions } from '@/services/mock';
import TransactionForm from '@/components/TransactionForm/TransactionForm';
import { TransactionTable } from '@/components/Transiction/TransactionTable';
import { Summary } from '@/components/Summary/Summary';

function DashboardPage() {
  const dispatch = useAppDispatch();
  const activeTab = useAppSelector((state) => state.transactions.activeTab);
  const transactions = useAppSelector((state) => state.transactions.items || []);

  useEffect(() => {
    getTransactions().then((items) => dispatch(setTransactions(items)));
  }, [dispatch]);

  // Фільтруємо транзакції залежно від активної вкладки (expense / income)
  const filteredTransactions = transactions.filter(
    (item) => item.type === activeTab
  );

  return (
    <main className="mx-auto max-w-6xl px-6 py-8">
      <BalanceBar />

      <div className="mt-6">
        <div className="flex items-center gap-1">
          <button
            type="button"
            onClick={() => dispatch(setActiveTab('expense'))}
            className={
              activeTab === 'expense'
                ? 'rounded-t-2xl bg-white px-7 py-3 text-xs font-bold tracking-wider text-[#FF751D] uppercase'
                : 'rounded-t-2xl bg-[#F5F6FB] px-7 py-3 text-xs font-bold tracking-wider text-[#000000] uppercase'
            }
          >
            Витрати
          </button>

          <button
            type="button"
            onClick={() => dispatch(setActiveTab('income'))}
            className={
              activeTab === 'income'
                ? 'rounded-t-2xl bg-white px-7 py-3 text-xs font-bold tracking-wider text-[#FF751D] uppercase'
                : 'rounded-t-2xl bg-[#F5F6FB] px-7 py-3 text-xs font-bold tracking-wider text-[#000000] uppercase'
            }
          >
            Дохід
          </button>
        </div>

        <div className="rounded-b-[30px] rounded-tr-[30px] bg-white p-6 shadow-[0_10px_60px_rgba(170,178,197,0.2)] lg:p-8">
          <TransactionForm />

          <div className="mt-8 flex flex-col items-start gap-8 lg:flex-row">
            <div className="w-full flex-1">
              {filteredTransactions.length > 0 ? (
                <TransactionTable />
              ) : (
                <div className="flex flex-col items-center justify-center rounded-2xl bg-[#F5F6FB] py-12 px-4 text-center">
                  <p className="text-sm font-medium text-[#52555F]">
                    Транзакцій поки немає
                  </p>
                  <p className="mt-1 text-xs text-[#A6ABB9]">
                    Додайте першу транзакцію за допомогою форми вище.
                  </p>
                </div>
              )}
            </div>
            <Summary />
          </div>
        </div>
      </div>
    </main>
  );
}

export default DashboardPage;