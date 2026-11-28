import type { IUser } from './user';

export interface ICredentials {
  email: string;
  password: string;
}

export interface IRegisterData extends ICredentials {
  name: string;
}

export interface IAuthResponse {
  token: string;
  user: IUser;
}
