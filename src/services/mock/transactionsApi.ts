import type { ITransaction, NewTransaction } from '@/types';
import { storage } from '../storage';
import { delay, read, uid, write } from './helpers';

const keyFor = () => {
  const user = storage.getUser();
  if (!user) throw new Error('Не авторизовано');
  return `mock_transactions_${user.id}`;
};

export async function getTransactions(): Promise<ITransaction[]> {
  await delay(250);
  return read<ITransaction[]>(keyFor(), []);
}

export async function addTransaction(data: NewTransaction): Promise<ITransaction> {
  await delay(250);
  const key = keyFor();
  const user = storage.getUser()!;
  const created: ITransaction = { id: uid(), userId: user.id, ...data };
  write(key, [created, ...read<ITransaction[]>(key, [])]);
  return created;
}

export async function deleteTransaction(id: string): Promise<void> {
  await delay(250);
  const key = keyFor();
  const items = read<ITransaction[]>(key, []);
  if (!items.some((t) => t.id === id)) throw new Error('Транзакцію не знайдено');
  write(
    key,
    items.filter((t) => t.id !== id),
  );
}
