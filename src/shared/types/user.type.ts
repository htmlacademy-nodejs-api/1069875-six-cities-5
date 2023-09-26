export type User = {
  name: string;
  email: string;
  avatarUrl: string;
  password: string;
  isPro: boolean;
}

export type Host = Omit<User, 'password'>;
