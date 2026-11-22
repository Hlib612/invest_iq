import { useEffect } from 'react'
import { useAppDispatch } from '@/app/hooks'
import { BalanceBar } from '@/components/BalanceBar'
import { setTransactions } from '@/features/transactions/transactionsSlice'
import { getTransactions } from '@/services/mock'

function DashboardPage() {
  const dispatch = useAppDispatch()

  useEffect(() => {
    getTransactions().then((items) => dispatch(setTransactions(items)))
  }, [dispatch])

  return (
    <main className="mx-auto max-w-6xl px-6 py-8">
      <BalanceBar />
      {/* тут будуть вкладки й форма вводу */}
    </main>
  )
}

export default DashboardPage