import { UserStatus } from './user-type.enum.js';

export type User = {
  name: string;
  email: string;
  avatarUrl?: string;
  status: UserStatus;
};
