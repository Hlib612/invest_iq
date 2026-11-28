import type { TransactionType } from './category';

export interface ITransaction {
  id: string;
  userId: string;
  amount: number;
  type: TransactionType;
  categoryId: string;
  description: string;
  date: string; // ISO
}

export type NewTransaction = Omit<ITransaction, 'id' | 'userId'>;
