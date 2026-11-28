import { toast } from 'react-toastify';

export const notify = {
  success: (msg: string) => toast.success(msg),
  error: (err: unknown, fallback = 'Сталася помилка') =>
    toast.error(err instanceof Error ? err.message : fallback),
};
