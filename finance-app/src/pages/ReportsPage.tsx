import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { BalanceBar } from '@/components/BalanceBar'
import { useLoadTransactions } from '@/hooks/useLoadTransactions'
import {
  reportTransactions,
  type TransactionKind,
} from '../features/transactions/reportTransactions'
import './ReportsPage.css'

const monthFormatter = new Intl.DateTimeFormat('uk-UA', { month: 'long' })
const amountFormatter = new Intl.NumberFormat('en-US', {
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
})

function formatAmount(amount: number) {
  return amountFormatter.format(amount).replaceAll(',', '\u00a0')
}

function ReportsPage() {
  useLoadTransactions()
  const [period, setPeriod] = useState(() => new Date(2019, 10, 1))
  const [kind, setKind] = useState<TransactionKind>('expense')
  const year = period.getFullYear()
  const month = period.getMonth()
  const monthKey = `${year}-${String(month + 1).padStart(2, '0')}`

  const periodTransactions = useMemo(
    () => reportTransactions.filter((transaction) => transaction.date.startsWith(monthKey)),
    [monthKey],
  )

  const expenses = periodTransactions
    .filter((transaction) => transaction.kind === 'expense')
    .reduce((total, transaction) => total + transaction.amount, 0)
  const income = periodTransactions
    .filter((transaction) => transaction.kind === 'income')
    .reduce((total, transaction) => total + transaction.amount, 0)

  const categoryTotals = useMemo(() => {
    const totals = new Map<string, number>()

    for (const transaction of periodTransactions) {
      if (transaction.kind === kind) {
        totals.set(
          transaction.category,
          (totals.get(transaction.category) ?? 0) + transaction.amount,
        )
      }
    }

    return [...totals.entries()].sort((first, second) => second[1] - first[1])
  }, [kind, periodTransactions])

  const maxCategoryTotal = Math.max(...categoryTotals.map(([, total]) => total), 0)
  const monthName = monthFormatter.format(period).toLocaleUpperCase('uk-UA')

  function changeMonth(offset: number) {
    setPeriod((currentPeriod) => new Date(currentPeriod.getFullYear(), currentPeriod.getMonth() + offset, 1))
  }

  return (
    <main className="reports-page">
      <div className="reports-toolbar">
        <Link className="back-link" to="/dashboard">
          <span aria-hidden="true">←</span>
          Повернутись на головну
        </Link>
        <div className="period-picker" aria-label="Обраний період">
          <span className="period-caption">Поточний період</span>
          <div className="period-controls">
            <button
              className="period-arrow"
              type="button"
              aria-label="Попередній місяць"
              onClick={() => changeMonth(-1)}
            >
              ‹
            </button>
            <span className="period-label" aria-live="polite">
              {monthName} {year}
            </span>
            <button
              className="period-arrow"
              type="button"
              aria-label="Наступний місяць"
              onClick={() => changeMonth(1)}
            >
              ›
            </button>
          </div>
        </div>
      </div>

      <BalanceBar showReportsLink={false} />

      <section className="period-totals" aria-label="Підсумок за період">
        <p>
          Витрати:
          <strong className="expense-value">− {formatAmount(expenses)} грн.</strong>
        </p>
        <span className="totals-divider" aria-hidden="true" />
        <p>
          Доходи:
          <strong className="income-value">+ {formatAmount(income)} грн.</strong>
        </p>
      </section>

      <section className="report-card category-card" aria-labelledby="category-title">
        <div className="category-heading">
          <div className="report-tabs" role="tablist" aria-label="Тип транзакцій">
            <button
              id="expenses-tab"
              className={`report-tab${kind === 'expense' ? ' is-active' : ''}`}
              type="button"
              role="tab"
              aria-selected={kind === 'expense'}
              aria-controls="category-panel"
              onClick={() => setKind('expense')}
            >
              Витрати
            </button>
            <button
              id="income-tab"
              className={`report-tab${kind === 'income' ? ' is-active' : ''}`}
              type="button"
              role="tab"
              aria-selected={kind === 'income'}
              aria-controls="category-panel"
              onClick={() => setKind('income')}
            >
              Доходи
            </button>
          </div>
          <h1 id="category-title">Агрегація за категоріями</h1>
        </div>

        <div
          className="category-grid"
          id="category-panel"
          role="tabpanel"
          aria-labelledby={kind === 'expense' ? 'expenses-tab' : 'income-tab'}
        >
          {categoryTotals.length === 0 ? (
            <p className="empty-report">За цей період транзакцій немає</p>
          ) : (
            categoryTotals.map(([category, total]) => (
              <article className="category-item" key={category}>
                <div className={`category-icon${kind === 'income' ? ' category-icon-income' : ''}`} aria-hidden="true">
                  {category.slice(0, 1)}
                </div>
                <span className="category-name">{category}</span>
                <strong className="category-amount">{formatAmount(total)}</strong>
                <span className="category-track" aria-hidden="true">
                  <span
                    className={`category-fill${kind === 'income' ? ' category-fill-income' : ''}`}
                    style={{ width: `${(total / maxCategoryTotal) * 100}%` }}
                  />
                </span>
              </article>
            ))
          )}
        </div>
      </section>

      <section className="report-card chart-card" aria-labelledby="chart-title">
        <div className="chart-heading">
          <h2 id="chart-title">
            {kind === 'expense' ? 'Витрати' : 'Доходи'} за категоріями
          </h2>
          <span>{monthName} {year}</span>
        </div>
        {categoryTotals.length === 0 ? (
          <p className="empty-report chart-empty">Немає даних для побудови діаграми</p>
        ) : (
          <div className="bar-chart" role="img" aria-label={`${kind === 'expense' ? 'Витрати' : 'Доходи'} за категоріями за ${monthName} ${year}`}>
            {categoryTotals.map(([category, total]) => {
              const height = Math.max((total / maxCategoryTotal) * 100, 4)

              return (
                <div className="bar-column" key={category}>
                  <span className="bar-value">{formatAmount(total)}</span>
                  <div className="bar-track">
                    <div className={`bar${kind === 'income' ? ' bar-income' : ''}`} style={{ height: `${height}%` }} />
                  </div>
                  <span className="bar-label">{category}</span>
                </div>
              )
            })}
          </div>
        )}
      </section>
    </main>
  )
}

export default ReportsPage

