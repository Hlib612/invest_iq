import { Link } from 'react-router-dom'

function DashboardPage() {
  return (
    <main className="dashboard-page">
      <h1>Панель керування</h1>
      <p>Переглядайте підсумки доходів і витрат у звітах.</p>
      <Link className="dashboard-report-link" to="/reports">
        Перейти до звітів
      </Link>
    </main>
  )
}

export default DashboardPage