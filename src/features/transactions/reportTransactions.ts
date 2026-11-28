export type TransactionKind = 'expense' | 'income'

export interface ReportTransaction {
  id: string
  date: string
  description: string
  category: string
  amount: number
  kind: TransactionKind
}

export const reportTransactions: ReportTransaction[] = [
  { id: 'oct-groceries', date: '2019-10-04', description: 'Продукти', category: 'Продукти', amount: 4000, kind: 'expense' },
  { id: 'oct-transport', date: '2019-10-12', description: 'Проїзний', category: 'Транспорт', amount: 1500, kind: 'expense' },
  { id: 'oct-salary', date: '2019-10-05', description: 'Заробітна плата', category: 'Зарплата', amount: 30000, kind: 'income' },
  { id: 'nov-groceries', date: '2019-11-02', description: 'Продукти', category: 'Продукти', amount: 5000, kind: 'expense' },
  { id: 'nov-transport', date: '2019-11-05', description: 'Проїзний', category: 'Транспорт', amount: 4500, kind: 'expense' },
  { id: 'nov-leisure', date: '2019-11-07', description: 'Кіно та відпочинок', category: 'Розваги', amount: 2100, kind: 'expense' },
  { id: 'nov-health', date: '2019-11-11', description: 'Аптека', category: "Здоров'я", amount: 1800, kind: 'expense' },
  { id: 'nov-clothes', date: '2019-11-14', description: 'Одяг', category: 'Одяг', amount: 1500, kind: 'expense' },
  { id: 'nov-utilities', date: '2019-11-18', description: 'Комунальні послуги', category: 'Комунальні', amount: 1200, kind: 'expense' },
  { id: 'nov-sport', date: '2019-11-21', description: 'Спортзал', category: 'Спорт', amount: 1000, kind: 'expense' },
  { id: 'nov-cafes', date: '2019-11-26', description: 'Кафе', category: 'Кафе', amount: 900, kind: 'expense' },
  { id: 'nov-salary', date: '2019-11-01', description: 'Заробітна плата', category: 'Зарплата', amount: 45000, kind: 'income' },
  { id: 'dec-groceries', date: '2019-12-03', description: 'Продукти', category: 'Продукти', amount: 5200, kind: 'expense' },
  { id: 'dec-gifts', date: '2019-12-20', description: 'Подарунки', category: 'Покупки', amount: 3400, kind: 'expense' },
  { id: 'dec-salary', date: '2019-12-05', description: 'Заробітна плата', category: 'Зарплата', amount: 50000, kind: 'income' },
]
