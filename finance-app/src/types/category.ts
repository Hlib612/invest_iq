export type TransactionType = 'income' | 'expense';

export interface ICategory {
  id: string;
  name: string;
  type: TransactionType;
  color: string;
}
