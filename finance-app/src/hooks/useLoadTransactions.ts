import { useEffect } from 'react'
import { useAppDispatch } from '@/app/hooks'
import { setTransactions } from '@/features/transactions/transactionsSlice'
import { getTransactions } from '@/services/mock'

export function useLoadTransactions() {
  const dispatch = useAppDispatch()

  useEffect(() => {
    getTransactions().then((items) => dispatch(setTransactions(items)))
  }, [dispatch])
}
