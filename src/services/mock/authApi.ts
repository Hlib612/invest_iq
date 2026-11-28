import type { IAuthResponse, ICredentials, IRegisterData, IUser } from '@/types';
import { storage } from '../storage';
import { delay, read, uid, write } from './helpers';

interface StoredUser extends IUser {
  password: string; // лише для мока! У реальному бекенді паролі так не зберігають
}
const USERS_KEY = 'mock_users';

const toResponse = (u: StoredUser): IAuthResponse => {
  const user: IUser = { id: u.id, email: u.email, name: u.name };
  const token = `mock-token-${u.id}`;
  storage.setSession(token, user);
  return { token, user };
};

export async function registerUser(data: IRegisterData): Promise<IAuthResponse> {
  await delay();
  const users = read<StoredUser[]>(USERS_KEY, []);
  if (users.some((u) => u.email.toLowerCase() === data.email.toLowerCase())) {
    throw new Error('Користувач з таким email вже існує');
  }
  const user: StoredUser = { id: uid(), ...data };
  write(USERS_KEY, [...users, user]);
  return toResponse(user);
}

export async function loginUser({
  email,
  password,
}: ICredentials): Promise<IAuthResponse> {
  await delay();
  const users = read<StoredUser[]>(USERS_KEY, []);
  const user = users.find(
    (u) => u.email.toLowerCase() === email.toLowerCase() && u.password === password,
  );
  if (!user) throw new Error('Невірний email або пароль');
  return toResponse(user);
}

export function logoutUser() {
  storage.clearSession();
}
