import { storage } from './storage';

const keyFor = () => {
  const user = storage.getUser();
  return user ? `initial_balance_${user.id}` : null;
};

export const initialBalance = {
  get(): number {
    const key = keyFor();
    if (!key) return 0;
    const raw = sessionStorage.getItem(key);
    const value = raw === null ? 0 : Number(raw);
    return Number.isFinite(value) ? value : 0;
  },
  set(value: number) {
    const key = keyFor();
    if (key) sessionStorage.setItem(key, String(value));
  },
};
