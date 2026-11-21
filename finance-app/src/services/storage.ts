import type { IUser } from '@/types';

const TOKEN_KEY = 'token';
const USER_KEY = 'user';

export const storage = {
  getToken: () => sessionStorage.getItem(TOKEN_KEY),
  getUser: (): IUser | null => {
    const raw = sessionStorage.getItem(USER_KEY);
    return raw ? (JSON.parse(raw) as IUser) : null;
  },
  setSession: (token: string, user: IUser) => {
    sessionStorage.setItem(TOKEN_KEY, token);
    sessionStorage.setItem(USER_KEY, JSON.stringify(user));
  },
  clearSession: () => {
    sessionStorage.removeItem(TOKEN_KEY);
    sessionStorage.removeItem(USER_KEY);
  },
};
